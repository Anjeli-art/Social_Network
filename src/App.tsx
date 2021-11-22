import React, {ComponentType} from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {HashRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {UsersContainer} from "./components/Users/UsersContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/login/login";
import {Friends} from "./components/Friends/Friends";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initialize} from "./redux/app-reducer";
import {RootStateType, store} from "./redux/redux-store";
import {Preloader} from "./common/preloader/Preloader";
import {WithSuspense} from "./hoc/WithSuspense";
import Modal from "./common/Modal/Modal";
// import DialogsContainer from "./components/Dialog/DialogsContainer";
const DialogsContainer = React.lazy(() => import("./components/Dialog/DialogsContainer"))
// import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

type  MapDispatch = {
    initialize: () => void
}
type MapStateToProps = {
    initialized: boolean
    errorStatus:boolean
    errorStatusText:string
}

type AppProps = MapDispatch & MapStateToProps

export class App extends React.Component<AppProps> {

    // catchAllHendlerError = (promiseRejectionEvent: any) => {
    //     console.log(promiseRejectionEvent)  обработчик ошибок глобально
    // }
    //
    // componentDidMount() {
    //     this.props.initialize()
    //     window.addEventListener("unhandledrejection", this.catchAllHendlerError)
    // }
    // componentWillUnmount() {
    //     window.removeEventListener("unhandledrejection", this.catchAllHendlerError)
    // }
    componentDidMount() {
        this.props.initialize()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Nav/>
                <Modal error={this.props.errorStatusText} isOpen={this.props.errorStatus}/>
                <div className="app-wrapper-content">
                    <Switch>
                        {/*<Route path="/profile/:userId?" render={() => {*/}
                        {/*    return <React.Suspense fallback={<div>...loading</div>}>*/}
                        {/*        <ProfileContainer/>*/}
                        {/*    </React.Suspense>*/}
                        {/*}}/>*/}
                        {/*<Route path="/dialogs" render={() => {*/}
                        {/*    return <React.Suspense fallback={<div>...loading</div>}>*/}
                        {/*        <DialogsContainer/>*/}
                        {/*    </React.Suspense>*/}
                        {/*}}/>*/}
                        <Route exact path="/" render={() => <Redirect to={"/profile"}/>}/>
                        <Route path="/profile/:userId?" render={WithSuspense(ProfileContainer)}/>
                        <Route path="/dialogs" render={WithSuspense(DialogsContainer)}/>
                        {/*<Route path="/profile/:userId?" render={()=><ProfileContainer/>}/>*/}
                        {/*<Route path="/dialogs" render={()=><DialogsContainer/>}/>*/}
                        <Route path="/users" render={() =>
                            <UsersContainer/>}/>
                        <Route path="/news" render={() => <News/>}/>
                        <Route path="/music" render={() => <Music/>}/>
                        <Route path="/settings" render={() => <Settings/>}/>
                        <Route path="/friends" render={() => <Friends/>}/>
                        <Route path="/login" render={() => <Login/>}/>
                        <Route path="*" render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        initialized: state.app.initialized,
        errorStatus:state.profilepage.errorStatus,
        errorStatusText:state.profilepage.errorStatusText
    }
}


export const AppContainer = compose<ComponentType>(withRouter, connect(mapStateToProps, {
    initialize
}))(App)

let SamuraiApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SamuraiApp



import React, {ComponentType} from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {BrowserRouter, HashRouter, Route, withRouter} from 'react-router-dom';
import {UsersContainer} from "./components/Users/Userscontainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/login/login";
import {Friends} from "./components/Friends/Friends";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initialize} from "./redux/app-reducer";
import {RootStateType, store} from "./redux/redux-store";
import {Preloader} from "./common/preloader/Preloader";
import {WithSuspense} from "./hoc/WithSuspense";
// import {DialogsContainer} from "./components/Dialog/DialogsContainer";
const DialogsContainer = React.lazy(() => import("./components/Dialog/DialogsContainer"))
// import {ProfileContainer} from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

type  MapDispatch = {
    initialize: () => void
}
type MapStateToProps = {
    initialized: boolean
}

type AppProps = MapDispatch & MapStateToProps

export class App extends React.Component<AppProps> {
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
                <div className="app-wrapper-content">
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
                    <Route path="/profile/:userId?" render={WithSuspense(ProfileContainer)}/>
                    <Route path="/dialogs" render={WithSuspense(DialogsContainer)}/>
                    <Route path="/users" render={() =>
                        <UsersContainer/>}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>
                    <Route path="/friends" render={() => <Friends/>}/>
                    <Route path="/login" render={() => <Login/>}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        initialized: state.app.initialized
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



import React, {ComponentType} from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Route, Switch, withRouter} from 'react-router-dom';
import {DialogsContainer} from "./components/Dialog/DialogsContainer";
import {UsersContainer} from "./components/Users/Userscontainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/login/login";
import {Friends} from "./components/Friends/Friends";
import {connect} from "react-redux";

import {compose} from "redux";
import {initialize} from "./redux/app-reducer";
import {RootStateType} from "./redux/redux-store";
import {Preloader} from "./common/preloader/Preloader";

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
                    <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                    <Route path="/dialogs" render={() =>
                        <DialogsContainer/>}/>
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




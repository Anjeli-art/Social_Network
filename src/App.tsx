import React, {ComponentType} from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Route, withRouter} from 'react-router-dom';
import {DialogsContainer} from "./components/Dialog/DialogsContainer";
import {UsersContainer} from "./components/Users/Userscontainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/login/login";
import {Friends} from "./components/Friends/Friends";
import {connect} from "react-redux";
import {getAuthHeader} from "./redux/auth-reducer";
import {compose} from "redux";

type  MapDispatch = {
    getAuthHeader:() =>void
}

export class App extends React.Component<MapDispatch> {
    componentDidMount() {
        this.props.getAuthHeader()
    }
    render() {

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

export const AppContainer =compose<ComponentType>(withRouter,connect(null, {getAuthHeader

}))(App)




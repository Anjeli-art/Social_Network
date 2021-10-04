import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Nav} from "./components/Nav/Nav";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Route} from 'react-router-dom';
import {DialogsContainer} from "./components/Dialog/DialogsContainer";
import {UsersContainer} from "./components/Users/Userscontainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/login/login";


export const App: React.FC = () => {

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
                <Route path="/login" render={() => <Login/>}/>
            </div>
        </div>

    );
}




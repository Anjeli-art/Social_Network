import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Nav} from "./components/Nav/Nav";
import {Profile} from "./components/Profile/Profile";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Route} from 'react-router-dom';
import {Friends} from "./components/Friends/Friends";
import {Dialogs} from "./components/Dialog/Dialogs";

export type AppStateType = {
    store: any
    dispatch:(action:any)=>void
}


export const App: React.FC<AppStateType> = (props) => {

    return (
        <div className="app-wrapper">
            <Header/>
            <Nav/>
            <div className="app-wrapper-content">
                <Route path="/profile" render={() => <Profile
                    profile={props.store.getState().profilepage.posts}
                    NewPost={props.store.getState().profilepage.NewPost}
                    dispatch={props.dispatch}
                />}/>
                <Route path="/dialogs" render={() =>
                    <Dialogs
                        dialogs={props.store.getState().dialogepage.dialogs}
                        messages={props.store.getState().dialogepage.messages}
                        dispatch={props.dispatch}
                        newMessage={props.store.getState().dialogepage.NewMessage}

                    />}/>
                <Route path="/news" render={() => <News/>}/>
                <Route path="/music" render={() => <Music/>}/>
                <Route path="/settings" render={() => <Settings/>}/>
                <Route path="/friends" render={() => <Friends/>}/>
            </div>
        </div>

    );
}




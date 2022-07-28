import React from "react";
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";


type PropsType = {
    isAuth: boolean
    login: null | string
    getLogout:()=>void
}

export const Header: React.FC<PropsType> = (props) => {
    return (
        <header className={s.header}>
            <img src="https://cdn.logo.com/hotlink-ok/logo-social.png"/>
            <div className={s.loginBlock}>
                    {props.isAuth
                        ? <div>
                            <h3>{props.login}</h3>
                            <button onClick={props.getLogout} className={s.buttonLogout}>logOut</button>
                    </div>
                        : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    )
}

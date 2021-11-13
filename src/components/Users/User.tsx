import React from 'react';
import s from "./Users.module.css";
import {NavLink} from "react-router-dom";
import userphoto from "../../assets/images/images.jpg";
import {UserType} from "../../redux/users-reducer";

type PropsTypeUser = {
    user: UserType
    followngInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

export const User: React.FC<PropsTypeUser> = ({user, followngInProgress, unfollow, follow}) => {
    return (<div className={s.userprofile}>
            <div>
                <div>
                    <NavLink to={"/profile" + "/" + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : userphoto}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button disabled={followngInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    unfollow(user.id)
                                }}>unfollow</button> :
                        <button disabled={followngInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    follow(user.id)
                                }}>follow</button>}
                </div>
            </div>
            <div className={s.userdata}>
                <div className={s.username}>
                    <p>{user.name}</p>
                    <b>{user.status}</b>
                </div>
            </div>
        </div>
    );
};

export default User;
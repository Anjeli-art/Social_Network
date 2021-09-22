import React from 'react';
import {UserType} from '../../redux/users-reducer';
import s from "./Users.module.css"

type propsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setusers: (users: Array<UserType>) => void
}

export const Users: React.FC<propsType> = (props) => {

    if (props.users.length === 0) {
        props.setusers(
            [
                {
                    id: 1,
                    photoUrl: "https://cs6.pikabu.ru/post_img/big/2014/05/21/12/1400700391_1054270658.jpg",
                    foolow: false,
                    fullname: "Dmitryi",
                    status: "I am a boss",
                    location: {city: "Minsk", country: "Belarus"}
                },
                {
                    id: 2,
                    photoUrl: "https://cs6.pikabu.ru/post_img/big/2014/05/21/12/1400700391_1054270658.jpg",
                    foolow: true,
                    fullname: "Anna",
                    status: "I am a too",
                    location: {city: "Minsk", country: "Belarus"}
                },
                {
                    id: 3,
                    photoUrl: "https://cs6.pikabu.ru/post_img/big/2014/05/21/12/1400700391_1054270658.jpg",
                    foolow: false,
                    fullname: "Olga",
                    status: "smile",
                    location: {city: "Moscow", country: "Russia"}
                },
            ]
        )
    }
    return (
        <div>
            {props.users.map((el) => <div key={el.id} className={s.userprofile}>
                <div>
                    <div><img src={el.photoUrl}/></div>
                    <div>
                        {el.foolow ? <button onClick={() => {
                            props.unfollow(el.id)
                        }}>unfollow</button> : <button onClick={() => {
                            props.follow(el.id)
                        }}>follow</button>}
                    </div>
                </div>
                <div className={s.userdata}>
                    <div className={s.username}>
                        <p>{el.fullname}</p>
                        <b>{el.status}</b>
                    </div>
                    <div>
                        <p>{el.location.city}</p>
                        <p>{el.location.country}</p>
                    </div>
                </div>
            </div>)}
        </div>
    );
};


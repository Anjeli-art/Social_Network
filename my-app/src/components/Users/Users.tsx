import React from 'react';
import {UserType} from '../../redux/users-reducer';
import s from "./Users.module.css"
import userphoto from "../../assets/images/images.jpg"
import {NavLink} from 'react-router-dom';
import axios from "axios";
import {subscriptionApi} from "../../api/api";


type propsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    toggleisFollowig: (togglefollow: boolean,id:number) => void
    followngInProgress: Array<number>
}

export const Users: React.FC<propsType> = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    console.log(props.totalUsersCount)
    return (
        <div>
            <div>
                {pages.map(el => {
                    return <span className={props.currentPage === el ? s.pageActive : ""}
                                 onClick={(e) => {
                                     props.onPageChanged(el)
                                 }}
                    >{el}</span>
                })}
            </div>
            {props.users.map((el) => <div key={el.id} className={s.userprofile}>
                <div>
                    <div>
                        <NavLink to={"/profile" + "/" + el.id}>
                            <img src={el.photos.small !== null ? el.photos.small : userphoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {el.followed ?
                            <button disabled={props.followngInProgress.some(id => id === el.id)} onClick={() => {
                                props.toggleisFollowig(true,el.id)
                                subscriptionApi.getSubscriptionDelete(el.id).then(data => {
                                    if (data.resultCode == 0) {
                                        props.unfollow(el.id)
                                    }
                                    props.toggleisFollowig(false,el.id)
                                })
                            }}>unfollow</button> : <button disabled={props.followngInProgress.some(id => id === el.id)} onClick={() => {
                                props.toggleisFollowig(true,el.id)
                                subscriptionApi.getSubscriptionPost(el.id).then(data => {
                                        if (data.resultCode == 0) {
                                            props.follow(el.id)
                                        }
                                        props.toggleisFollowig(false,el.id)
                                    }
                                )
                            }}>follow</button>}
                    </div>
                </div>
                <div className={s.userdata}>
                    <div className={s.username}>
                        <p>{el.name}</p>
                        <b>{el.status}</b>
                    </div>
                    <div>
                        {/*<p>{el.location.city}</p>*/}
                        {/*<p>{el.location.country}</p>*/}
                    </div>
                </div>
            </div>)}
        </div>
    );

};




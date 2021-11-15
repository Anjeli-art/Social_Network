import React from 'react';
import {UserType} from '../../redux/users-reducer';
import Paginator from "../../common/paginator/Paginator";
import User from "./User";


type PropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followngInProgress: Array<number>
}

export const Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {

    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    // let pages = []
    // for (let i = 1; i <= pagesCount; i++) {
    //     pages.push(i)
    // }
    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                       onPageChanged={onPageChanged}/>
            {/*{pages.map(el => {*/}
            {/*    return <span className={props.currentPage === el ? s.pageActive : ""}*/}
            {/*                 onClick={(e) => {*/}
            {/*                     props.onPageChanged(el)*/}
            {/*                 }}*/}
            {/*    >{el}</span>*/}
            {/*})}*/}
            {users.map(el => <User user={el} key={el.id} follow={props.follow} unfollow={props.unfollow} followngInProgress={props.followngInProgress}/>
                )
            })
        </div>
    );

};




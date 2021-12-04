import React from 'react';
import Paginator from "../../common/paginator/Paginator";
import User from "./User";
import {UserType} from "../../redux/types";


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

    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                       onPageChanged={onPageChanged}/>
            {users.map(el => <User user={el} key={el.id} follow={props.follow} unfollow={props.unfollow} followngInProgress={props.followngInProgress}/>
                )
            })
        </div>
    );

};




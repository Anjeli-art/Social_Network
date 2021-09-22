import React from 'react';
import {connect} from 'react-redux';
import {ActionValuesType, RootStateType} from '../../redux/redux-store';
import {foolowAC, initialUserPageType, setUserAC, unfoolowAC, UserType} from '../../redux/users-reducer';
import {Users} from './Users';

type  mapDispatch= {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setusers: (users: Array<UserType>) => void
}
const mapStateToProps = (state: RootStateType): initialUserPageType => {
    return {
        users: state.userspage.users
    }
}
const mapDispatchToProps = (dispatch: (action: ActionValuesType) => void):mapDispatch => {
    return {
        follow: (userId:number) => {dispatch(foolowAC(userId))
        },
        unfollow: (userId:number) => {dispatch(unfoolowAC(userId))
        },
        setusers:(users:Array<UserType>)=>{dispatch(setUserAC(users))},

    }
}

export const Userscontainer = connect(mapStateToProps, mapDispatchToProps)(Users)
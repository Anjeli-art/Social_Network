import React from 'react';
import {ActionValuesType} from "./redux-store";


// const ADD_POST = "ADD-POST"
// const UPDATE_NEW_POST = "UPDATE-NEW-POST"
//
//
// export const addPostActionCreator = () => ({type: ADD_POST}) as const
// export const upDateNewPostActionCreator = (text: string) => ({type: UPDATE_NEW_POST, New: text}) as const//типизация двух видов тут и в экшнкреэйторе

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USER = "SET_USER"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERSCOUNT = "SET_TOTAL_USERSCOUNT"

export const foolowAC = (userId: number) => ({type: FOLLOW, userId}) as const
export const unfoolowAC = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUserAC = (users: Array<UserType>) => ({type: SET_USER, users}) as const
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const
export const setTotalUsersCountAC = (totalCount: number) => ({type: SET_TOTAL_USERSCOUNT, totalCount}) as const

export type UserType = {
    name: string
    id: number
    photos: {
        "small": null | string,
        "large": null | string
    }
    status: string
    foolow: boolean
    // location: { city: string, country: string }
}

export type initialUserPageType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

let initialstate: initialUserPageType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1
}


export const userReducer = (state = initialstate, action: ActionValuesType): initialUserPageType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(el => el.id === action.userId ? {...el, foolow: true} : el)}
        case UNFOLLOW:
            return {...state, users: state.users.map(el => el.id === action.userId ? {...el, foolow: false} : el)}
        case SET_USER:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERSCOUNT:
            return {...state, totalUsersCount:action.totalCount}
        default:
            return state
    }
}
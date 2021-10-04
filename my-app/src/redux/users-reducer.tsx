import React from 'react';
import {ActionValuesType} from "./redux-store";
import {profileApi, usersApi} from "../api/api";


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
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING = "TOGGLE_IS_FOLLOWING"

export type UserType = {
    name: string
    id: number
    photos: {
        "small": null | string,
        "large": null | string
    }
    status: string
    followed: boolean
    // location: { city: string, country: string }
}

export type initialUserPageType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followngInProgress: Array<number>
}

let initialstate: initialUserPageType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followngInProgress: []
}


export const userReducer = (state = initialstate, action: ActionValuesType): initialUserPageType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(el => el.id === action.userId ? {...el, followed: true} : el)}
        case UNFOLLOW:
            return {...state, users: state.users.map(el => el.id === action.userId ? {...el, followed: false} : el)}
        case SET_USER:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERSCOUNT:
            return {...state, totalUsersCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.toggle}
        case TOGGLE_IS_FOLLOWING:
            return {
                ...state, followngInProgress: action.togglefollow ? [...state.followngInProgress, action.id] :
                    state.followngInProgress.filter(id => id != action.id)
            }
        default:
            return state
    }
}

export const followsucsess = (userId: number) => ({type: FOLLOW, userId}) as const
export const unfollowsucsess = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsers = (users: Array<UserType>) => ({type: SET_USER, users}) as const
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const
export const setTotalUsersCount = (totalCount: number) => ({type: SET_TOTAL_USERSCOUNT, totalCount}) as const
export const toggleisFething = (toggle: boolean) => ({type: TOGGLE_IS_FETCHING, toggle}) as const
export const toggleisFollowig = (togglefollow: boolean, id: number) => ({
    type: TOGGLE_IS_FOLLOWING,
    togglefollow,
    id
}) as const

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispath: any) => {///////////////////////////////////////////////////////////////////типизация
        dispath(toggleisFething(true))
        usersApi.getUsers(currentPage, pageSize).then(data => {
            dispath(toggleisFething(false))
            dispath(setUsers(data.items))
            dispath(setTotalUsersCount(data.totalCount))
        })

    }
}
export const getPageBold = (pageNumber: number, pageSize: number) => {
    return (dispath: any) => {///////////////////////////////////////////////////////////////////типизация
        dispath(setCurrentPage(pageNumber))
        dispath(toggleisFething(true))
        usersApi.getUsers(pageNumber, pageSize).then(data => {
            dispath(toggleisFething(false))
            dispath(setUsers(data.items))
        })

    }
}
export const follow = (userId: number) => {
    return (dispath: any) => {///////////////////////////////////////////////////////////////////типизация
        dispath(toggleisFollowig(true, userId))
        usersApi.getSubscriptionPost(userId).then(data => {
            if (data.resultCode == 0) {
                dispath(followsucsess(userId))
            }
            dispath(toggleisFollowig(false, userId))
        })

    }
}
export const unfollow = (userId: number) => {
    return (dispath: any) => {///////////////////////////////////////////////////////////////////типизация
        dispath(toggleisFollowig(true, userId))
        usersApi.getSubscriptionDelete(userId).then(data => {
            if (data.resultCode == 0) {
                dispath(unfollowsucsess(userId))
            }
            dispath(toggleisFollowig(false, userId))
        })

    }
}




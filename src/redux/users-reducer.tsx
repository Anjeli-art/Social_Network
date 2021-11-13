import React from 'react';
import {ActionValuesType} from "./redux-store";
import {usersApi} from "../api/api";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/object-helpers";


// const ADD_POST = "ADD-POST"
// const UPDATE_NEW_POST = "UPDATE-NEW-POST"
//
//
// export const addPostActionCreator = () => ({type: ADD_POST}) as const
// export const upDateNewPostActionCreator = (text: string) => ({type: UPDATE_NEW_POST, New: text}) as const//типизация двух видов тут и в экшнкреэйторе

const FOLLOW = "samurai-network/user/FOLLOW"
const UNFOLLOW = "samurai-network/user/UNFOLLOW"
const SET_USER = "samurai-network/user/SET_USER"
const SET_CURRENT_PAGE = "samurai-network/user/SET_CURRENT_PAGE"
const SET_TOTAL_USERSCOUNT = "samurai-network/user/SET_TOTAL_USERSCOUNT"
const TOGGLE_IS_FETCHING = "samurai-network/user/TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING = "samurai-network/user/TOGGLE_IS_FOLLOWING"

export type UserType = {
    name: string
    id: number
    photos: {
        "small": null | string,
        "large": null | string
    }
    status: string
    followed: boolean
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
            // return {...state, users: state.users.map(el => el.id === action.userId ? {...el, followed: true} : el)}
            return {...state, users: updateObjectInArray(state.users,action.userId,"id", {followed: true})}
        case UNFOLLOW:
        // return {...state, users: state.users.map(el => el.id === action.userId ? {...el, followed: false} : el)}
            return {...state, users: updateObjectInArray(state.users,action.userId,"id", {followed: false})}
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
                    state.followngInProgress.filter(id => id !== action.id)
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
    return async (dispath: Dispatch<ActionValuesType>) => {
        dispath(toggleisFething(true))
        let data = await usersApi.getUsers(currentPage, pageSize)
        dispath(toggleisFething(false))
        dispath(setUsers(data.items))
        dispath(setTotalUsersCount(data.totalCount))
    }
}
export const getPageBold = (pageNumber: number, pageSize: number) => {
    return async (dispath: Dispatch<ActionValuesType>) => {
        dispath(setCurrentPage(pageNumber))
        dispath(toggleisFething(true))
        let data = await usersApi.getUsers(pageNumber, pageSize)
        dispath(toggleisFething(false))
        dispath(setUsers(data.items))
    }
}

let followAnfollowFlow =
    async (dispath: Dispatch<ActionValuesType>, userId: number, apiMethod: (userId: number) =>
        Promise<{ resultCode: number }>, actioncreator: (id: number) => ActionValuesType) => {
    dispath(toggleisFollowig(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispath(actioncreator(userId))
    }
    dispath(toggleisFollowig(false, userId))
}


export const follow = (userId: number) => {
    return async (dispath: Dispatch<ActionValuesType>) => {
        // let apiMethod = usersApi.getSubscriptionPost.bind(usersApi)
        // let actioncreator = toggleisFollowig
        followAnfollowFlow(dispath, userId, usersApi.getSubscriptionPost.bind(usersApi), followsucsess)
        //     dispath(toggleisFollowig(true, userId))
        //     let data = await apiMethod(userId)
        //     if (data.resultCode === 0) {
        //         dispath(followsucsess(userId))
        //     }
        //     dispath(actioncreator(false, userId))
    }
}
export const unfollow = (userId: number) => {
    return async (dispath: Dispatch<ActionValuesType>) => {
        // let apiMethod = usersApi.getSubscriptionDelete.bind(usersApi)
        // let actioncreator = toggleisFollowig
        followAnfollowFlow(dispath, userId, usersApi.getSubscriptionDelete.bind(usersApi), unfollowsucsess)
        // dispath(toggleisFollowig(true, userId))
        // let data = await apiMethod(userId)
        // if (data.resultCode === 0) {
        //     dispath(unfollowsucsess(userId))
        // }
        // dispath(actioncreator(false, userId))
    }
}




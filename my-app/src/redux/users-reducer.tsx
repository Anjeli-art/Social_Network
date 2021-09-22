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

export const foolowAC = (userId: number) => ({type: FOLLOW, userId}) as const
export const unfoolowAC = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUserAC = (users: Array<UserType>) => ({type: SET_USER, users}) as const

export type UserType = {
    id: number
    photoUrl: string
    foolow: boolean
    fullname: string
    status: string
    location: { city: string, country: string }
}

export type initialUserPageType = {
    users: Array<UserType>
}

let initialstate: initialUserPageType = {
    users: [
        //     {id: 1,photoUrl:"https://cs6.pikabu.ru/post_img/big/2014/05/21/12/1400700391_1054270658.jpg", foolow: false, fullname: "Dmitryi", status: "I am a boss", location: {city: "Minsk", country: "Belarus"}},
        //     {id: 2,photoUrl:"https://cs6.pikabu.ru/post_img/big/2014/05/21/12/1400700391_1054270658.jpg", foolow: true, fullname: "Anna", status: "I am a too", location: {city: "Minsk", country: "Belarus"}},
        //     {id: 3,photoUrl: "https://cs6.pikabu.ru/post_img/big/2014/05/21/12/1400700391_1054270658.jpg",foolow: false, fullname: "Olga", status: "smile", location: {city: "Moscow", country: "Russia"}},
    ]
}


export const userReducer = (state = initialstate, action: ActionValuesType): initialUserPageType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(el => el.id === action.userId ? {...el, foolow: true} : el)}
        case UNFOLLOW:
            return {...state, users: state.users.map(el => el.id === action.userId ? {...el, foolow: false} : el)}
        case SET_USER:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}
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

export const foolowAC = (userId:number) => ({type: FOLLOW,userId}) as const
export const unfoolowAC = (userId:number) => ({type: UNFOLLOW,userId}) as const

type UserType = {
    id: number
    foolow:boolean
    fullname: string
    status: string
    location: { city: string, country: string }
}

type initialUserPageType = {
    users: Array<UserType>
}

let initialstate: initialUserPageType = {
    users: [
        {id: 1,foolow:false, fullname: "Dmitryi", status: "I am a boss", location: {city: "Minsk", country: "Belarus"}},
        {id: 2,foolow:false, fullname: "Anna", status: "I am a too", location: {city: "Minsk", country: "Belarus"}},
        {id: 3,foolow:false, fullname: "Olga", status: "smile", location: {city: "Moscow", country: "Russia"}},
    ]
}


export const userReducer = (state = initialstate, action: ActionValuesType): initialUserPageType => {
    switch (action.type) {
        case FOLLOW:
            return {...state}
        case UNFOLLOW:
            return {...state}
        default:
            return state
    }
}
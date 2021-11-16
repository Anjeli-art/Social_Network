import React from 'react';
import {ActionValuesType} from "./redux-store";
import {profileApi} from "../api/api";
import {Dispatch} from "redux";


const ADD_POST = "samurai-network/profile/ADD-POST"
const DELETE_POST = "samurai-network/profile/DELETE_POST"
const SET_USER_PROFILE = "samurai-network/profile/SET_USER_PROFILE"
const SET_STATUS = "samurai-network/profile/SET_STATUS"
const SET_USER_PHOTO="samurai-network/profile/SET_USER_PHOTO"

export type PostType = {
    id: number
    message: string | undefined
    likecount: number
}

type ContactsType = {
    github: null | string
    vk: null | string
    facebook: null | string
    instagram: null | string
    twitter: null | string
    website: null | string
    youtube: null | string
    mainLink: null | string
}

type PhotoType = {
    small: string
    large: string
}
export type ProfileType = {
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotoType
}
export type InitialProfilePageType = {
    posts: PostType[]
    profile: ProfileType
    status: string
}


let initialstate: InitialProfilePageType = {
    posts: [
        {id: 1, message: "vy hhhhh", likecount: 3},
        {id: 2, message: "vvv", likecount: 4}],
    profile: {
        "contacts": {
            "facebook": "",
            "website": null,
            "vk": "",
            "twitter": "",
            "instagram": "",
            "youtube": null,
            "github": "",
            "mainLink": null
        },
        "lookingForAJob": true,
        "lookingForAJobDescription": "",
        "fullName": "",
        "userId": 19622,
        "photos": {
            "small": "",
            "large": ""
        }
    },
    status: ""
}


export const profileReducer = (state = initialstate, action: ActionValuesType): InitialProfilePageType => {
    switch (action.type) {
        case  ADD_POST:
            return {...state, posts: [...state.posts, {id: 5, message: action.NewPost, likecount: 2}],}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_USER_PHOTO:
            return {...state,profile:{...state.profile,photos:{...state.profile.photos,small:action.file,large:action.file}} }
        case DELETE_POST:
            return {...state, posts: state.posts.filter(el => el.id !== action.id)}
        default:
            return state
    }
}

export const addPostActionCreator = (NewPost: string) => ({type: ADD_POST, NewPost}) as const
export const setUsersProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}) as const
export const setUserStatus = (status: string) => ({type: SET_STATUS, status}) as const
export const deletePostActionCreator = (id: number) => ({type: DELETE_POST, id}) as const
export const setUserPhoto=(file:string)=>({type: SET_USER_PHOTO, file})as const

export const getProfileUser = (userId: number) => async (dispath: Dispatch<ActionValuesType>) => {
    let data = await profileApi.getProfile(userId)
    dispath(setUsersProfile(data))

}

export const getUserStatus = (userId: number) => async (dispath: Dispatch<ActionValuesType>) => {
    let data = await profileApi.getStatus(userId)
    dispath(setUserStatus(data))

}

export const updateUserStatus = (status: string) => async (dispath: Dispatch<ActionValuesType>) => {
    let response = await profileApi.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispath(setUserStatus(status))
    }

}
export const savePhoto = (file: string) => async (dispath: Dispatch<ActionValuesType>) => {
    let response = await profileApi.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispath(setUserPhoto(response.data.data.photos.small))
    }

}
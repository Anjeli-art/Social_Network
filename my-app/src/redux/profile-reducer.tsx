import React from 'react';
import {ActionValuesType} from "./redux-store";
import {profileApi} from "../api/api";
import {Dispatch} from "redux";


const ADD_POST = "ADD-POST"
// const UPDATE_NEW_POST = "UPDATE-NEW-POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"


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
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotoType
}
export type initialProfilePageType = {
    posts: PostType[]
    // NewPost: string
    profile: ProfileType
    status: string
}


let initialstate: initialProfilePageType = {
    posts: [
        {id: 1, message: "vvv", likecount: 3},
        {id: 2, message: "vvv", likecount: 4}],
    // NewPost: "",
    profile: {
        "aboutMe": "",
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


export const profileReducer = (state = initialstate, action: ActionValuesType): initialProfilePageType => {
    switch (action.type) {
        case  ADD_POST:
            return {...state, posts: [...state.posts, {id: 5, message: action.NewPost, likecount: 2}], }
        // case UPDATE_NEW_POST:
        //     return {...state, NewPost: action.New}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}

export const addPostActionCreator = (NewPost:string) => ({type: ADD_POST,NewPost}) as const
// export const upDateNewPostActionCreator = (text: string) => ({type: UPDATE_NEW_POST, New: text}) as const//типизация двух видов тут и в экшнкреэйторе
export const setUsersProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}) as const
export const setUserStatus = (status: string) => ({type: SET_STATUS, status}) as const

export const getProfileUser = (userId: number)=> {
    return (dispath: Dispatch<ActionValuesType>) => {
        profileApi.getProfile(userId).then(data => {
            dispath(setUsersProfile(data))
        })

    }
}

export const getUserStatus = (userId: number)=> {
    return (dispath: Dispatch<ActionValuesType>) => {
        profileApi.getStatus(userId).then(data => {
            dispath(setUserStatus(data))
        })

    }
}

export const updateUserStatus = (status: string) => {
    return (dispath: Dispatch<ActionValuesType>) => {
        profileApi.updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispath(setUserStatus(status))
            }
        })

    }
}
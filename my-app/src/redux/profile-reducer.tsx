import React from 'react';
import {ActionValuesType} from "./redux-store";


const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST = "UPDATE-NEW-POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"


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
    NewPost: string
    profile: ProfileType

}


let initialstate: initialProfilePageType = {
    posts: [
        {id: 1, message: "vvv", likecount: 3},
        {id: 2, message: "vvv", likecount: 4}],
    NewPost: "",
    profile: {
        "aboutMe": "я круто чувак 1001%",
        "contacts": {
            "facebook": "facebook.com",
            "website": null,
            "vk": "vk.com/dimych",
            "twitter": "https://twitter.com/@sdf",
            "instagram": "instagra.com/sds",
            "youtube": null,
            "github": "github.com",
            "mainLink": null
        },
        "lookingForAJob": true,
        "lookingForAJobDescription": "не ищу, а дурачусь",
        "fullName": "samurai dimych",
        "userId": 2,
        "photos": {
            "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
            "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
        }
    }
}


export const profileReducer = (state = initialstate, action: ActionValuesType): initialProfilePageType => {
    switch (action.type) {
        case  ADD_POST:
            return {...state, posts: [...state.posts, {id: 5, message: state.NewPost, likecount: 2}], NewPost: ""}
        case UPDATE_NEW_POST:
            return {...state, NewPost: action.New}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: ADD_POST}) as const
export const upDateNewPostActionCreator = (text: string) => ({type: UPDATE_NEW_POST, New: text}) as const//типизация двух видов тут и в экшнкреэйторе
export const setUsersProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}) as const
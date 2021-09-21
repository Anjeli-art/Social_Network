import React from 'react';
import {ActionValuesType} from "./redux-store";


const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST = "UPDATE-NEW-POST"


export const addPostActionCreator = () => ({type: ADD_POST}) as const
export const upDateNewPostActionCreator = (text: string) => ({type: UPDATE_NEW_POST, New: text}) as const//типизация двух видов тут и в экшнкреэйторе

export type PostType = {
    id: number
    message: string | undefined
    likecount: number
}
export type initialProfilePageType = {
    posts: PostType[]
    NewPost: string
}
let initialstate: initialProfilePageType = {
    posts: [
        {id: 1, message: "vvv", likecount: 3},
        {id: 2, message: "vvv", likecount: 4}],
    NewPost: "",
}


export const profileReducer = (state = initialstate, action: ActionValuesType): initialProfilePageType => {
    switch (action.type) {
        case  ADD_POST:
            return {...state, posts: [...state.posts, {id: 5, message: state.NewPost, likecount: 2}], NewPost: ""}
        case UPDATE_NEW_POST:
            return {...state, NewPost: action.New}
        default:
            return state
    }
}

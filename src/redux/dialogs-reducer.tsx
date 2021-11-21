import React from 'react';
import {ActionValuesType} from "./redux-store";

const ADD_MESSAGE = "samurai-network/dialog/ADD-MESSAGE"
const DELETE_MESSAGE="samurai-network/dialog/DELETE_MESSAGE"



export type AddMessageType = {
    type: typeof ADD_MESSAGE
    NewMessage:string
}
export type DeleteMessageType={
    type: typeof DELETE_MESSAGE
    id:number
}
export type MessageType = {
    id: number
    message: string | undefined
}
export type DialogType = {
    id: number
    name: string
}

export type InitDialogsStateType = {
    messages: MessageType[]
    dialogs: DialogType[]
}

let initialstate: InitDialogsStateType = {
    messages: [
        {id: 1, message: "Hello"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "Hi"},
        {id: 4, message: "Yo"},],
    dialogs: [
        {id: 1, name: "Dima"},
        {id: 2, name: "Sasha"},
        {id: 3, name: "Kolya"},
        {id: 4, name: "Sveta"},
        {id: 5, name: "Andrey"},
        {id: 6, name: "Vitya"},]
}


export const dialogsReducer = (state = initialstate, action: ActionValuesType): InitDialogsStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {...state,messages: [...state.messages, {id: 5, message: action.NewMessage},]}
        case DELETE_MESSAGE:
            return {...state,messages: [...state.messages.filter(el=>el.id !==action.id)]}
        default:
            return state
    }
}

export const addMessageActionCreator = (NewMessage:string): AddMessageType => ({type: ADD_MESSAGE,NewMessage})as const
export const deleteMessageActionCreator=(id:number):DeleteMessageType=>({type:DELETE_MESSAGE,id})

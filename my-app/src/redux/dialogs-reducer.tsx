import React from 'react';
import { DialogType, MessageType} from "./Store";
import {ActionValuesType} from "./redux-store";

const ADD_MESSGE = "ADD-MESSGE"
const UPDATE_NEW_MESSAGE = "UPDATE-NEW-MESSAGE"

export type addMessageType = {
    type: "ADD-MESSGE"
}//типизация двух видов тут и в экшнкреэйторе
export type upDateNewMessageType = {
    type: "UPDATE-NEW-MESSAGE"
    New: string
}

export const addMessageActionCreator = (): addMessageType => ({type: ADD_MESSGE})
export const upDateNewMessageActionCreator = (text: string): upDateNewMessageType => ({
    type: UPDATE_NEW_MESSAGE,
    New: text
})//типизация двух видов тут и в экшнкреэйторе

export type InitDialogsStateType = {
    messages: MessageType[]
    NewMessage: string
    dialogs: DialogType[]
}

let initialstate: InitDialogsStateType = {
    messages: [
        {id: 1, message: "Hello"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "Hi"},
        {id: 4, message: "Yo"},],
    NewMessage: "",
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
        case ADD_MESSGE:
            let newMessage = {id: 5, message: state.NewMessage}
            state.messages.push(newMessage)
            state.NewMessage = ""
            return state
        case UPDATE_NEW_MESSAGE:
            state.NewMessage = action.New
            return state
        default:
            return state
    }
}

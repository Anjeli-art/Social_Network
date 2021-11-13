import React from 'react';
import {
    addMessageActionCreator,
    deleteMessageActionCreator,
    dialogsReducer,
    InitDialogsStateType
} from "./dialogs-reducer";


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


test("after delete message lenght of array should be decrement", () => {
    let action = deleteMessageActionCreator(1)
    let newState = dialogsReducer(initialstate, action)
expect(newState.messages.length).toBe(3)
})

test("if id does not exist messages lenght does not change", () => {
    let action = deleteMessageActionCreator(100)
    let newState = dialogsReducer(initialstate, action)
    expect(newState.messages.length).toBe(4)
})

test("after add message must match the added", () => {
    let action = addMessageActionCreator("ggg")
    let newState = dialogsReducer(initialstate, action)
    expect(newState.messages[4].message).toBe("ggg")
})

test("after add message length of array message chuold be increment", () => {
    let action = addMessageActionCreator("ggg")
    let newState = dialogsReducer(initialstate, action)
    expect(newState.messages.length).toBe(5)
})




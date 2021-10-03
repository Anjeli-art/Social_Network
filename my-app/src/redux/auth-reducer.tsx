import React from 'react';
import {ActionValuesType} from "./redux-store";


const SET_USER_DATA = "SET_USER_DATA"

export type InitialAuthType = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

let initialstate: InitialAuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state = initialstate, action: ActionValuesType): InitialAuthType => {
    switch (action.type) {

        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: true}

        default:
            return state
    }

}

export const setAuth = (userId: number, email: string, login: string) => ({
    type: SET_USER_DATA,
    data: {userId, email, login}
}) as const
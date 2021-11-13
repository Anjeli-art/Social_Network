import React from 'react';
import {ActionValuesType, RootStateType} from "./redux-store";
import {authApi} from "../api/api";
import {ThunkDispatch} from "redux-thunk";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA"
const ERROR_MESSAGE = "samurai-network/auth/ERROR_MESSAGE"

export type InitialAuthType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
    errorMessage: null | string
}

let initialstate: InitialAuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    errorMessage: null
}

export const authReducer = (state = initialstate, action: ActionValuesType): InitialAuthType => {
    switch (action.type) {

        case SET_USER_DATA:
            return {...state, ...action.payload}
        case ERROR_MESSAGE:
            return {...state, errorMessage: action.errorMessage}
        default:
            return state
    }

}

export const setAuth = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
}) as const

export const setErrorMessage = (errorMessage: string) => {
    return {
        type: ERROR_MESSAGE,
        errorMessage
    } as const
}

export const getAuthHeader = () => async (dispatch: ThunkDispatch<RootStateType, undefined, ActionValuesType>) => {
    let data = await authApi.getAuth()
    if (data.resultCode === 0) {
        let {id, email, login} = data.data
        dispatch(setAuth(id, email, login, true))
    }

}


export const getLogin = (email: string, password: string, remmemberMe: boolean) =>
    async (dispatch: ThunkDispatch<RootStateType, undefined, ActionValuesType>) => {
    let data = await authApi.getlogin(email, password, remmemberMe)
    if (data.resultCode === 0) {
        dispatch(getAuthHeader())
        dispatch(setErrorMessage(""))
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some Error"
        dispatch(setErrorMessage(message))
    }
}


export const getLogout = () => async (dispatch: ThunkDispatch<RootStateType, undefined, ActionValuesType>) => {
    let data = await authApi.getlogout()
    if (data.resultCode === 0) {
        dispatch(setAuth(null, null, null, false))
    }
}


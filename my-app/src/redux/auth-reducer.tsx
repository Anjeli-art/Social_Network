import React from 'react';
import {ActionValuesType, RootStateType} from "./redux-store";
import {authApi} from "../api/api";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";


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


export const getAuthHeader = () => {
    return (dispatch: Dispatch<ActionValuesType>) => {
        authApi.getAuth().then(data => {
            debugger
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuth(id, email, login))
            }
        })

    }
}

export const getLogin = (email: string, password: string, remmemberMe: boolean) => {
    return (dispatch: ThunkDispatch<RootStateType, undefined, ActionValuesType>) => {
        authApi.getlogin(email, password, remmemberMe).then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthHeader())
            }
        })
    }
}

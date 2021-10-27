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
            return {...state, ...action.payload}

        default:
            return state
    }

}

export const setAuth = (userId: number|null, email: string|null, login: string|null,isAuth:boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login,isAuth}
}) as const


export const getAuthHeader = () => {
    return (dispatch: Dispatch<ActionValuesType>) => {
        authApi.getAuth().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuth(id, email, login,true))
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

export const getLogout = () => {
    console.log("222222")
    return (dispatch: ThunkDispatch<RootStateType, undefined, ActionValuesType>) => {
        console.log("33")
        authApi.getlogout().then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuth(null, null, null,false))
            }
        })
    }
}

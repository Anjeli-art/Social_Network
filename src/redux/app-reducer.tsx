import React from 'react';
import {ActionValuesType, RootStateType} from "./redux-store";
import {ThunkDispatch} from "redux-thunk";
import {getAuthHeader} from "./auth-reducer";


const SET_INITIALAIZED = "SET_INITIALAIZED"


export type InitialAppType = {
    initialized: boolean
}

let initialstate: InitialAppType = {
    initialized: false
}

export const appReducer = (state = initialstate, action: ActionValuesType): InitialAppType => {
    switch (action.type) {

        case SET_INITIALAIZED:
            return {...state, initialized: true}

        default:
            return state
    }

}

export const initializedSucces = () => ({
    type: SET_INITIALAIZED
}) as const


export const initialize = () => (dispatch: ThunkDispatch<RootStateType, undefined, ActionValuesType>) => {
    let promise = dispatch(getAuthHeader())
    Promise.all([promise]).then(() => {
        dispatch(initializedSucces())
    })
}




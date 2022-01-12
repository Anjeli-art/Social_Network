import {ActionValuesType, RootStateType} from "./redux-store";
import {authApi, SecurityApi} from "../api/api";
import {ThunkDispatch} from "redux-thunk";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA"
const ERROR_MESSAGE = "samurai-network/auth/ERROR_MESSAGE"
const GET_CAPTCHA_URL = "samurai-network/auth/GET_CAPTCHA_URL"


let initialstate = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    errorMessage: null as null | string,
    captcha: null as string | null
}

export type InitialAuthType = typeof initialstate

export const authReducer = (state = initialstate, action: ActionValuesType): InitialAuthType => {
    switch (action.type) {

        case SET_USER_DATA:
            return {...state, ...action.payload}
        case ERROR_MESSAGE:
            return {...state, errorMessage: action.errorMessage}
        case GET_CAPTCHA_URL:
            return {...state, ...action.payload}
        default:
            return state
    }

}

export const setAuth = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
}) as const

export const getCapthca = (captcha: string | null) => ({
    type: GET_CAPTCHA_URL,
    payload: {captcha}
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


export const getLogin = (email: string, password: string, remmemberMe: boolean, captcha: string | null) =>
    async (dispatch: ThunkDispatch<RootStateType, undefined, ActionValuesType>) => {
        let data = await authApi.getlogin(email, password, remmemberMe, captcha)
        if (data.resultCode === 0) {
            dispatch(getAuthHeader())
            dispatch(setErrorMessage(""))
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = data.messages.length > 0 ? data.messages[0] : "Some Error"
            dispatch(setErrorMessage(message))
        }
    }

export const getCaptchaUrl = () =>
    async (dispatch: ThunkDispatch<RootStateType, undefined, ActionValuesType>) => {
        let response = await SecurityApi.getCaptcha()
        let captchaUrl = response.data.url
        dispatch(getCapthca(captchaUrl))
    }


export const getLogout = () => async (dispatch: ThunkDispatch<RootStateType, undefined, ActionValuesType>) => {
    let data = await authApi.getlogout()
    if (data.resultCode === 0) {
        dispatch(setAuth(null, null, null, false))
    }
}


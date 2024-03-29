import {ActionValuesType, RootStateType} from "./redux-store";
import {profileApi} from "../api/api";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {PhotoType, PostType, ProfileType} from "./types";


const ADD_POST = "samurai-network/profile/ADD-POST"
const DELETE_POST = "samurai-network/profile/DELETE_POST"
const SET_USER_PROFILE = "samurai-network/profile/SET_USER_PROFILE"
const SET_STATUS = "samurai-network/profile/SET_STATUS"
const SET_USER_PHOTO = "samurai-network/profile/SET_USER_PHOTO"
const ERROR_MESSAGE_PROFILE = "samurai-network/profile/ERROR_MESSAGE_PROFILE"
const SET_EDIT_MODE = "samurai-network/profile/SET_EDIT_MODE"
const SET_ERROR_STATUS = "samurai-network/profile/SET_ERROR_STATUS"


let initialstate = {
    posts: [
        {id: 1, message: "first post", likecount: 3},
        {id: 2, message: "second post", likecount: 4}] as PostType[],
    profile:
        // null as ProfileType|null,
        {
            "aboutMe": "",
            "contacts": {
                "facebook": "",
                "website": null,
                "vk": "",
                "twitter": "",
                "instagram": "",
                "youtube": null,
                "github": "",
                "mainLink": null
            },
            "lookingForAJob": true,
            "lookingForAJobDescription": "web dev",
            "fullName": "",
            "userId": 19622,
            "photos": {
                "small": "",
                "large": ""
            }
        }as ProfileType,
    status: "",
    errorMessage: "",
    flagEditMode: false,
    errorStatus: false,
    errorStatusText: ""
}

export type InitialProfilePageType = typeof initialstate

export const profileReducer = (state = initialstate, action: ActionValuesType): InitialProfilePageType => {
    switch (action.type) {
        case  ADD_POST:
            return {...state, posts: [...state.posts, {id: 5, message: action.NewPost, likecount: 2}],}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_USER_PHOTO:
            return {...state, profile: {...state.profile, photos: action.file}}
        case DELETE_POST:
            return {...state, posts: state.posts.filter(el => el.id !== action.id)}
        case ERROR_MESSAGE_PROFILE:
            return {...state, errorMessage: action.errorMessage}
        case SET_EDIT_MODE:
            return {...state, flagEditMode: action.flagEditMode}
        case SET_ERROR_STATUS:
            console.log("редюсер копия объекта")
            return {...state, errorStatus: action.errorStatus, errorStatusText: action.errorStatusText}
        default:
            return state
    }
}

export const addPostActionCreator = (NewPost: string) => ({type: ADD_POST, NewPost}) as const
export const setUsersProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}) as const
export const setUserStatus = (status: string) => ({type: SET_STATUS, status}) as const
export const deletePostActionCreator = (id: number) => ({type: DELETE_POST, id}) as const
export const setUserPhoto = (file: PhotoType) => ({type: SET_USER_PHOTO, file}) as const
export const setErrorMessageProfile = (errorMessage: string) => ({type: ERROR_MESSAGE_PROFILE, errorMessage}) as const
export const setProfileFlag = (flagEditMode: boolean) => ({type: SET_EDIT_MODE, flagEditMode}) as const
export const setModalErrorStatus = (errorStatus: boolean, errorStatusText: string) => ({
    type: SET_ERROR_STATUS,
    errorStatus,
    errorStatusText
}) as const


export const getProfileUser = (userId: number) => async (dispatch: Dispatch<ActionValuesType>) => {
    let data = await profileApi.getProfile(userId)
    dispatch(setUsersProfile(data))

}

export const getUserStatus = (userId: number) => async (dispatch: Dispatch<ActionValuesType>) => {
    let data = await profileApi.getStatus(userId)
    dispatch(setUserStatus(data))

}

export const updateUserStatus = (status: string) => async (dispatch: Dispatch<ActionValuesType>) => {
    console.log("Санка сработала")
    try {
        let response = await profileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status))
            dispatch(setModalErrorStatus(false, ""))
            console.log("Санка сработала без ошибки")
        }
    } catch (error) {
        dispatch(setModalErrorStatus(true, "Status not correct"))
        console.log("Санка сработала c ошибкой")

    }

}
export const savePhoto = (file: File) => async (dispatch: Dispatch<ActionValuesType>) => {
    let response = await profileApi.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(setUserPhoto(response.data.data.photos))
    }

}
export const saveProfile = (profile: ProfileType) => async (dispatch: ThunkDispatch<RootStateType, undefined, ActionValuesType>, getState: any) => {

    let userId = getState().auth.userId
    let response = await profileApi.saveProfile(profile)
    if (response.data.resultCode === 0) {
        await dispatch(getProfileUser(userId))
        dispatch(setErrorMessageProfile(""))
        dispatch(setProfileFlag(false))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
        dispatch(setErrorMessageProfile(message))
        dispatch(setProfileFlag(true))
    }
}

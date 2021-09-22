import {combineReducers, createStore, Store} from "redux";
import {addPostActionCreator, profileReducer, upDateNewPostActionCreator} from "./profile-reducer";
import {addMessageType, dialogsReducer, upDateNewMessageType} from "./dialogs-reducer";
import {foolowAC, setUserAC, unfoolowAC, userReducer } from "./users-reducer";

export type ActionValuesType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof upDateNewPostActionCreator>
    | addMessageType
    | upDateNewMessageType
    |ReturnType<typeof foolowAC>
    |ReturnType<typeof unfoolowAC>
    |ReturnType<typeof setUserAC>

let RootReducer = combineReducers({
    profilepage: profileReducer,
    dialogepage: dialogsReducer,
    userspage:userReducer
})

export type RootStateType = ReturnType<typeof RootReducer>

export let store: Store<RootStateType, ActionValuesType> = createStore(RootReducer)
//
// console.log('store: ', store)
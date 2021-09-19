import {combineReducers, createStore, Store} from "redux";
import {addPostActionCreator, profileReducer, upDateNewPostActionCreator} from "./profile-reducer";
import {addMessageType, dialogsReducer, upDateNewMessageType} from "./dialogs-reducer";

export type ActionValuesType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof upDateNewPostActionCreator>
    | addMessageType
    | upDateNewMessageType

let RootReducer = combineReducers({
    profilepage: profileReducer,
    dialogepage: dialogsReducer
})

export type RootStateType = ReturnType<typeof RootReducer>

export let store: Store<RootStateType, ActionValuesType> = createStore(RootReducer)
//
// console.log('store: ', store)
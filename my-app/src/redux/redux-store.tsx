import {combineReducers, createStore, Store} from "redux";
import {addPostActionCreator, profileReducer, setUsersProfile, upDateNewPostActionCreator} from "./profile-reducer";
import {addMessageType, dialogsReducer, upDateNewMessageType} from "./dialogs-reducer";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleisFething,
    unfollow,
    userReducer
} from "./users-reducer";
import {authReducer, setAuth} from "./auth-reducer";

export type ActionValuesType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof upDateNewPostActionCreator>
    | addMessageType
    | upDateNewMessageType
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleisFething>
    | ReturnType<typeof setUsersProfile>
    | ReturnType<typeof setAuth>

let RootReducer = combineReducers({
    profilepage: profileReducer,
    dialogepage: dialogsReducer,
    userspage: userReducer,
    auth: authReducer
})

export type RootStateType = ReturnType<typeof RootReducer>

export let store: Store<RootStateType, ActionValuesType> = createStore(RootReducer)

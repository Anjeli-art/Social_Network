import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {addPostActionCreator, profileReducer, setUsersProfile, upDateNewPostActionCreator} from "./profile-reducer";
import {addMessageType, dialogsReducer, upDateNewMessageType} from "./dialogs-reducer";
import {
    followsucsess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleisFething, toggleisFollowig,
    unfollowsucsess,
    userReducer
} from "./users-reducer";
import {authReducer, setAuth} from "./auth-reducer";
import thunkMiddleware from "redux-thunk"

export type ActionValuesType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof upDateNewPostActionCreator>
    | addMessageType
    | upDateNewMessageType
    | ReturnType<typeof followsucsess>
    | ReturnType<typeof unfollowsucsess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleisFething>
    | ReturnType<typeof setUsersProfile>
    | ReturnType<typeof setAuth>
    | ReturnType<typeof toggleisFollowig>


let RootReducer = combineReducers({
    profilepage: profileReducer,
    dialogepage: dialogsReducer,
    userspage: userReducer,
    auth: authReducer
})

export type RootStateType = ReturnType<typeof RootReducer>

export let store: Store<RootStateType, ActionValuesType> = createStore(RootReducer, applyMiddleware(thunkMiddleware))

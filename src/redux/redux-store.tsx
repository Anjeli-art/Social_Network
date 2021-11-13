import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {
    addPostActionCreator, deletePostActionCreator,
    profileReducer,
    setUsersProfile, setUserStatus,
} from "./profile-reducer";
import {addMessageType, dialogsReducer} from "./dialogs-reducer";
import {
    followsucsess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleisFething, toggleisFollowig,
    unfollowsucsess,
    userReducer
} from "./users-reducer";
import {authReducer, setAuth, setErrorMessage} from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import {appReducer, initializedSucces} from "./app-reducer";

export type ActionValuesType =
    ReturnType<typeof addPostActionCreator>
    | addMessageType
    | ReturnType<typeof followsucsess>
    | ReturnType<typeof unfollowsucsess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleisFething>
    | ReturnType<typeof setUsersProfile>
    | ReturnType<typeof setAuth>
    | ReturnType<typeof toggleisFollowig>
    | ReturnType<typeof setUserStatus>
    | ReturnType<typeof setErrorMessage>
    | ReturnType<typeof initializedSucces>
    | ReturnType<typeof deletePostActionCreator>


let RootReducer = combineReducers({
    profilepage: profileReducer,
    dialogepage: dialogsReducer,
    userspage: userReducer,
    auth: authReducer,
    app: appReducer,
})


export type RootStateType = ReturnType<typeof RootReducer>

export let store: Store<RootStateType, ActionValuesType> = createStore(RootReducer, applyMiddleware(thunkMiddleware))

//@ts-ignore
window.store = store

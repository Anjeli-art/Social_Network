import {applyMiddleware, combineReducers, createStore, Store,compose} from "redux";
import {
    addPostActionCreator, deletePostActionCreator,
    profileReducer, setUserPhoto,
    setUsersProfile, setUserStatus,
} from "./profile-reducer";
import {AddMessageType, DeleteMessageType, dialogsReducer} from "./dialogs-reducer";
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
    | AddMessageType
    |DeleteMessageType
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
    | ReturnType<typeof setUserPhoto>


let RootReducer = combineReducers({
    profilepage: profileReducer,
    dialogepage: dialogsReducer,
    userspage: userReducer,
    auth: authReducer,
    app: appReducer,
})
export type RootStateType = ReturnType<typeof RootReducer>

//@ts-ignore
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const store:Store<RootStateType, ActionValuesType> = createStore(RootReducer,composeEnhancers(applyMiddleware(thunkMiddleware)
// ));

//extantion

export let store: Store<RootStateType, ActionValuesType> = createStore(RootReducer, applyMiddleware(thunkMiddleware))

//@ts-ignore
window.store = store



import {addPostActionCreator} from "./profile-reducer";
import {addMessageType} from "./dialogs-reducer";

// export type StoreType = {
//     _state: StateType
//     getState: () => StateType
//     _callsubscriber: () => void
//     dispatch: (action: ActionValuesType) => void
//     subscribe: (observer: any) => void
//
// }



// export let store: StoreType = {
//     _state: {
//         profilepage: {
//             posts: [
//                 {id: 1, message: "vvv", likecount: 3},
//                 {id: 2, message: "vvv", likecount: 4}],
//             NewPost: "",
//         },
//
//         dialogepage: {
//             messages: [
//                 {id: 1, message: "Hello"},
//                 {id: 2, message: "How are you?"},
//                 {id: 3, message: "Hi"},
//                 {id: 4, message: "Yo"},],
//             NewMessage: "",
//             dialogs: [
//                 {id: 1, name: "Dima"},
//                 {id: 2, name: "Sasha"},
//                 {id: 3, name: "Kolya"},
//                 {id: 4, name: "Sveta"},
//                 {id: 5, name: "Andrey"},
//                 {id: 6, name: "Vitya"},]
//         },
//     },
//     getState() {
//         return this._state
//     },
//     _callsubscriber() {
//         console.log("fff")
//     },
//     subscribe(observer: any) {
//         this._callsubscriber = observer
//     },
//     dispatch(action) {
//
//         // this._state.profilepage = profileReducer(this._state.profilepage, action)
//         // this._state.dialogepage = dialogsReducer(this._state.dialogepage, action)
//         this._callsubscriber()
//         console.log("dddddddddddd")
//
//     }
//
//
// }


// @ts-ignore
window.store = store


export type PostTypeMap = {
    message: string | undefined
    likecount: number
}
export type MessageTypeMap = {
    message: string | undefined
}


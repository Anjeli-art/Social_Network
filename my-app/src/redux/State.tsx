import React from 'react';

type addPostType={
    type:"ADD-POST"
}
type upDateNewPostType={
    type:"UPDATE-NEW-POST"
    New:string
}
type addMessageType={
    type:"ADD-MESSGE"
}
type upDateNewMessageType={
    type:"UPDATE-NEW-MESSAGE"
    New:string
}

type ActionValuesType=addPostType|upDateNewPostType|addMessageType|upDateNewMessageType

export type StoreType={
    _state: StateType
    getState:()=>StateType
    _callsubscriber:()=>void
    dispatch:(action:ActionValuesType)=>void
    subscribe:(observer: any)=>void
    // addPost:()=>void
    // upDateaddPost:(New:string)=>void
    // addMessage:()=>void
    // upDateaddMessage:(New:string)=>void

}

export let store:StoreType={
    _state: {
        profilepage: {
            posts: [
                {id: 1, message: "vvv", likecount: 3},
                {id: 2, message: "vvv", likecount: 4}],
            NewPost:"",
        },

        dialogepage: {
            messages: [
                {id: 1, message: "Hello"},
                {id: 2, message: "How are you?"},
                {id: 3, message: "Hi"},
                {id: 4, message: "Yo"},],
            NewMessage:"",
            dialogs: [
                {id: 1, name: "Dima"},
                {id: 2, name: "Sasha"},
                {id: 3, name: "Kolya"},
                {id: 4, name: "Sveta"},
                {id: 5, name: "Andrey"},
                {id: 6, name: "Vitya"},]
        },
    },
    getState(){return this._state},
    _callsubscriber(){
        console.log("fff")
    },
    subscribe(observer: any){
        this._callsubscriber = observer
    },
    dispatch(action){
        console.log("dddddddddddd")
        if(action.type==="ADD-POST"){
            console.log("dsssssssssdd")
            let newPost={id:5,message:this._state.profilepage.NewPost,likecount:2}
            this._state.profilepage.posts.push(newPost)
           this._state.profilepage.NewPost=""
            this._callsubscriber()
        }else if(action.type==="UPDATE-NEW-POST"){
            console.log("dds999999999dd")
            this._state.profilepage.NewPost=action.New
            this._callsubscriber()
        }else if(action.type==="ADD-MESSGE"){
            let newMessage={id:5,message:this._state.dialogepage.NewMessage}
            this._state.dialogepage.messages.push(newMessage)
            this._state.dialogepage.NewMessage=""
            this._callsubscriber()
        }else if(action.type==="UPDATE-NEW-MESSAGE"){
            this._state.dialogepage.NewMessage=action.New
            this._callsubscriber()
        }
    }


    // addPost(){
    //     let newPost={id:5,message:this._state.profilepage.NewPost,likecount:2}
    //     this._state.profilepage.posts.push(newPost)
    //     this._state.profilepage.NewPost=""
    //     this._callsubscriber()
    // },
    // upDateaddPost(New:string){
    //     this._state.profilepage.NewPost=New
    //     this._callsubscriber()
    // },
    // addMessage(){
    //     let newMessage={id:5,message:this._state.dialogepage.NewMessage}
    //     this._state.dialogepage.messages.push(newMessage)
    //     this._state.dialogepage.NewMessage=""
    //     this._callsubscriber()
    // },
    // upDateaddMessage(New:string){
    //     this._state.dialogepage.NewMessage=New
    //     this._callsubscriber()
    // },

}

// @ts-ignore
window.store=store

export type PostType = {
    id: number
    message: string|undefined
    likecount: number
}

export type MessageType = {
    id: number
    message: string|undefined
}
export type DialogType = {
    id: number
    name: string
}

export type ProfilepageType = {
    posts: PostType[]
    NewPost:string
}

export type StateType = {
    profilepage: ProfilepageType
    dialogepage: DialogepageepageType
}

export type DialogepageepageType={
    messages: MessageType[]
    NewMessage:string
    dialogs: DialogType[]
}


export type PostTypeMap={
    message:string|undefined
    likecount:number
}
export type MessageTypeMap = {
    message: string|undefined
}


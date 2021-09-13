import React from "react";
import {addPostActionCreator, upDateNewPostActionCreator} from "../../../redux/profile-reducer";
import {MyPost} from "./MyPost";
import {Store} from "redux";
import {ActionValuesType, RootStateType} from "../../../redux/redux-store";


export type propsTypeMyPost = {
    store: Store<RootStateType, ActionValuesType>
    // posts: PostType[]
    // dispatch:(action:ActionValuesType)=>void
    // NewPost: string
}
export const MyPostContainer: React.FC<propsTypeMyPost> = (props) => {

    let state = props.store.getState()

    let onButtonClick = () => {
        let action = addPostActionCreator()
        props.store.dispatch(action);
    }
    let onChangeText = (text: string) => {
        let action = upDateNewPostActionCreator(text)
        props.store.dispatch(action);
    }


    return (
        <MyPost updateNewPostText={onChangeText} addPost={onButtonClick} posts={state.profilepage.posts}
                NewPost={state.profilepage.NewPost}/>
    )

}
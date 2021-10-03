import React from "react";
import {addPostActionCreator, PostType, upDateNewPostActionCreator} from "../../../redux/profile-reducer";
import {MyPost} from "./MyPost";
import {ActionValuesType, RootStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";


type MapDispatch = {
    updateNewPostText: (text: string) => void,
    addPost: () => void
}

type MapStateToProps = {
    posts: PostType[],
    NewPost: string
}

const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        posts: state.profilepage.posts,
        NewPost: state.profilepage.NewPost,
    }
}
const mapDispatchToProps = (dispatch: (action: ActionValuesType) => void): MapDispatch => {
    return {
        updateNewPostText: (text: string) => {
            dispatch(upDateNewPostActionCreator(text))
        },
        addPost: () => {
            dispatch(addPostActionCreator())
        },
    }
}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)
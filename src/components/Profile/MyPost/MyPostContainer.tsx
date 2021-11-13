import React from "react";
import {addPostActionCreator, PostType} from "../../../redux/profile-reducer";
import {MyPost} from "./MyPost";
import {ActionValuesType, RootStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";


type MapDispatch = {
    addPost: (NewPost:string) => void
}

type MapStateToProps = {
    posts: PostType[],
}

const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        posts: state.profilepage.posts,
    }
}
const mapDispatchToProps = (dispatch: (action: ActionValuesType) => void): MapDispatch => {
    return {
        addPost: (NewPost:string) => {
            dispatch(addPostActionCreator(NewPost))
        },
    }
}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)
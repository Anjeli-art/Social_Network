import React from "react";
import s from "./MyPost.module.css"
import {Post} from "./Post/Post";
import {PostType} from "../../../redux/State";

export type propsTypeMyPost = {
    posts: PostType[]
    dispatch:(action:any)=>void
    // addPost: () => void
    NewPost: string
    // upDateaddPost: (New: string) => void
}
export const MyPost: React.FC<propsTypeMyPost> = (props) => {

    let PostElement = props.posts.map(p => <Post message={p.message} likecount={p.likecount}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>()
    let onButtonClick = () => {
        props.dispatch({type:"ADD-POST"});
    }
    let onChangeText = () => {
        if (newPostElement.current?.value) {
            const text = newPostElement.current.value;
            props.dispatch({type:"UPDATE-NEW-POST",New:text});
        }
    }

    return (
        <div>my post
            <div>
                <textarea onChange={onChangeText} className={s.input} ref={newPostElement} value={props.NewPost}/>
                <button className={s.button} onClick={onButtonClick}>+</button>
                <button className={s.button}>x</button>
            </div>
            <div>
                {PostElement}
            </div>
        </div>
    )
}
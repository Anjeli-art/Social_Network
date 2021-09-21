import React from "react";
import { PostType } from "../../../redux/profile-reducer";
import s from "./MyPost.module.css"
import {Post} from "./Post/Post";




export type propsTypeMyPost = {
    posts: PostType[]
    NewPost: string
    updateNewPostText: (text:string) => void
    addPost: () => void
}
export const MyPost: React.FC<propsTypeMyPost> = (props) => {

    let PostElement = props.posts.map(p => <Post key={p.id} message={p.message} likecount={p.likecount}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>()
    let onaddPost = () => {
        props.addPost();
    }
    let onPostText = () => {
        if (newPostElement.current?.value) {
            const text = newPostElement.current.value;
            props.updateNewPostText(text);
        }
    }

    return (
        <div>my post
            <div>
                <textarea onChange={onPostText} className={s.input} ref={newPostElement} value={props.NewPost}/>
                <button className={s.button} onClick={onaddPost}>+</button>
                <button className={s.button}>x</button>
            </div>
            <div>
                {PostElement}
            </div>
        </div>
    )
}
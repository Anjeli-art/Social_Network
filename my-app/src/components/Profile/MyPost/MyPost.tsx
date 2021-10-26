import {useFormik} from "formik";
import React from "react";
import {PostType} from "../../../redux/profile-reducer";
import s from "./MyPost.module.css"
import {Post} from "./Post/Post";


export type propsTypeMyPost = {
    posts: PostType[]
    NewPost: string
    updateNewPostText: (text: string) => void
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
            {/*<div>*/}
            {/*    <textarea onChange={onPostText}  ref={newPostElement} value={props.NewPost}/>*/}//formik
            {/*    <button  onClick={onaddPost}>+</button>*/}
            {/*</div>*/}
            <MyPostForm/>
            <div>
                {PostElement}
            </div>
        </div>
    )
}

const MyPostForm = () => {
    const formik = useFormik({
        initialValues: {
            NewPost: '',
        },
        onSubmit: values => {

            alert(JSON.stringify(values.NewPost));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            {/*<label htmlFor="email"></label>*/}
            <input
                className={s.input}
                id="NewPost"
                name="NewPost"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.NewPost}
            />

            <button type="submit" className={s.button}>Отправить</button>
        </form>
    )

}
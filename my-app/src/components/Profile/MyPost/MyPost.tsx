import {useFormik} from "formik";
import React from "react";
import {PostType} from "../../../redux/profile-reducer";
import s from "./MyPost.module.css"
import {Post} from "./Post/Post";


export type TypeMyPost = {
    posts: PostType[]
    // NewPost: string
    // updateNewPostText: (text: string) => void
    addPost: (NewPost: string) => void
}
export const MyPost: React.FC<TypeMyPost> = (props) => {

    let PostElement = props.posts.map(p => <Post key={p.id} message={p.message} likecount={p.likecount}/>)
    // let newPostElement = React.createRef<HTMLTextAreaElement>()

    let onAddPost = (NewPost: string) => {
        props.addPost(NewPost);
    }
    // let onPostText = () => {
    //     if (newPostElement.current?.value) {
    //         const text = newPostElement.current.value;
    //         props.updateNewPostText(text);
    //     }
    // }

    return (
        <div>my post
            {/*<div>*/}
            {/*    <textarea onChange={onPostText}  ref={newPostElement} value={props.NewPost}/>*/}//formik
            {/*    <button  onClick={onaddPost}>+</button>*/}
            {/*</div>*/}
            <MyPostForm onAddPost={onAddPost}/>
            <div>
                {PostElement}
            </div>
        </div>
    )
}
type MyPostFormProps = {
    onAddPost: (NewPost: string) => void
}

// type MyPostFormErrors = {
//     NewPost?: string
// }
const MyPostForm = (props: MyPostFormProps) => {
    const formik = useFormik({
        initialValues: {
            NewPost: '',
        },
        // validate: (values) => {
        //     const errors: MyPostFormErrors = {};
        //     if (values.NewPost.length > 30) {
        //         errors.NewPost = "max length 30"
        //     }
        // },

        onSubmit: (values, {setSubmitting}) => {
            props.onAddPost(values.NewPost)
            setSubmitting(true)
        },

    });
    console.dir(formik)
    return <form onSubmit={formik.handleSubmit}>
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

}

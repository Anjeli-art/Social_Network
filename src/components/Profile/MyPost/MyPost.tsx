import {useFormik} from "formik";
import React from "react";
import {PostType} from "../../../redux/profile-reducer";
import s from "./MyPost.module.css"
import {Post} from "./Post/Post";


export type TypeMyPost = {
    posts: PostType[]
    addPost: (NewPost: string) => void
}


export const MyPost: React.FC<TypeMyPost>=React.memo((props)=> {
console.log("ggggggggggg")

    let PostElement =[...props.posts].reverse().map(p => <Post key={p.id} message={p.message} likecount={p.likecount}/>)


    let onAddPost = (NewPost: string) => {
        props.addPost(NewPost);
    }
    return (
        <div>
            <MyPostForm onAddPost={onAddPost}/>
            <div>
                {PostElement}
            </div>
        </div>
    )
})


type MyPostFormProps = {
    onAddPost: (NewPost: string) => void
}

type MyPostFormErrors = {
    NewPost?: string
}
const MyPostForm = (props: MyPostFormProps) => {
    const formik = useFormik({
        initialValues: {
            NewPost: '',
        },
        validate: (values) => {
            const errors: MyPostFormErrors = {};
            if (values.NewPost.length > 15) {
                errors.NewPost = "max length 15"
            }
            return errors
        },


        onSubmit: values => {
            props.onAddPost(values.NewPost)
        },

    });

    return <form onSubmit={formik.handleSubmit}>
        <input
            className={formik.errors.NewPost ? s.inputError : s.input}
            id="NewPost"
            name="NewPost"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.NewPost}
        />

        <button type="submit" className={s.button} disabled={!!formik.errors.NewPost}>Отправить</button>
        {formik.errors && <span className={s.spanError}>{formik.errors.NewPost}</span>}
    </form>

}

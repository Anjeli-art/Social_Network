import React from "react";
import s from "./Profile.module.css"
import {MyPost} from "./MyPost/MyPost";
import {ProfileInfo} from "./MyPost/ProfileInfo/ProfileInfo";
import {PostType} from "../../redux/State";

export type propsTypeProfile={
    profile:PostType[]
    dispatch:(action:any)=>void
    // addPost:()=>void
    NewPost:string
    // upDateaddPost:(New:string)=>void
}


export const Profile:React.FC<propsTypeProfile> = (props) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPost posts={props.profile}  NewPost={props.NewPost} dispatch={props.dispatch}/>
        </div>
    )
}
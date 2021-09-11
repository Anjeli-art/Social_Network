import React from "react";
import s from "./Post.module.css"
import {PostTypeMap} from "../../../../redux/State";




export const Post:React.FC<PostTypeMap>= (props) => {
    return (
        <div className={s.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTluB_KJTFuFjPv37y1r9ANOA8s60vcfoM5YA&usqp=CAU"/>
            {props.message}
            <div className={s.like}>
                {props.likecount}
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTsHRX8t1HF3K4RA3EZk-icklePWdLpfAUlBOzsapp7pZdfdl-_ZYkkVllttQATUl-sao&usqp=CAU"/>
            </div>
        </div>
    )
}
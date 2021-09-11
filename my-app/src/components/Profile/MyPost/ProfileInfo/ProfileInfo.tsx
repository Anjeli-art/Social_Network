import React from "react";
import s from "./ProfileInfo.module.css"

export const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src="https://cdn.pixabay.com/photo/2021/07/23/20/06/winter-6488080__340.jpg" className={s.pole}/>
            </div>
            <div><img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTluB_KJTFuFjPv37y1r9ANOA8s60vcfoM5YA&usqp=CAU"
                className={s.ava}/>+description
            </div>
        </div>
    )

}

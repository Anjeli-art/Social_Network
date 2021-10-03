import React from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../../../common/preloader/Preloader";
import {ProfileType} from "../../../../redux/profile-reducer";

type ProfileInfoType = {
    profile: ProfileType
}

export const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img src="https://cdn.pixabay.com/photo/2021/07/23/20/06/winter-6488080__340.jpg" className={s.pole}/>
            </div>
            <div className={s.ava}>
                <img src={props.profile.photos.large}/>
                <div>
                    <p>{props.profile.fullName}</p>
                    <p>{props.profile.aboutMe}</p>
                </div>
            </div>
        </div>
    )

}

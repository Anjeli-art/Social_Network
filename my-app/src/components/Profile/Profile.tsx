import React from "react";
import {ProfileInfo} from "./MyPost/ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPost/MyPostContainer";
import {ProfileType} from "../../redux/profile-reducer";


type ProfileTypeProps = {
    profile:ProfileType
}

export const Profile: React.FC<ProfileTypeProps> = (props) => {

    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostContainer/>
        </div>
    )
}
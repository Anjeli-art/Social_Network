import React from "react";
import {ProfileInfo} from "./MyPost/ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPost/MyPostContainer";
import {ProfileType} from "../../redux/types";



type ProfileTypeProps = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner:boolean
    savePhoto:(photo:File)=>void
    saveProfile:(profile:ProfileType)=>void
    errorMessage:string
    flagEditMode:boolean
}

export const Profile: React.FC<ProfileTypeProps> = (props) => {

    return (
        <div>
            <ProfileInfo
                {...props}
            />
            <MyPostContainer/>
        </div>
    )
}
import React, {ChangeEventHandler} from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../../../common/preloader/Preloader";
import {ProfileType} from "../../../../redux/profile-reducer";
import {StatusWithHooks} from "./Status/StatusWithHooks";
import userphoto from "../../../../assets/images/images.jpg";

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: any) => void//////////////////////////////////////////////////////
}

export const ProfileInfo: React.FC<ProfileInfoType> = ({profile, status, updateStatus, ...props}) => {
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: any) => {/////////////////////////////////////////////////////////////////////////
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div>
            <div className={s.ava}>
                <img src={profile.photos.small || userphoto}/>
                <div>
                    {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
                </div>
                <div>
                    <p>{profile.fullName}</p>
                    <p>{profile.lookingForAJobDescription}</p>
                    <p>{profile.lookingForAJob}</p>
                    <p>{profile.contacts.instagram}</p>
                </div>
                <StatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )

}

import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../../../common/preloader/Preloader";
import {setProfileFlag} from "../../../../redux/profile-reducer";
import {StatusWithHooks} from "./Status/StatusWithHooks";
import userphoto from "../../../../assets/images/images.jpg";
import {ProfileDataForm} from "./ProfileDataForm/ProfileDataForm";
import {ProfileData} from "./ProfileDataForm/ProfileData";
import {useDispatch, useSelector} from "react-redux";
import {ActionValuesType, RootStateType} from "../../../../redux/redux-store";
import {ProfileType} from "../../../../redux/types";


type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
    saveProfile: (profile: ProfileType) => void
    errorMessage: string
    flagEditMode?: boolean
}

export const ProfileInfo: React.FC<ProfileInfoType> = ({profile,
                                                           status,
                                                           updateStatus,
                                                           saveProfile,
                                                           flagEditMode,
                                                           ...props
                                                       }) => {


    const flagEditModeSelector = useSelector<RootStateType, boolean>(state => state.profilepage.flagEditMode)
    const dispatch=useDispatch()


    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    let goToEditMode = () => {
        dispatch(setProfileFlag(!flagEditModeSelector))
    }

    return (
        <div>
            <div className={s.ava}>
                <img src={profile.photos.small || userphoto}/>
                <div>
                    {props.isOwner && <input type="file"  onChange={onMainPhotoSelected}/>}
                    <StatusWithHooks status={status} updateStatus={updateStatus}/>
                    {flagEditModeSelector ?
                        <ProfileDataForm saveProfile={saveProfile}
                                         profile={profile}/>
                        : <ProfileData profile={profile} isOwner={props.isOwner} goToEditMode={goToEditMode}/>}
                    <p className={s.errortext}>{props.errorMessage}</p>
                </div>
            </div>
        </div>
    )

}

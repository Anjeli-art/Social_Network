import {ContactsType, ProfileType} from "../../../../../redux/profile-reducer";
import React from "react";
import s from "../ProfileInfo.module.css";

type ProfileDataType={
    profile: ProfileType
    isOwner:boolean
    goToEditMode:()=>void

}

export const ProfileData: React.FC<ProfileDataType> = ({profile,isOwner,goToEditMode,}) => {
    return (
        <div>
            {isOwner && <button onClick={()=>goToEditMode()}>edit</button>}
            <p><b>Name:</b>{profile.fullName}</p>
            <p><b>Looking for a job:</b>{profile.lookingForAJob ? "yes" : "no"}</p>
            {profile.lookingForAJob && <p><b>My professional skills:</b>{profile.lookingForAJobDescription}</p>}
            <p><b>About me:</b>{profile.aboutMe}</p>
            <p><b>Contacts:</b>{Object.keys(profile.contacts).map((k)=> <Contact key={k} contactKey={k}
                                                                                 contactValue={profile.contacts[k as keyof ContactsType]}/>)}</p>
        </div>
    )
}



type ContactType = {
    contactKey:string
    contactValue: null|string
}

const Contact: React.FC<ContactType> = ({contactKey, contactValue}) => {

    return (
        <p className={s.contact}><b>{contactKey}:</b>{contactValue}</p>
    )
}

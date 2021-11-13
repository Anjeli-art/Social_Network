import React, {PropsWithChildren} from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../../../common/preloader/Preloader";
import {ProfileType} from "../../../../redux/profile-reducer";
import {StatusWithHooks} from "./Status/StatusWithHooks";

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo: React.FC<ProfileInfoType> = ({profile,status,updateStatus,...props}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.ava}>
                <img src={profile.photos.small}/>
                <div>
                    <p>{profile.fullName}</p>
                    <p>{profile.aboutMe}</p>
                </div>
                <StatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )

}

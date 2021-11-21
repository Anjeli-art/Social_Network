import {ProfileType} from "../../../../../redux/profile-reducer";
import React from "react";
import {Field, Formik} from "formik";
import {createField} from "../../../../../utils/form-helper";
import s from "../ProfileInfo.module.css";


type ProfileDataFormType = {
    saveProfile: (profile: ProfileType) => void
    goToEditMode: (mode: boolean) => void
    profile: ProfileType

}

type ErrorsType = {
    fullName?: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    aboutMe?: string
}
export const ProfileDataForm = ({profile, goToEditMode, saveProfile}: ProfileDataFormType) => {


    return (
        <Formik
            initialValues={{
                aboutMe: profile.aboutMe,
                contacts: {
                    facebook: profile.contacts.facebook,
                    website: profile.contacts.website,
                    vk: profile.contacts.vk,
                    twitter: profile.contacts.twitter,
                    instagram: profile.contacts.instagram,
                    youtube: profile.contacts.youtube,
                    github: profile.contacts.github,
                    mainLink: profile.contacts.mainLink
                },
                lookingForAJob: profile.lookingForAJob,
                lookingForAJobDescription: profile.lookingForAJobDescription,
                fullName: profile.fullName,
                userId: profile.userId,
                photos: {
                    small: profile.photos.small,
                    large: profile.photos.large
                }
            }}
            validate={values => {
                const errors: ErrorsType = {};
                if (values.fullName.length > 15) {
                    errors.fullName = "max length 20"
                }
                return errors;
            }}
            onSubmit={(values) => {
                console.log("ddd")
                saveProfile((values))
                goToEditMode(false)

            }}>
            {({
                  handleSubmit,
                  errors,
                  touched,
              }) => (

                <form onSubmit={handleSubmit}>
                    {createField("text", "fullName", "fullName", errors.fullName, touched.fullName, "fullName", "div")}
                    <div>
                        <Field type="checkbox" name="lookingForAJob"/>
                    </div>
                    {createField("text", "lookingForAJobDescription", "lookingForAJobDescription", errors.lookingForAJobDescription, touched.lookingForAJobDescription, "lookingForAJobDescription", "div")}
                    {createField("text", "aboutMe", "aboutMe", errors.aboutMe, touched.aboutMe, "aboutMe", "div")}
                    <div>
                        <div><b>Contacts:</b>{Object.keys(profile.contacts).map((k) => {
                            return <div key={k} className={s.contact}>
                                <b>{k}:{createField("text", `contacts.${k}`, k, `contacts.${k}`, false, k, "div")}</b>
                            </div>
                        })}
                        </div>

                        <button type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    );
}


export type UserType = {
    name: string
    id: number
    photos: {
        "small": null | string,
        "large": null | string
    }
    status: string
    followed: boolean
}
export type PostType = {
    id: number
    message: string | undefined
    likecount: number
}

export type ContactsType = {
    github: null | string
    vk: null | string
    facebook: null | string
    instagram: null | string
    twitter: null | string
    website: null | string
    youtube: null | string
    mainLink: null | string
}

export type PhotoType = {
    small: string|null
    large: string|null
}
export type ProfileType = {
    contacts: ContactsType
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotoType

}

export type MessageType = {
    id: number
    message: string | undefined
}
export type DialogType = {
    id: number
    name: string
}
import axios from 'axios';
import {ProfileType} from "../redux/types";




const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {"API-KEY": "7ccc0386-8558-4e56-b3f7-82cd09cd2d3e"}
})

export const usersApi = {
    getUsers: (currentPage = 1, pageSize = 10) => {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        })

    },
    getSubscriptionDelete: (id: number) => {
        return instance.delete(`/follow/${id}`).then(response => {
            return response.data
        })
    },
    getSubscriptionPost: (id: number) => {
        return instance.post(`/follow/${id}`).then(response => {
            return response.data
        })
    }
}

export const authApi = {
    getAuth: () => {
        return instance.get(`/auth/me`).then(response => {
            return response.data
        })
    },
    getlogin: (email:string,password:string,remmemberMe:boolean,captcha: string | null) => {
        console.log(captcha)
        return instance.post(`/auth/login`,{email:email,password:password,remmemberMe:remmemberMe,captcha:captcha}).then(response => {
            return response.data
        })
    },
    getlogout: () => {
        return instance.delete(`/auth/login`).then(response => {
            return response.data
        })
    },

}

export const SecurityApi={
    getCaptcha:()=>{
        return instance.get(`/security/get-captcha-url`).then(response => {
            return response
        })
    }


}





export const profileApi = {
    getProfile: (id: number) => {
        return instance.get("/profile/" + id).then(response => {
            return response.data
        })
    },
    getStatus: (id: number) => {
        return instance.get("/profile/status/" + id).then(response => {

            return response.data
        })
    },
    updateStatus: (status: string) => {
        return instance.put("/profile/status/", {status: status})
    },
    savePhoto:(file:File)=>{
        let formData=new FormData()
        formData.append("image",file)
        return instance.put("/profile/photo/",formData,{headers:{"Content-Type":"multipart/form-data"}} )
    },
    saveProfile:(profile:ProfileType) => {
        return instance.put("/profile/", profile)
    },
}
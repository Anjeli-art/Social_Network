import axios from 'axios';
import React from 'react';


const instatce = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {"API-KEY": "7ccc0386-8558-4e56-b3f7-82cd09cd2d3e"}
})

export const usersApi = {
    getUsers: (currentPage = 1, pageSize = 10) => {
        return instatce.get(`/users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        })

    }
}

export const authApi = {
    getAuth: () => {
        return instatce.get(`/auth/me`).then(response => {
            return response.data
        })
    }
}

export const subscriptionApi = {
    getSubscriptionDelete: (id: number) => {
        return instatce.delete(`/follow/${id}`).then(response => {
            return response.data
        })
    },
    getSubscriptionPost: (id: number) => {
        return instatce.post(`/follow/${id}`).then(response => {
            return response.data
        })
    }
}

export const profileApi = {
    getProfile: (id: string) => {
        return instatce.get("/profile/" + id).then(response => {
            return response.data
        })
    }
}

import React from 'react';
import {RootStateType} from "./redux-store";

export const getUsersState=(state:RootStateType)=>{
  return  state.userspage.users
}
export const getpageSizeState=(state:RootStateType)=>{
    return state.userspage.pageSize
}
export const getTotalUsersCountState=(state:RootStateType)=>{
    return  state.userspage.totalUsersCount
}
export const getcurrentPageState=(state:RootStateType)=>{
    return  state.userspage.currentPage
}
export const getisFetchingState=(state:RootStateType)=>{
    return  state.userspage.isFetching
}
export const getfollowngInProgressState=(state:RootStateType)=>{
    return state.userspage.followngInProgress
}




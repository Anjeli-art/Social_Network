import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import {ActionValuesType, RootStateType} from '../../redux/redux-store';
import {foolowAC, initialUserPageType, setCurrentPageAC, setTotalUsersCountAC, setUserAC, unfoolowAC, UserType} from '../../redux/users-reducer';
import { Users } from './Users';

type propsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setTotalUsersCount: (totalCount: number) => void
    setUsers: (users: Array<UserType>) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
}


export class UsersAPIComponent extends React.Component<propsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return (
            <Users users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   pageSize={this.props.pageSize}
                   totalUsersCount={this.props.totalUsersCount}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}/>)

    }
}


type  mapDispatch = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage:(currentPage:number)=>void
    setTotalUsersCount:(totalCount:number)=>void
}

const mapStateToProps = (state: RootStateType): initialUserPageType => {
    return {
        users: state.userspage.users,
        pageSize: state.userspage.pageSize,
        totalUsersCount: state.userspage.totalUsersCount,
        currentPage:state.userspage.currentPage
    }
}
const mapDispatchToProps = (dispatch: (action: ActionValuesType) => void): mapDispatch => {
    return {
        follow: (userId: number) => {
            dispatch(foolowAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfoolowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUserAC(users))
        },
        setTotalUsersCount:(totalCount:number)=>{
           dispatch(setTotalUsersCountAC(totalCount))
        },
        setCurrentPage:(currentPage:number)=>{
            dispatch(setCurrentPageAC(currentPage))
        }
    }
}

export const Userscontainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)
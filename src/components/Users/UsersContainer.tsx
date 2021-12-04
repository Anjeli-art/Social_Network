import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {Preloader} from '../../common/preloader/Preloader';
import {RootStateType} from '../../redux/redux-store';
import {
    follow, getPageBold, getUsers,
    setCurrentPage,
    unfollow,

} from '../../redux/users-reducer';
import {Users} from './Users';
import {compose} from "redux";
import {
    getcurrentPageState, getfollowngInProgressState,
    getisFetchingState,
    getpageSizeState,
    getTotalUsersCountState, getUsersState
} from "../../redux/users-selector";
import {UserType} from "../../redux/types";


type  MapDispatch = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    getPageBold: (pageNumber: number, pageSize: number) => void
}


type MapStateToProps = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followngInProgress: Array<number>

}

type UsesrApiType = MapDispatch & MapStateToProps


class UsersAPIComponent extends React.Component<UsesrApiType> {

    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage,pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize}=this.props
        this.props.getPageBold(pageNumber,pageSize)
    }

    render() {
        return (
            <div>
                {this.props.isFetching ? <Preloader/> : null}
                <Users users={this.props.users}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       pageSize={this.props.pageSize}
                       totalUsersCount={this.props.totalUsersCount}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       followngInProgress={this.props.followngInProgress}/>
            </div>
        )
    }
}

const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        users: getUsersState(state),
        pageSize: getpageSizeState(state),
        totalUsersCount: getTotalUsersCountState(state),
        currentPage: getcurrentPageState(state),
        isFetching: getisFetchingState(state),
        followngInProgress: getfollowngInProgressState(state)
    }
}


export const UsersContainer = compose<ComponentType>(connect(mapStateToProps, {
    follow, unfollow,
    setCurrentPage,
    getUsers,
    getPageBold
}))(UsersAPIComponent)
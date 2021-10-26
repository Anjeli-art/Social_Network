import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {Preloader} from '../../common/preloader/Preloader';
import {RootStateType} from '../../redux/redux-store';
import {
    follow, getPageBold, getUsers,
    setCurrentPage,
    unfollow,
    UserType
} from '../../redux/users-reducer';
import {Users} from './Users';
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


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
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getPageBold(pageNumber, this.props.pageSize)//возможно запись не верна пофиксить санку
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
        users: state.userspage.users,
        pageSize: state.userspage.pageSize,
        totalUsersCount: state.userspage.totalUsersCount,
        currentPage: state.userspage.currentPage,
        isFetching: state.userspage.isFetching,
        followngInProgress: state.userspage.followngInProgress
    }
}


export const UsersContainer = compose<ComponentType>(WithAuthRedirect, connect(mapStateToProps, {
    follow, unfollow,
    setCurrentPage,
    getUsers,
    getPageBold
}))(UsersAPIComponent)
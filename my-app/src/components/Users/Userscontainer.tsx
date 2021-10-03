import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import {Preloader} from '../../common/preloader/Preloader';
import {RootStateType} from '../../redux/redux-store';
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleisFething,
    unfollow,
    UserType
} from '../../redux/users-reducer';
import {Users} from './Users';


type  MapDispatch = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleisFething: (isFetching: boolean) => void
}


type MapStateToProps = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean

}

type UsesrApiType = MapDispatch & MapStateToProps


class UsersAPIComponent extends React.Component<UsesrApiType> {

    componentDidMount() {
        this.props.toggleisFething(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleisFething(false)
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleisFething(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleisFething(false)
            this.props.setUsers(response.data.items)
        })
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
                       onPageChanged={this.onPageChanged}/>
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
        isFetching: state.userspage.isFetching
    }
}


// const mapDispatchToProps = (dispatch: (action: ActionValuesType) => void): MapDispatch => {
//     return {
//         follow: (userId: number) => {
//             dispatch(follow(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollow(userId))
//         },
//         setUsers: (users: Array<UserType>) => {
//             dispatch(setUsers(users))
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(setTotalUsersCount(totalCount))
//         },
//         setCurrentPage: (currentPage: number) => {
//             dispatch(setCurrentPage(currentPage))
//         },
//         toggleisFething: (isFetching: boolean) => {
//             dispatch(toggleisFething(isFetching))
//         }
//     }
// }


export const UsersContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setTotalUsersCount,
    setCurrentPage,
    toggleisFething
})(UsersAPIComponent)//второй объект мап диспатч название контейнера можно опустить
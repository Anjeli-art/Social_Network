import React from 'react';
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



type  MapDispatch = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    // setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    // setTotalUsersCount: (totalCount: number) => void
    // toggleisFething: (isFetching: boolean) => void
    // toggleisFollowig: (togglefollow: boolean, id: number) => void
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
        // this.props.toggleisFething(true)
        // usersApi.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //     this.props.toggleisFething(false)
        //     this.props.setUsers(data.items)
        //     this.props.setTotalUsersCount(data.totalCount)
        // })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getPageBold(pageNumber, this.props.pageSize)//возможно запись не верна пофиксить санку
        // this.props.setCurrentPage(pageNumber)
        // this.props.toggleisFething(true)
        // usersApi.getUsers(pageNumber, this.props.pageSize).then(data => {
        //     this.props.toggleisFething(false)
        //     this.props.setUsers(data.items)
        // })
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
                    // toggleisFollowig={this.props.toggleisFollowig}
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

// let AuthRedirectComponent = WithAuthRedirect(UsersAPIComponent)

export const UsersContainer = WithAuthRedirect(connect(mapStateToProps, {
    follow, unfollow,
    // setUsers,
    // setTotalUsersCount,//сократили количество экшенкрейт,все диспатчатся внутри санок
    setCurrentPage,
    // toggleisFething,
    // toggleisFollowig,//connect внутри себя оборачивает в колл-бэк до 117 стр на этой странице
    getUsers,
    getPageBold
})(UsersAPIComponent))//второй объект мап диспатч название контейнера можно опустить
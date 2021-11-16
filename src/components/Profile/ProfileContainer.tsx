import React, {ComponentType} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {
    getProfileUser,
    getUserStatus,
    ProfileType,
    setUsersProfile,
    updateUserStatus,
    savePhoto
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";



type MapStateToProps = {
    profile: ProfileType
    status: string
    isAuth: boolean
    loginUserId: null | number
}
type  MapDispatch = {
    setUsersProfile: (profile: ProfileType) => void
    getProfileUser: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
    savePhoto:any////////////////////////////////////////////////////////////////////////////////////////////////
}

type ProfileAPIType = MapDispatch & MapStateToProps

type PathParams = {
    userId: string

}
type PropsType = RouteComponentProps<PathParams> & ProfileAPIType

export class ProfileAPIComponent extends React.Component <PropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = String(this.props.loginUserId)

            if (userId === "null") {
                this.props.history.push("/login")
            }
        }
        this.props.getProfileUser(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {

        this.refreshProfile()

    }

    componentDidUpdate(prevProps: any) {
        console.log(this.props.match.params.userId)
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }

    }


    render() {
        // if (!this.props.isAuth) return <Redirect to={"/login"}/>
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateUserStatus}
                     isOwner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}
            />

        )
    }
}

const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        profile: state.profilepage.profile,
        status: state.profilepage.status,
        isAuth: state.auth.isAuth,
        loginUserId: state.auth.userId
    }
}

// let AuthRedirectComponent=(props:PropsType)=>{//3 обертка редирект
//     if (!props.isAuth) return <Redirect to={"/login"}/>
//     return <ProfileAPIComponent {...props}/>
// }


// let AuthRedirectComponent = WithAuthRedirect(ProfileAPIComponent)//3 обертка редирект самописный хок
//
// let withRouterContainerComponent = withRouter(AuthRedirectComponent as ComponentType<RouteComponentProps>)//2 обертка виз роутер
// //с денисом нашли типизацию в случае если внутри хока класс на функциональной работало и так
// export const ProfileContainer = connect(mapStateToProps, {//1 обертка коннект редакс
//     setUsersProfile,
//     getProfileUser
// })(withRouterContainerComponent)

const ProfileContainer = compose<ComponentType>(connect(mapStateToProps,
    {
        setUsersProfile,
        getProfileUser,
        getUserStatus,
        updateUserStatus,
        savePhoto
    }), withRouter)(ProfileAPIComponent)

export default ProfileContainer
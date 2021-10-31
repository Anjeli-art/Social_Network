import React, {ComponentType} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {
    getProfileUser,
    getUserStatus,
    ProfileType,
    setUsersProfile,
    updateUserStatus
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type MapStateToProps = {
    profile: ProfileType
    status: string
    isAuth:boolean
    loginUserId:null | number
}
type  MapDispatch = {
    setUsersProfile: (profile: ProfileType) => void
    getProfileUser: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
}

type ProfileAPIType = MapDispatch & MapStateToProps

type PathParams = {
    userId: string

}
type PropsType = RouteComponentProps<PathParams> & ProfileAPIType

export class ProfileAPIComponent extends React.Component <PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            // userId=this.props.loginUserId прояснить ,,,,,,.................
            userId=String(this.props.loginUserId)
            // userId = "19622"
        }
        this.props.getProfileUser(userId)
        this.props.getUserStatus(userId)
        // if (!userId) {
        //     userId = "2"
        // }
        //
        // profileApi.getProfile(userId).then(data => {
        //     this.props.setUsersProfile(data)
        // })

    }


    render() {
        // if (!this.props.isAuth) return <Redirect to={"/login"}/>
        console.log({...this.props})
        return (
            <Profile {...this.props}
                     profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateUserStatus}
            />

        )
    }
}

const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        profile: state.profilepage.profile,
        status: state.profilepage.status,
        isAuth: state.auth.isAuth,
        loginUserId:state.auth.id
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

export const ProfileContainer = compose<ComponentType>(connect(mapStateToProps,
    {
        setUsersProfile,
        getProfileUser,
        getUserStatus,
        updateUserStatus
    }), withRouter, WithAuthRedirect)(ProfileAPIComponent)
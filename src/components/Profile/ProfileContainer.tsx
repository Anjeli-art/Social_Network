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
    savePhoto,
    saveProfile
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";


type MapStateToProps = {
    profile: ProfileType
    status: string
    isAuth: boolean
    loginUserId: null | number
    errorMessage: string
    flagEditMode: boolean
}
type  MapDispatch = {
    setUsersProfile: (profile: ProfileType) => void
    getProfileUser: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
    savePhoto: (photo: File) => void
    saveProfile: (profile: ProfileType) => void
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
        console.log(this.props.flagEditMode, 'EDIT_FLAG')
        this.refreshProfile()

    }

    componentDidUpdate(prevProps: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }


    render() {
        console.log(this.props.errorMessage)
        return (

            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateUserStatus}
                     isOwner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
                     errorMessage={this.props.errorMessage}
                     flagEditMode={this.props.flagEditMode}
            />

        )
    }
}

const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        profile: state.profilepage.profile,
        status: state.profilepage.status,
        isAuth: state.auth.isAuth,
        loginUserId: state.auth.userId,
        errorMessage: state.profilepage.errorMessage,
        flagEditMode: state.profilepage.flagEditMode
    }
}

const ProfileContainer = compose<ComponentType>(connect(mapStateToProps,
    {
        setUsersProfile,
        getProfileUser,
        getUserStatus,
        updateUserStatus,
        savePhoto,
        saveProfile
    }), withRouter)(ProfileAPIComponent)

export default ProfileContainer
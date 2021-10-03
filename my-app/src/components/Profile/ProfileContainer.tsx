import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {ProfileType, setUsersProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

type MapStateToProps = {
    profile: ProfileType
}
type  MapDispatch = {
    setUsersProfile: (profile: ProfileType) => void
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
            userId = "2"
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
            this.props.setUsersProfile(response.data)
        })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        profile: state.profilepage.profile
    }
}

let withRouterContainerComponent = withRouter(ProfileAPIComponent)

export const ProfileContainer = connect(mapStateToProps, {setUsersProfile})(withRouterContainerComponent)
import React, {ComponentType} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {getProfileUser, ProfileType, setUsersProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";


type MapStateToProps = {
    profile: ProfileType
}
type  MapDispatch = {
    setUsersProfile: (profile: ProfileType) => void
    getProfileUser: (userId: string) => void
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
        this.props.getProfileUser(userId)
        // if (!userId) {
        //     userId = "2"
        // }
        //
        // profileApi.getProfile(userId).then(data => {
        //     this.props.setUsersProfile(data)
        // })


        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
        //     this.props.setUsersProfile(response.data)
        // }) //создали отдельную сущность и вызов метода запаковали в объект
    }

    render() {
        // if (!this.props.isAuth) return <Redirect to={"/login"}/>
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        profile: state.profilepage.profile,
    }
}

// let AuthRedirectComponent=(props:PropsType)=>{//3 обертка редирект
//     if (!props.isAuth) return <Redirect to={"/login"}/>
//     return <ProfileAPIComponent {...props}/>
// }
let AuthRedirectComponent = WithAuthRedirect(ProfileAPIComponent)//3 обертка редирект самописный хок

let withRouterContainerComponent = withRouter(AuthRedirectComponent as ComponentType<RouteComponentProps>)//2 обертка виз роутер
//с денисом нашли типизацию в случае если внутри хока класс на функциональной работало и так
export const ProfileContainer = connect(mapStateToProps, {//1 обертка коннект редакс
    setUsersProfile,
    getProfileUser
})(withRouterContainerComponent)
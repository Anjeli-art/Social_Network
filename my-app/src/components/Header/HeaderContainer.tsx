import React from "react";
import {connect} from "react-redux";
import {Preloader} from "../../common/preloader/Preloader";
import {Header} from "./Header";
import {RootStateType} from "../../redux/redux-store";
import axios from "axios";
import {setAuth} from "../../redux/auth-reducer";

type MapStateToProps = {
    isAuth: boolean
    login: null | string
}
type  MapDispatch = {
    setAuth: (userId: number, email: string, login: string) => void
}
type HeaderContainerApiType = MapDispatch & MapStateToProps

export class HeaderContainerAPI extends React.Component<HeaderContainerApiType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                this.props.setAuth(id, email, login)
            }
        })
    }

    render() {
        return (
            <div>
                <Header {...this.props}/>
            </div>
        )
    };
};

const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export const HeaderContainer = connect(mapStateToProps, {setAuth})(HeaderContainerAPI)
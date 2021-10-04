import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {RootStateType} from "../../redux/redux-store";
import {setAuth} from "../../redux/auth-reducer";
import {authApi} from "../../api/api";

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
        authApi.getAuth().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
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
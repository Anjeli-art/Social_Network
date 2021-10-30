import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {RootStateType} from "../../redux/redux-store";
import {getAuthHeader, getLogout} from "../../redux/auth-reducer";


type MapStateToProps = {
    isAuth: boolean
    login: null | string
}
type  MapDispatch = {
    getAuthHeader:() =>void
    getLogout:()=>void
}
type HeaderContainerApiType = MapDispatch & MapStateToProps

export class HeaderContainerAPI extends React.Component<HeaderContainerApiType> {

    componentDidMount() {
        this.props.getAuthHeader()
    }

    render() {
        return (
            <div>
                <Header {...this.props} getLogout={this.props.getLogout}/>
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
export const HeaderContainer = connect(mapStateToProps, {getAuthHeader,getLogout

})(HeaderContainerAPI)
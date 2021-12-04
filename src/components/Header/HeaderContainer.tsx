import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {RootStateType} from "../../redux/redux-store";
import {getLogout} from "../../redux/auth-reducer";


type MapStateToProps = {
    isAuth: boolean
    login: null | string
}
type  MapDispatch = {
    getLogout:()=>void
}
type HeaderContainerApiType = MapDispatch & MapStateToProps

export class HeaderContainerAPI extends React.Component<HeaderContainerApiType> {



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
export const HeaderContainer = connect(mapStateToProps, {getLogout

})(HeaderContainerAPI)
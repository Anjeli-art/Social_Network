import React, {ComponentType} from 'react';
import {Redirect} from "react-router-dom";
import {RootStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsRedirect = {
    isAuth: boolean
}
const mapStateToPropsRedirect = (state: RootStateType): MapStateToPropsRedirect => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function WithAuthRedirect<T>(Component:ComponentType<T> ) {

    class RedirectComponent extends React.Component<MapStateToPropsRedirect> {


        render() {
            let {isAuth, ...restProps} = this.props

            if (!isAuth) return <Redirect to={"/login"}/>

            return <Component {...restProps as T}/>
        }

    }

    let AuthRedirectComponentForConnect = connect(mapStateToPropsRedirect)(RedirectComponent)
    return AuthRedirectComponentForConnect
};



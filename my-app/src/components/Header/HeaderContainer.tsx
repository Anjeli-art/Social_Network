import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {RootStateType} from "../../redux/redux-store";
import {getAuthHeader} from "../../redux/auth-reducer";


type MapStateToProps = {
    isAuth: boolean
    login: null | string
}
type  MapDispatch = {
    // setAuth: (userId: number, email: string, login: string) => void
    getAuthHeader:() =>void
}
type HeaderContainerApiType = MapDispatch & MapStateToProps

export class HeaderContainerAPI extends React.Component<HeaderContainerApiType> {

    componentDidMount() {
        this.props.getAuthHeader()
        // authApi.getAuth().then(data => {
        //     if (data.resultCode === 0) {
        //         let {id, email, login} = data.data
        //         this.props.setAuth(id, email, login)
        //     }
        // })
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
export const HeaderContainer = connect(mapStateToProps, {getAuthHeader
    // setAuth
})(HeaderContainerAPI)
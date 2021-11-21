import {ErrorMessage, Field, Formik} from "formik";
import React from "react";
import {RootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getLogin} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from "./login.module.css"
import {createField} from "../../utils/form-helper";


type ErrorsType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

type MapStateToProps = {
    isAuth: boolean
    errorMessage: null | string
    captcha: string | null
}
type  MapDispatch = {
    getLogin: (email: string, password: string, remmemberMe: boolean,captcha: string | null) => void
}

type loginFormProps = MapStateToProps & MapDispatch


export const LoginForm = ({isAuth,errorMessage,getLogin,captcha}:loginFormProps) => {

    if (isAuth) return <Redirect to={"/profile"}/>

    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: true,captcha:""}}
            validate={values => {
                const errors: ErrorsType = {};
                if (!values.email) {

                    errors.email = 'email required';
                }
                if (!values.password) {

                    errors.password = 'password required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {

                    errors.email = 'Invalid email address';
                }

                return errors;
            }}
            onSubmit={(values) => {
                getLogin(values.email, values.password, values.rememberMe, values.captcha)
            }}>
            {({
                  handleChange,
                  handleSubmit,
                  errors,
                  touched,
              }) => (

                <form onSubmit={handleSubmit}>
                    {createField("text","email","login",errors.email,touched.email,"email","div")}
                    {createField("password","password","password",errors.password,touched.password,"password","div")}
                    <div>{captcha && <img src={captcha}/>}</div>
                    <div>{captcha && createField("text","captcha","captcha",'',false,"captcha","div")}</div>
                    <div>
                        <Field type="checkbox" name="rememberMe" onCnage={handleChange}/>remember me
                    </div>
                    <div className={s.errortext}>{errorMessage}</div>
                    <div>
                        <button type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    );
};


const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        isAuth: state.auth.isAuth,
        errorMessage: state.auth.errorMessage,
        captcha:state.auth.captcha
    }
}


export const LoginFormContainer = connect(mapStateToProps, {
    getLogin
})(LoginForm)
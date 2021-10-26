import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";
import {RootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getLogin} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";


type ErrorsType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

type MapStateToProps = {
    isAuth: boolean

}
type  MapDispatch = {

    getLogin: (email: string, password: string, remmemberMe: boolean) => void
}

type loginFormProps = MapStateToProps & MapDispatch


export const LoginForm = (props: loginFormProps) => {

    if (props.isAuth) return <Redirect to={"/profile"}/>

    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: true}}
            validate={values => {
                const errors: ErrorsType = {};
                if (!values.email) {

                    errors.email = 'email required';
                }
                if (!values.password) {

                    errors.password = 'password required';
                }
                else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {

                    errors.email = 'Invalid email address';
                }

                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                props.getLogin(values.email, values.password, values.rememberMe)
                setSubmitting(true);

            }}
        >
            {({
                  isSubmitting,
                  handleChange,
                  values,
                  handleSubmit,
                  errors,
                  touched,
                  handleBlur
              }) => (
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Field type="text" name="email" value={values.email} placeholder={"login"}
                               onCnage={handleChange}/>
                        <ErrorMessage name="email" component="div"/>
                    </div>
                    <div>
                        <Field type="password" name="password" value={values.password} placeholder={"password"}
                               onCnage={handleChange}/>
                        <ErrorMessage name="password" component="div"/>
                    </div>
                    <div>
                        <Field type="checkbox" name="rememberMe" onCnage={handleChange}/>remember me
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};


const mapStateToProps = (state: RootStateType): MapStateToProps => {
    return {
        isAuth: state.auth.isAuth
    }
}


export const LoginFormContainer = connect(mapStateToProps, {
    getLogin
})(LoginForm)
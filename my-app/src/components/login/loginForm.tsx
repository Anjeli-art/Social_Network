import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";

export const LoginForm = () => {
    return (
        // <form action="">
        //     <div>
        //         <input type="text" placeholder={"login"}/></div>
        //     <div>
        //         <input type="password" placeholder={"password"}/></div>
        //     <div>
        //         <input type="checkbox"/>remember me
        //     </div>
        //     <div>
        //         <button>submit</button>
        //     </div>
        // </form>
        <Formik
            initialValues={{email: '', password: ''}}
            validate={values => {
                const errors = {email: '', password: ''};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <div>
                        <Field type="text" name="login" placeholder={"login"}/>
                        <ErrorMessage name="login" component="div"/>
                    </div>
                    <div>
                        <Field type="password" name="password" placeholder={"password"}/>
                        <ErrorMessage name="password" component="div"/>
                    </div>
                    <div>
                        <Field type="checkbox" name="rememberMe"/>remember me
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
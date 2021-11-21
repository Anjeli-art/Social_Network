import React from "react";
import {ErrorMessage, Field} from "formik";
import s from "../components/login/login.module.css";

export const createField =
    (text: string, name: string, placeholder: string, errors:string | undefined, touched:boolean | undefined,nameError:string,component:string) =>
        <div>
            <Field  type={text} name={name}  placeholder={placeholder}

                   className={errors && touched && s.errorinput}
            />
            <ErrorMessage name={nameError} component={component} className={s.errortext}/>
        </div>
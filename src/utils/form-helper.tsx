import React, {ChangeEvent} from "react";
import {ErrorMessage, Field} from "formik";
import s from "../components/login/login.module.css";

export const createField =
    (text: string, name: string, value: string, placeholder: string,
     handleChange: (e: ChangeEvent ) => void, errors:string | undefined, touched:boolean | undefined,nameError:string,component:string) =>
        <div>
            <Field type={text} name={name} value={value} placeholder={placeholder}
                   onCnage={handleChange}
                   className={errors && touched && s.errorinput}
            />
            <ErrorMessage name={nameError} component={component} className={s.errortext}/>
        </div>
import React from "react";
import s from "./Dialogs.module.css"
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {useFormik} from "formik";
import {DialogType, MessageType} from "../../redux/types";


type DialogTypeProps = {
    addMessage: (NewMessage: string) => void
    messages: MessageType[]
    dialogs: DialogType[]
    isAuth: boolean

}

export const Dialogs: React.FC<DialogTypeProps> = (props) => {

    let dialogsElement = props.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElement = props.messages.map(m => <Message key={m.id} message={m.message}/>)


    let onButtonClick = (NewMessage: string) => {
        props.addMessage(NewMessage)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messagesElement}
                <DilogForm onButtonClick={onButtonClick}/>
            </div>
        </div>
    )
}
type DilogFormProps = {
    onButtonClick: (NewMessage: string) => void
}
type MyPostFormErrors = {
    NewMessage?: string
}
const DilogForm = (props: DilogFormProps) => {

    const formik = useFormik({
        initialValues: {
            NewMessage: '',
        },
        validate: (values) => {
            const errors: MyPostFormErrors = {};
            if (values.NewMessage.length > 20) {
                errors.NewMessage = "max length 20"
            }
            return errors
        },
        onSubmit: values => {
            props.onButtonClick(values.NewMessage)
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                className={formik.errors.NewMessage ? s.inputError : s.input}
                id="NewMessage"
                name="NewMessage"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.NewMessage}
            />
            <button className={s.button} type="submit" disabled={!!formik.errors.NewMessage}>Отправить</button>
            {formik.errors && <span className={s.spanError}>{formik.errors.NewMessage}</span>}
        </form>

    )
}

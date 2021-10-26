import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {DialogType, MessageType} from "../../redux/dialogs-reducer";
import {useFormik} from "formik";


type DialogTypeProps = {
    addMessage: () => void
    messages: MessageType[]
    dialogs: DialogType[]
    upDateaddMessage: (New: string) => void
    NewMessage: string
    isAuth: boolean

}

//<DialogType & MymessageType>аналог верней записи сработает если мы склеиваем два одинаковых обЪекта

export const Dialogs: React.FC<DialogTypeProps> = (props) => {

    let dialogsElement = props.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElement = props.messages.map(m => <Message key={m.id} message={m.message}/>)

    let onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value
        props.upDateaddMessage(text)
    }
    let onButtonClick = () => {
        props.addMessage()
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messagesElement}
                <DilogForm/>
            </div>
            {/*<form>*/}
            {/*    <div>*/}
            {/*    <textarea  onChange={onChangeMessage}*/}
            {/*              value={props.NewMessage}/>*/}
            {/*        <button  onClick={onButtonClick}>+</button>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    )
}

const DilogForm = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email"></label>
            <input
                className={s.input}
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <button className={s.button} type="submit">Отправить</button>
        </form>

    )
}

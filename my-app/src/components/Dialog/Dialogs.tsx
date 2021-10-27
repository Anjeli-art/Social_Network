import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {DialogType, MessageType} from "../../redux/dialogs-reducer";
import {useFormik} from "formik";


type DialogTypeProps = {
    addMessage: (NewMessage: string) => void
    messages: MessageType[]
    dialogs: DialogType[]
    // upDateaddMessage: (New: string) => void
    // NewMessage: string
    isAuth: boolean

}

//<DialogType & MymessageType>аналог верней записи сработает если мы склеиваем два одинаковых обЪекта

export const Dialogs: React.FC<DialogTypeProps> = (props) => {

    let dialogsElement = props.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElement = props.messages.map(m => <Message key={m.id} message={m.message}/>)

    // let onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     const text = e.currentTarget.value
    //     props.upDateaddMessage(text)
    // }
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
type DilogFormProps = {
    onButtonClick: (NewMessage: string) => void
}

const DilogForm = (props: DilogFormProps) => {

    const formik = useFormik({
        initialValues: {
            NewMessage: '',
        },
        onSubmit: values => {
            props.onButtonClick(values.NewMessage)
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                className={s.input}
                id="NewMessage"
                name="NewMessage"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.NewMessage}
            />
            <button className={s.button} type="submit">Отправить</button>
        </form>

    )
}

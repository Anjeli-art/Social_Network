import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {DialogType, MessageType } from "../../redux/dialogs-reducer";




type DialogTypeProps = {
    addMessage: () => void
    messages: MessageType[]
    dialogs: DialogType[]
    upDateaddMessage: (New: string) => void
    NewMessage: string
    // dispatch: (action: ActionValuesType) => void

}


//type PropsType={ dialogs:Array<DialogItemTypeProps>,messages:Array<messageType> }

//<DialogType & MymessageType>аналог верней записи сработает если мы склеиваем два одинаковых обЪекта

export const Dialogs: React.FC<DialogTypeProps> = (props) => {

    let dialogsElement = props.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElement = props.messages.map(m => <Message key={m.id} message={m.message}/>)

    let onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        console.log("tttttttttt")
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
                <div>
                    <textarea className={s.input} onChange={onChangeMessage}
                              value={props.NewMessage}/>
                    <button className={s.button} onClick={onButtonClick}>+</button>
                </div>
            </div>
        </div>
    )
}
import React, {ChangeEvent} from "react";
import {addMessageActionCreator, upDateNewMessageActionCreator} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {Store} from "redux";
import {ActionValuesType, RootStateType} from "../../redux/redux-store";
import { StoreContext } from "../../StoreContext";


type DialogTypeProps = {
    // addMessage: () => void
    // messages: MessageType[]
    // dialogs: DialogType[]
    // upDateaddMessage: (New: string) => void
    // newMessage: string
    // dispatch: (action: ActionValuesType) => void
    // store: Store<RootStateType, ActionValuesType>
}


//type PropsType={ dialogs:Array<DialogItemTypeProps>,messages:Array<messageType> }

//<DialogType & MymessageType>аналог верней записи сработает если мы склеиваем два одинаковых обЪекта

export const DialogsContainer: React.FC<DialogTypeProps> = (props) => {


    // let state = props.store.getState()
    //
    // let onChangeMessage = (text: string) => {
    //     let action = upDateNewMessageActionCreator(text)
    //     props.store.dispatch(action)
    // }
    // let onButtonClick = () => {
    //     let action = addMessageActionCreator()
    //     props.store.dispatch(action)
    // }
    return (
        <StoreContext.Consumer>
            {(store)=>{
                let state = store.getState()

                let onChangeMessage = (text: string) => {
                    let action = upDateNewMessageActionCreator(text)
                    store.dispatch(action)
                }
                let onButtonClick = () => {
                    let action = addMessageActionCreator()
                    store.dispatch(action)
                }
          return <Dialogs upDateaddMessage={onChangeMessage} addMessage={onButtonClick} messages={state.dialogepage.messages}
                     dialogs={state.dialogepage.dialogs} newMessage={state.dialogepage.NewMessage}/>}}
        </StoreContext.Consumer>
    )
}
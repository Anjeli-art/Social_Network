import React, {Component, ComponentType} from "react";
import {
    addMessageActionCreator, DialogType,
    MessageType,
} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {RootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";


// type DialogTypeProps = {
//     // addMessage: () => void
//     // messages: MessageType[]
//     // dialogs: DialogType[]
//     // upDateaddMessage: (New: string) => void
//     // newMessage: string
//     // dispatch: (action: ActionValuesType) => void
//     // store: Store<RootStateType, ActionValuesType>
// }


//type PropsType={ dialogs:Array<DialogItemTypeProps>,messages:Array<messageType> }

//<DialogType & MymessageType>аналог верней записи сработает если мы склеиваем два одинаковых обЪекта

// export const DialogsContainer: React.FC<DialogTypeProps> = (props) => {


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
//     return (
//         <StoreContext.Consumer>
//             {(store)=>{
//                 let state = store.getState()
//
//                 let onChangeMessage = (text: string) => {
//                     let action = upDateNewMessageActionCreator(text)
//                     store.dispatch(action)
//                 }
//                 let onButtonClick = () => {
//                     let action = addMessageActionCreator()
//                     store.dispatch(action)
//                 }
//           return <Dialogs upDateaddMessage={onChangeMessage} addMessage={onButtonClick} messages={state.dialogepage.messages}
//                      dialogs={state.dialogepage.dialogs} newMessage={state.dialogepage.NewMessage}/>}}
//         </StoreContext.Consumer>
//     )
// }

type mapDicpatch = {
    // upDateaddMessage: (text: string) => void
    addMessage: (NewMessage:string) => void
}

type mapStateToPropsType = {
    dialogs: DialogType[],
    messages: MessageType[],
    // NewMessage: string,
}

type PropsTypeDialog = mapDicpatch & mapStateToPropsType

let mapStateToProps = (state: RootStateType): mapStateToPropsType => {
    return {
        dialogs: state.dialogepage.dialogs,
        messages: state.dialogepage.messages
        // NewMessage: state.dialogepage.NewMessage,
    }
}

//(action: ActionValuesType) => void типизация для экшена внутри диспатча и та и та запись валидна смотреть другие компонеты

let mapDicpatchtoProps = (dispatch: Dispatch): mapDicpatch => {
    return {
        // upDateaddMessage: (text: string) => {
        //     dispatch(upDateNewMessageActionCreator(text))
        // },
        addMessage: (NewMessage:string) => {
            dispatch(addMessageActionCreator(NewMessage))
        },
    }
}
// let AuthRedirectComponent=(props:PropsTypeDialog)=>{//2 обертка редирект
//     if (!props.isAuth) return <Redirect to={"/login"}/>
//     return <Dialogs {...props}/>
// }


// let AuthRedirectComponent = WithAuthRedirect(Dialogs)//2 обертка редирект самописный хок //заменим компосе
//
// export const DialogsContainer = connect(mapStateToProps, mapDicpatchtoProps)(AuthRedirectComponent) // 1 обертка конект редакс


export const DialogsContainer = compose<ComponentType>(connect(mapStateToProps, mapDicpatchtoProps), WithAuthRedirect)(Dialogs)


import React, { ComponentType} from "react";
import {
    addMessageActionCreator, DialogType,
    MessageType,
} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {RootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";



type MapDicpatch = {
    addMessage: (NewMessage:string) => void
}

type MapStateToPropsType = {
    dialogs: DialogType[],
    messages: MessageType[],
}

type PropsTypeDialog = MapDicpatch & MapStateToPropsType

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogepage.dialogs,
        messages: state.dialogepage.messages
    }
}


let mapDicpatchtoProps = (dispatch: Dispatch): MapDicpatch => {
    return {
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


const DialogsContainer = compose<ComponentType>(connect(mapStateToProps, mapDicpatchtoProps), WithAuthRedirect)(Dialogs)

export default DialogsContainer


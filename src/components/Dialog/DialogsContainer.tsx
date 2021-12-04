import React, { ComponentType} from "react";
import {
    addMessageActionCreator
} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {RootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {DialogType, MessageType} from "../../redux/types";



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


const DialogsContainer = compose<ComponentType>(connect(mapStateToProps, mapDicpatchtoProps), WithAuthRedirect)(Dialogs)

export default DialogsContainer


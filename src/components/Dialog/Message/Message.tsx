import s from "../Dialogs.module.css";
import React from "react";
import {MessageTypeMap} from "../../../redux/Store";








export const Message:React.FC<MessageTypeMap>=(props)=>{
    return(
        <div className={s.message}>{props.message}</div>

    )
}
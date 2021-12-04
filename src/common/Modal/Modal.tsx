import React from 'react';
import s from "./Modal.module.css"
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {setModalErrorStatus} from "../../redux/profile-reducer";


export const Modal: React.FC = () => {

    const errorStatus = useSelector<RootStateType, boolean>(state => state.profilepage.errorStatus)
    const errorStatusText = useSelector<RootStateType, string>(state => state.profilepage.errorStatusText)

    const dicpatch=useDispatch()

    return (
        <div>
            {errorStatus && <div className={s.wrapper}>
                <div className={s.body}>
                    <div className={s.body_close} onClick={() =>dicpatch(setModalErrorStatus (false,""))}>x</div>
                    <div><h2>{errorStatusText}</h2></div>
                </div>
            </div>}
        </div>
    )

};

export default Modal;
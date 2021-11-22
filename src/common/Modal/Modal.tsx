import React, {useState} from 'react';
import s from "./Modal.module.css"

type ModalProps = {
    isOpen: boolean
    error: string
}

export const Modal: React.FC<ModalProps> = ({isOpen, error}) => {
console.log(isOpen)
    let [closeModal, setCloseModal] = useState(isOpen)

    return (
        <div>
            {closeModal && <div className={s.wrapper}>
                <div className={s.body}>
                    <div className={s.body_close} onClick={() => setCloseModal(false)}>x</div>
                    <div><h2>{error}</h2></div>
                </div>
            </div>}
        </div>
    )

};
// <div className={`s.wrapper${props.isOpen ? "open" : "close"}`}>
export default Modal;
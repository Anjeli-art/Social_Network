import React, {useEffect, useState} from 'react';
import s from "./Modal.module.css"

type ModalProps = {
    isOpen: boolean
    error: string
}

export const Modal: React.FC<ModalProps> = ({isOpen, error}) => {

    let [closeModal, setCloseModal] = useState(isOpen)
    console.log(isOpen)
    console.log(closeModal)

    useEffect(() => {
        setCloseModal(isOpen)
    }, [isOpen])

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

export default Modal;
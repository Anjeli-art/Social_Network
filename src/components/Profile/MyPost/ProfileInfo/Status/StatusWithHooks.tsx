import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';


type StatusType = {
    status: string
    updateStatus: (status: string) => void
}

export const StatusWithHooks: React.FC<StatusType> = (props) => {

        let [editMode, setEditMode] = useState(false)
        let [status, setStatus] = useState(props.status)

         useEffect(()=>{
             setStatus(props.status)

         },[props.status])

        const activateEditMode = () => {
            setEditMode(true)
        }
        const deactivateEditMode = () => {
            setEditMode(false)
            props.updateStatus(status)
        }
        const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
            setStatus(e.currentTarget.value)
        }
        return (
            <div>
                {!editMode &&
                <div>
                    <b>Status:</b><span onDoubleClick={activateEditMode}>{props.status || "No status"}</span>
                </div>}
                {editMode &&
                <div>
                    <input type="text" onChange={onStatusChanged} autoFocus={true} onBlur={deactivateEditMode}
                           value={status}/>
                </div>}
            </div>
        );
    }
;

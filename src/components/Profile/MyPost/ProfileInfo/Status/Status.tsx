import React, {ChangeEvent} from 'react';


export type StatusType = {
    status: string
    updateStatus: (status: string) => void
}

type StateType={
    editMode: boolean
    status:string
}

export class Status extends React.Component<StatusType,StateType> {


    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate(prevProps: Readonly<StatusType>, prevState: Readonly<StateType>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "No status"}</span>
                </div>}
                {this.state.editMode &&
                <div>
                    <input type="text" onChange={this.onStatusChanged} autoFocus={true} onBlur={this.deactivateEditMode}
                           value={this.state.status}/>
                </div>}
            </div>
        );
    }
}
;

import React, {ChangeEvent} from "react";
import './status.css'


type StatusType = {
    myId: number
    userId: number
    getStatusThunk: (userID: number) => void
    updateStatusThunk: (status: string) => void
    status: string | null
    imgEdit: string
}


class Status extends React.Component<StatusType, { editMode: boolean, value: string }> {
    constructor(props: StatusType) {
        super(props);
        this.state = {
            editMode: false,
            value: this.props.status || ''
        }
    }

    componentDidMount() {
        this.props.getStatusThunk(this.props.userId)
    }


    componentDidUpdate(prevProps: Readonly<StatusType>, prevState: Readonly<{ editMode: boolean; value: string }>, snapshot?: any) {

        if (this.props.status !== prevProps.status && prevProps.userId === this.props.userId) {
            this.setState(s => {
                return {...s, value: this.props.status || ''}
            })
        } else if (prevProps.userId !== this.props.userId) {
            this.props.getStatusThunk(this.props.userId)
        }
    }


    changeEditMode = () => {
        if (this.props.myId === this.props.userId) {
            this.setState(state => {
                return {editMode: !state.editMode}
            })
            if (this.state.editMode) {
                this.props.updateStatusThunk(this.state.value)
            }
        }
    }


    handlerValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 60) {
            this.setState(s => {
                return {...s, value: e.target.value}
            })
        }
    }


    render() {
        return (
            <div className={'wrapper_status'}>{
                this.state.editMode ?
                    <input onChange={(event: ChangeEvent<HTMLInputElement>) => this.handlerValue(event)}
                           autoFocus value={this.state.value}
                           onBlur={this.changeEditMode}/> :
                    <div className={'text_status'}
                         style={this.props.myId === this.props.userId ? {cursor: 'pointer'} : {cursor: ''}}
                         onClick={this.changeEditMode}>{this.state.value}
                        {this.props.myId === this.props.userId && <img src={this.props.imgEdit} alt='edit'/>}
                    </div>
            }</div>
        )
    }
}


export default Status;




















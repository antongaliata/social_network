import React from "react";
import './errorMessage.css'
import {nameErrorType} from "../../redux/profile-reducer";


type ErrorMessageType = {
    nameErrorUpdate: nameErrorType
    handlerWindowError: (error: boolean) => void
    showWindowError: boolean
}


const ErrorMessage = (props: ErrorMessageType) => {


    const closeWindow = () => {
        props.handlerWindowError(false)
    }

    return <>{props.showWindowError && <div className={'wrapper_error'}>
        <div className={'window_error_contact'}>
            <div onClick={closeWindow} className={'closeWindow'}>&#10006;</div>
            contact "{props.nameErrorUpdate}" is incorrect
        </div>
    </div>
    }</>
}


export default ErrorMessage;
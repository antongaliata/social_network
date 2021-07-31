import imgNoPhoto from "../../images/gender.png";
import React from "react";
import './message.css'

type MessageType = {
    message: string
    photo: string
    userId: number | null
    userName: string | null
    time: string | null
    isMyMessage: boolean
}


export const Message = (props: MessageType) => {
    let partClass = props.isMyMessage? '' : '2'

    return <div className={'wrapperMessage' + partClass}>
        <div className={'message' + partClass}>
            {props.userName && <div className={'nameUserMessage'}>{props.userName}</div>}
            <span>{props.message}</span>
            <div className={'time'}>{props.time}</div>
        </div>
        <img alt={'avatar'} src={props.photo ? props.photo : imgNoPhoto}/>
    </div>
}
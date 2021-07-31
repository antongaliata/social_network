import Typing from "../Typing/Typing";
import React, {ChangeEvent} from "react";
import {MessageType} from "../../redux/dialogs-reducer";
import {TextareaAndSendMessage} from "../TextareaAndSendMessage/TextareaAndSendMessage";
import './dialogs_and_message.css'

type sendMessageType = {
    messageObj: MessageType
    textInput: Array<{ text: string, idUser: number }>
    handlerSendMessage: (idDialogs: number, myId: number) => void
    handlerTextInputDialogs: (text: string | undefined, idUser: number) => void
    myId: number
    botMessage: (idDialogs: number, userId: number) => void
    isTyping: boolean
}


const SendMessage = (props: sendMessageType) => {

    const sendMessage = () => {
        let str = props.textInput.find(textObj => textObj.idUser === props.messageObj.idDialogs)?.text
        if (str?.trim()) {
            props.handlerSendMessage(props.messageObj.idDialogs, props.myId)
            props.handlerTextInputDialogs('', props.messageObj.idDialogs)
            props.botMessage(props.messageObj.idDialogs, props.messageObj.idDialogs)
        }
    }
    const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {

        props.handlerTextInputDialogs(e.currentTarget.value, props.messageObj.idDialogs)
    }

    return (
        <div className={'container_send_message'}>
            {window.innerWidth > 600 && <div className={'wrapper_typing'}>
                {props.isTyping && props.textInput.find(textObj => textObj.idUser === props.messageObj.idDialogs) &&
                <Typing/>}
            </div>}

            <TextareaAndSendMessage
                textMessage={props.textInput?.find(textObj => textObj.idUser === props.messageObj?.idDialogs)?.text || ''}
                sendMessage={sendMessage}
                messageObj={props.messageObj}
                onChangeTextarea={onChangeTextarea}/>

        </div>
    )
}


export default SendMessage;
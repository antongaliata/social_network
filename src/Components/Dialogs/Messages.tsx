import './dialogs_and_message.css';
import React from "react";
import {MessageType} from "../../redux/dialogs-reducer";
import Typing from "../Typing/Typing";


export type MessagesType = {
    messageObj: MessageType
    textInput: string
    changeSendMessage: (idDialogs: number, myId: number) => void
    changeTextInputDialogs: (text: string | undefined) => void
    myId: number
    botMessage: (idDialogs: number, userId: number) => void
    isTyping: boolean
}


const Messages = (props: MessagesType) => {

    const newMessageText = React.createRef<HTMLTextAreaElement>()

    return <div className={'window_messages'}>

        <div className={'wrapper_messages'}>
            {props.messageObj.message.map((mes, i) => {
                if (mes.whoId === props.myId) {
                    return <div className={'messages'}
                                key={props.myId + i}>
                        <div>{mes.text}</div>
                    </div>

                } else if (mes.whoId !== props.myId) {
                    return <div className={'messagesBot'}
                                key={props.messageObj.idDialogs + i}>{mes.text}</div>
                }
            })}
        </div>
        <div className={'wrapper_textarea'}>
            {props.isTyping && <Typing/>}
            <textarea
                onChange={(e) => props.changeTextInputDialogs(e.currentTarget.value)}
                ref={newMessageText}
                value={props.textInput}/>
            <button onClick={() => {
                props.changeSendMessage(props.messageObj.idDialogs, props.myId)
                props.changeTextInputDialogs('')
                props.botMessage(props.messageObj.idDialogs, props.messageObj.idDialogs)
            }}>Отправить
            </button>
        </div>
    </div>
}

export default Messages;



















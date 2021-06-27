import Typing from "../Typing/Typing";
import sendMessageImg from "../../images/send.png";
import React from "react";
import {MessageType} from "../../redux/dialogs-reducer";

type sendMessageType = {
    messageObj: MessageType
    textInput: Array<{ text: string, idUser: number }>
    changeSendMessage: (idDialogs: number, myId: number) => void
    changeTextInputDialogs: (text: string | undefined, idUser: number) => void
    myId: number
    botMessage: (idDialogs: number, userId: number) => void
    isTyping: boolean
}


const SendMessage = (props: sendMessageType) => {
    const newMessageText = React.createRef<HTMLTextAreaElement>()

    const sendMessage = () => {
        if (props.textInput.find(textObj => textObj.idUser === props.messageObj.idDialogs)?.text.length) {
            props.changeSendMessage(props.messageObj.idDialogs, props.myId)
            props.changeTextInputDialogs('', props.messageObj.idDialogs)
            props.botMessage(props.messageObj.idDialogs, props.messageObj.idDialogs)
        }
    }


    const sendEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            sendMessage()
            event.preventDefault();
        }
    }

    return (
        <div className={'container_send_message'}>
            <div className={'wrapper_typing'}>
                {props.isTyping && props.textInput.find(textObj => textObj.idUser === props.messageObj.idDialogs) &&
                <Typing/>}
            </div>
            <div className={'wrapper_textarea_button'}>
                <div className={'wrapper_textarea'}>
            <textarea placeholder={'Message'}
                      onKeyDown={sendEnter}
                      onChange={(e) => {
                          props.changeTextInputDialogs(e.currentTarget.value, props.messageObj.idDialogs)
                      }}
                      ref={newMessageText}
                      value={props.textInput.find(textObj => textObj.idUser === props.messageObj.idDialogs)?.text || ''}>
            </textarea>
                </div>
                <div className={'wrapper_send_button'}>
                    <button onClick={sendMessage}><img src={sendMessageImg} alt={'send'}/>
                    </button>
                </div>
            </div>
        </div>
    )
}


export default SendMessage;
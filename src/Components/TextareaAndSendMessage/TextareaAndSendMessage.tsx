import sendMessageImg from "../../images/send.png";
import React, {ChangeEvent} from "react";
import {MessageType} from "../../redux/dialogs-reducer";
import './textareaAndSend.css'

type TextareaAndSendMessageType = {
    sendMessage: () => void
    onChangeTextarea: (e: ChangeEvent<HTMLTextAreaElement>) => void
    textMessage: string
    messageObj: MessageType | null

}


export const TextareaAndSendMessage = (props: TextareaAndSendMessageType) => {


    const sendEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            props.sendMessage()
            event.preventDefault();
        }
    }

    return <div className={'wrapper_textarea_button'}>
        <div className={'wrapper_textarea'}>
            <textarea placeholder={'Message'}
                      onKeyDown={sendEnter}
                      onChange={(e) => {
                          props.onChangeTextarea(e)
                      }}
                      value={props.textMessage}>
            </textarea>
        </div>
        <div className={'wrapper_send_button'}>
            <button onClick={props.sendMessage}>
                <img src={sendMessageImg} alt={'send'}/>
            </button>
        </div>
    </div>
}

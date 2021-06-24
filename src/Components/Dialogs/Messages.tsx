import './dialogs_and_message.css';
import React from "react";
import {MessageType} from "../../redux/dialogs-reducer";


export type MessagesType = {
    messageObj: MessageType
    textInput: string
    changeSendMessage: (idDialogs: number) => void
    onChangeMessage: (text: string | undefined) => void
}


const Messages = React.memo((props: MessagesType) => {

    const newMessageText = React.createRef<HTMLTextAreaElement>()

    return <div className={'window_messages'}>
        <div>{props.messageObj.message.map((mes, i) => {
            return <div className={'messages'}
                        key={props.messageObj.idDialogs}>{mes}</div>
        })}
        </div>
        <div className={'wrapper_textarea'}><textarea onChange={(e) => {
            props.onChangeMessage(e.currentTarget.value)
        }}
                                                      ref={newMessageText}
                                                      value={props.textInput}/>
            <button onClick={() => {
                props.changeSendMessage(props.messageObj.idDialogs)
            }}>Отправить
            </button>
        </div>
    </div>
})

export default Messages;



















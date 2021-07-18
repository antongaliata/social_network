import './dialogs_and_message.css';
import React, {useEffect} from "react";
import {DialogsType, MessageType} from "../../redux/dialogs-reducer";
import imgNoPhoto from "../../images/gender.png"
import arrowBack from "../../images/arrow4.png"
import SendMessage from "./SendMessage";
import Typing from "../Typing/Typing";
import {NavLink} from "react-router-dom";


export type MessagesType = {
    messageObj: MessageType
    textInput: Array<{ text: string, idUser: number }>
    changeSendMessage: (idDialogs: number, myId: number) => void
    changeTextInputDialogs: (text: string | undefined, idUser: number) => void
    myId: number
    botMessage: (idDialogs: number, userId: number) => void
    isTyping: boolean
    user: DialogsType | undefined
    myPhoto: string
    handlerHideListUsers: (className: 'list_users' | 'hide_List_users') => void
}


const Messages = (props: MessagesType) => {

    const messagesEndRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "auto"})
    })

    return <div className={'window_messages'}>
        <div className={'header_dialog'}>
            {window.innerWidth < 600 &&
            <img className={'arrow_back'}
                 src={arrowBack} alt='arrow'
                 onClick={() => {
                     props.handlerHideListUsers('list_users')
                 }
                 }/>}
            <NavLink to={`/profile/${props.user?.id}`}>
                <img className={'ava'} src={props.user?.photo ? props.user?.photo : imgNoPhoto} alt={'avatar'}/>
                {props.user?.name}
            </NavLink>
            {(window.innerWidth < 600 && props.isTyping) && <div className={'wrapper_typing'}><Typing/></div>}
        </div>

        <div className={'wrapper_messages2'}>
            <div className={'wrapper_messages'}>
                {props.messageObj.message.map((mes, i) => {
                    if (mes.whoId === props.myId) {
                        return <div className={'messages'}
                                    key={props.myId + i}>
                            <div className={'myMessages'}>{mes.text}
                                <div className={'time'}>{mes.time}</div>
                            </div>
                            <img alt={'avatar'} src={props.myPhoto ? props.myPhoto : imgNoPhoto}/>
                        </div>

                    } else if (mes.whoId !== props.myId) {
                        return <div className={'messages2'} key={props.messageObj.idDialogs + i}>
                            <img alt={'avatar'} src={props.user?.photo ? props.user?.photo : imgNoPhoto}/>
                            <div className={'messagesBot'}>{mes.text}
                                <div className={'time'}>{mes.time}</div>
                            </div>

                        </div>
                    }
                })}
                <div ref={messagesEndRef}/>
            </div>
        </div>

        <SendMessage
            messageObj={props.messageObj}
            textInput={props.textInput}
            changeSendMessage={props.changeSendMessage}
            changeTextInputDialogs={props.changeTextInputDialogs}
            myId={props.myId}
            botMessage={props.botMessage}
            isTyping={props.isTyping}/>
    </div>

}

export default Messages;



















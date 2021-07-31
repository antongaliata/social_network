import './dialogs_and_message.css';
import React, {useEffect} from "react";
import {DialogsType, MessageType} from "../../redux/dialogs-reducer";
import imgNoPhoto from "../../images/gender.png"
import arrowBack from "../../images/arrow4.png"
import SendMessage from "./SendMessage";
import Typing from "../Typing/Typing";
import {NavLink} from "react-router-dom";
import {navBarType} from "../../redux/app-reducer";
import {Message} from "../Message/Message";


export type MessagesType = {
    messageObj: MessageType
    textInput: Array<{ text: string, idUser: number }>
    handlerSendMessage: (idDialogs: number, myId: number) => void
    handlerTextInputDialogs: (text: string | undefined, idUser: number) => void
    myId: number
    botMessage: (idDialogs: number, userId: number) => void
    isTyping: boolean
    user: DialogsType | undefined
    myPhoto: string
    handlerHideListUsers: (className: 'list_users' | 'hide_List_users') => void
    handlerFocusNavLink: (navLinkFocus: navBarType) => void
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
            <NavLink to={`/profile/${props.user?.id}`} onClick={() => props.handlerFocusNavLink('profile')}>
                <img className={'ava'} src={props.user?.photo ? props.user?.photo : imgNoPhoto} alt={'avatar'}/>
                {props.user?.name}
            </NavLink>
            {(window.innerWidth < 600 && props.isTyping) && <div className={'wrapper_typing'}><Typing/></div>}
        </div>

        <div className={'wrapper_messages2'}>
            <div className={'wrapper_messages'}>
                {props.messageObj.message.map((mes, i) => {
                    if (mes.whoId === props.myId) {
                        return <Message
                            isMyMessage={mes.whoId === props.myId}
                            message={mes.text}
                            photo={props.myPhoto}
                            userId={mes.whoId} userName={null} time={mes.time} key={mes.whoId + i}/>

                    } else {
                        return <Message isMyMessage={mes.whoId === props.myId}
                                        photo={props.user?.photo ? props.user?.photo : imgNoPhoto}
                                        userId={mes.whoId}
                                        userName={null}
                                        time={mes.time} key={i}
                                        message={mes.text}/>
                    }
                })}
                <div ref={messagesEndRef}/>
            </div>
        </div>

        <SendMessage
            messageObj={props.messageObj}
            textInput={props.textInput}
            handlerSendMessage={props.handlerSendMessage}
            handlerTextInputDialogs={props.handlerTextInputDialogs}
            myId={props.myId}
            botMessage={props.botMessage}
            isTyping={props.isTyping}/>
    </div>

}

export default Messages;



















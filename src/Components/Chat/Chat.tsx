import React, {ChangeEvent, useEffect, useState} from "react";
import {Message} from "../Message/Message";
import {TextareaAndSendMessage} from "../TextareaAndSendMessage/TextareaAndSendMessage";
import {useSelector} from "react-redux";
import {stateType} from "../../redux/store";
import './chat.css'
import '../Dialogs/dialogs_and_message.css'


type MessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


export const Chat = () => {
    const myId = useSelector<stateType>(state => state.app.id)
    const messagesEndRef = React.useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<Array<MessageType>>([])
    const [textMessage, setTextMessage] = useState<string>('')
    const socket = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

    useEffect(() => {
        socket.addEventListener('message', (e) => {
            setMessages(JSON.parse(e.data))
        })
    }, [])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "auto"})
    })

    const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget.value) {
            setTextMessage(e.currentTarget.value)
        }
    }

    const sendMessage = () => {
        socket.send(textMessage)
        setTextMessage('')
    }

    return <div className={'chat_container'}>
        <div className={'header_chat'}><h3>Chat</h3></div>
        <div className={'wrapper_messages2'}>
            <div className={'wrapper_messages'}>
                {messages?.map((message, i) => {
                    return <Message isMyMessage={message.userId === myId}
                                    message={message.message}
                                    userName={message.userName}
                                    userId={message.userId}
                                    photo={message.photo}
                                    time={null}
                                    key={message.userId + i}/>
                })}

                <div ref={messagesEndRef}/>
            </div>
        </div>
        <div className={'container_send_message'}>
            {window.innerWidth > 600 && <div className={'wrapper_typing'}>
            </div>}
            <TextareaAndSendMessage messageObj={null}
                                    sendMessage={sendMessage}
                                    onChangeTextarea={onChangeTextarea}
                                    textMessage={textMessage}/>
        </div>
    </div>
}




















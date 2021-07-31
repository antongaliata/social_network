import {useEffect, useState} from "react";
import {Chat} from "./Chat";

export type MessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


export const ChatPage = () => {
    const socket = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    const [messages, setMessages] = useState<Array<MessageType>>([])

    useEffect(() => {
        socket.addEventListener('message', (e) => {
            let newMessage = JSON.parse(e.data)
            setMessages((prev) => {
                return [ ...prev, ...newMessage]
            })
        })
    }, [])

    const sendMessage = (message: string) => {
        socket.send(message)
    }

    return <Chat messages={messages} sendMessage={sendMessage}/>

}
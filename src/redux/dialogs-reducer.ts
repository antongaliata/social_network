import {requestAPI, UsersType} from "../requestAPI/requestAPI";
import {Dispatch} from "redux";


export type DialogsType = {
    id: number
    name: string
    photo: string | null
}
export type MessageType = {
    idDialogs: number
    message: Array<{ whoId: number | null, text: string, time: string }>
}

export type dialogsPageType = {
    dialogs: Array<DialogsType>
    message: Array<MessageType>
    textInputDialog: Array<{text: string, idUser: number}>
    isTyping: boolean
}

export const initialState: dialogsPageType = {
    dialogs: [] as Array<DialogsType>,
    message: [] as Array<MessageType>,
    textInputDialog: [{text: '', idUser: 0}],
    isTyping: false
}


export const dialogsReducer = (state = initialState, action: actionType): dialogsPageType => {

    switch (action.type) {
        case 'SEND-MESSAGE' : {
            const copyState = {
                ...state,
                message: [...state.message]
            }
            const now = new Date()
            let min = now.getMinutes().toString()
            min = min.toString().length === 1 ? '0' + '' + min.toString() : min.toString()
            const currentTime = now.getHours() + ':' + min

            const textMessage: string = state.textInputDialog.find(s=> s.idUser === action.idDialogs)?.text || ''
            copyState.message.forEach(mes => {
                if (mes.idDialogs === action.idDialogs) {
                    mes.message.push({whoId: action.myId, text: textMessage, time: currentTime})
                }
            })
            return copyState
        }
        case 'DIALOGS/BOT-MESSAGE': {
            const copyState = {
                ...state,
                message: [...state.message]
            }
            const now = new Date()
            let min = now.getMinutes().toString()
            min = min.toString().length === 1 ? '0' + '' + min.toString() : min.toString()
            const currentTime = now.getHours() + ':' + min

            const botName = copyState.dialogs.find(user => user.id === action.userId)
            copyState.message.forEach(mes => {
                if (mes.idDialogs === action.idDialogs) {
                    mes.message.push({whoId: action.userId, text: `hello, I'm ${botName?.name}`, time: currentTime})
                }
            })
            return copyState
        }

        case 'DIALOGS/CHANGE-TEXT-INPUT' : {
            return {
                ...state,
                textInputDialog: state.textInputDialog.map(textObj=>{
                    if(textObj.idUser === action.idUser){
                        return {...textObj, text: action.text || ''}
                    }else {
                        return {text: action.text || '', idUser: action.idUser}
                    }
                })
            }
        }

        case 'DIALOGS/GET-STATE-DIALOGS': {
            const copyState = {
                ...state,
                dialogs: state.dialogs.filter(user => {
                    if (action.users.find(friend => friend.id === user.id)) {
                        return user
                    }
                }),
                message: <Array<MessageType>>[...state.message]
            }

            action.users.forEach(user => {
                if (!copyState.dialogs.find(friend => friend.id === user.id)) {
                    copyState.dialogs.push({id: user.id, name: user.name, photo: user.photos.small})
                    copyState.message.push({idDialogs: user.id, message: []})
                }
            })
            return copyState
        }
        case 'DIALOGS/IS-TYPING': {
            return {...state, isTyping: action.isTyping}
        }

        default:
            return state
    }
}


export type sendMessageACType = {
    type: 'SEND-MESSAGE'
    idDialogs: number
    myId: number | null
}
export type changeTextInputDialogsACType = {
    type: 'DIALOGS/CHANGE-TEXT-INPUT'
    text: string | undefined
    idUser: number
}

export type getStateDialogsACType = {
    type: 'DIALOGS/GET-STATE-DIALOGS'
    users: Array<UsersType>
}


export type botMessageACType = {
    type: 'DIALOGS/BOT-MESSAGE'
    idDialogs: number
    userId: number
}

export type handlerTypingACType = {
    type: 'DIALOGS/IS-TYPING'
    isTyping: boolean
}


type actionType = sendMessageACType
    | changeTextInputDialogsACType
    | getStateDialogsACType
    | botMessageACType
    | handlerTypingACType


const getStateDialogsAC = (users: Array<UsersType>): getStateDialogsACType => {
    return {type: 'DIALOGS/GET-STATE-DIALOGS', users}
}

export const sendMessageAC = (idDialogs: number, myId: number): sendMessageACType => {
    return {type: 'SEND-MESSAGE', idDialogs, myId}
}

export const changeTextInputDialogsAC = (text: string | undefined, idUser: number): changeTextInputDialogsACType => {
    return {type: 'DIALOGS/CHANGE-TEXT-INPUT', text, idUser}
}

const botMessageAC = (idDialogs: number, userId: number): botMessageACType => {
    return {type: 'DIALOGS/BOT-MESSAGE', idDialogs, userId}
}

const handlerTypingAC = (isTyping: boolean): handlerTypingACType => {
    return {type: 'DIALOGS/IS-TYPING', isTyping}
}


export const formDialogsThunk = () => {
    return (Dispatch: Dispatch) => {
        requestAPI.getUsers(1, 100, true)
            .then(res => {
                Dispatch(getStateDialogsAC(res.data.items))
            })
    }
}

export const botMessageThunk = (idDialogs: number, userId: number) => {
    const delay = Math.floor(Math.random() * 3000)

    return (Dispatch: Dispatch) => {
        setTimeout(() => {
            Dispatch(handlerTypingAC(true))
            setTimeout(() => {
                Dispatch(botMessageAC(idDialogs, userId))
                Dispatch(handlerTypingAC(false))
            }, delay)
        }, 500)


    }
}















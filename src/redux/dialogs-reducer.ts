import {requestAPI, UsersType} from "../requestAPI/requestAPI";
import {Dispatch} from "redux";
import {handlerSubscribedAC} from "./users-reducer";
import {handlerPreloaderPagesAC} from "./app-reducer";


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
    textInputDialog: Array<{ text: string, idUser: number }>
    isTyping: boolean
    classNameListUsers: 'list_users' | 'hide_List_users'
    focusUserId: number
    isLoadingStatusDialog: boolean
}

export const initialState: dialogsPageType = {
    dialogs: [] as Array<DialogsType>,
    message: [] as Array<MessageType>,
    textInputDialog: [{text: '', idUser: 0}],
    isTyping: false,
    classNameListUsers: 'list_users',
    focusUserId: 0,
    isLoadingStatusDialog: false
}


export const dialogsReducer = (state = initialState, action: actionType): dialogsPageType => {
    const copyState = {
        ...state,
        message: [...state.message]
    }
    switch (action.type) {
        case 'SEND-MESSAGE' : {
            const now = new Date()
            let min = now.getMinutes().toString()
            min = min.toString().length === 1 ? '0' + '' + min.toString() : min.toString()
            const currentTime = now.getHours() + ':' + min

            const textMessage: string = state.textInputDialog.find(s => s.idUser === action.idDialogs)?.text || ''
            copyState.message.forEach(mes => {
                if (mes.idDialogs === action.idDialogs) {
                    mes.message.push({whoId: action.myId, text: textMessage, time: currentTime})
                }
            })
            return copyState
        }
        case 'DIALOGS/BOT-MESSAGE': {
            const now = new Date()
            let min = now.getMinutes().toString()
            min = min.toString().length === 1 ? '0' + '' + min.toString() : min.toString()
            const currentTime = now.getHours() + ':' + min

            const botName = copyState.dialogs.find(user => user.id === action.userId)
            copyState.message.forEach(mes => {
                if (mes.idDialogs === action.idDialogs) {
                    mes.message.push({whoId: action.userId, text: ` hello, I'm ${botName?.name}`, time: currentTime})
                }
            })
            return copyState
        }

        case 'DIALOGS/HANDLER-TEXT-INPUT' : {
            return {
                ...state,
                textInputDialog: state.textInputDialog.map(textObj => {
                    if (textObj.idUser === action.idUser) {
                        return {...textObj, text: action.text || ''}
                    } else {
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
        case 'DIALOGS/HIDE-LIST-USERS': {
            return {...state, classNameListUsers: action.className}
        }
        case "DIALOGS/FOCUS-USER": {
            return {...state, focusUserId: action.idUser}
        }
        case "DIALOGS/LOADING-STATUS": {
            return {...state, isLoadingStatusDialog: action.loadingStatus}
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
    type: 'DIALOGS/HANDLER-TEXT-INPUT'
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

export type handlerHideListUsersACType = {
    type: 'DIALOGS/HIDE-LIST-USERS'
    className: 'list_users' | 'hide_List_users'
}

export type handlerFocusUserACACType = {
    type: 'DIALOGS/FOCUS-USER'
    idUser: number
}

export type handlerLoadingDialogsACType = {
    type: 'DIALOGS/LOADING-STATUS'
    loadingStatus: boolean
}

type actionType = sendMessageACType
    | changeTextInputDialogsACType
    | getStateDialogsACType
    | botMessageACType
    | handlerTypingACType
    | handlerHideListUsersACType
    | handlerFocusUserACACType
    | handlerLoadingDialogsACType


const getStateDialogsAC = (users: Array<UsersType>): getStateDialogsACType => {
    return {type: 'DIALOGS/GET-STATE-DIALOGS', users}
}

export const sendMessageAC = (idDialogs: number, myId: number): sendMessageACType => {
    return {type: 'SEND-MESSAGE', idDialogs, myId}
}

export const handlerTextInputDialogsAC = (text: string | undefined, idUser: number): changeTextInputDialogsACType => {
    return {type: 'DIALOGS/HANDLER-TEXT-INPUT', text, idUser}
}

const botMessageAC = (idDialogs: number, userId: number): botMessageACType => {
    return {type: 'DIALOGS/BOT-MESSAGE', idDialogs, userId}
}

const handlerTypingAC = (isTyping: boolean): handlerTypingACType => {
    return {type: 'DIALOGS/IS-TYPING', isTyping}
}

export const handlerHideListUsersAC = (className: 'list_users' | 'hide_List_users'): handlerHideListUsersACType => {
    return {type: 'DIALOGS/HIDE-LIST-USERS', className}
}

export const handlerFocusUserAC = (idUser: number): handlerFocusUserACACType => {
    return {type: 'DIALOGS/FOCUS-USER', idUser}
}


export const getStateDialogsThunk = () => {
    return (Dispatch: Dispatch) => {
        handlerPreloaderPagesAC(true)
        requestAPI.getUsers(1, 100, true)
            .then(res => {
                Dispatch(getStateDialogsAC(res.data.items))
                Dispatch(handlerSubscribedAC(res.data))
                setTimeout(() => {
                    Dispatch(handlerPreloaderPagesAC(false))
                }, 1000)
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















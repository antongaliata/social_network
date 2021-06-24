import {requestAPI, UsersType} from "../requestAPI/requestAPI";
import {Dispatch} from "redux";


export type DialogsType = {
    id: number
    name: string
    photo: string | null
}
export type MessageType = {
    idDialogs: number
    message: Array<string>
}

export type dialogsPageType = {
    dialogs: Array<DialogsType>
    message: Array<MessageType>
    textInputDialog: string
}

export const initialState: dialogsPageType = {
    dialogs: [] as Array<DialogsType>,
    message: [] as Array<MessageType>,
    textInputDialog: ''

}


export const dialogsReducer = (state = initialState, action: actionType): dialogsPageType => {

    switch (action.type) {
        case 'SEND-MESSAGE' : {
            const copyState = {
                ...state,
                message: [...state.message]
            }

            const text = state.textInputDialog
            copyState.message.forEach(mes => {
                if (mes.idDialogs === action.idDialogs) {
                    mes.message.push(text)
                }
            })
            return copyState
        }
        case 'DIALOGS/CHANGE-TEXT-INPUT' : {
            return {
                ...state,
                textInputDialog: action.text ? action.text : ''
            }
        }
        case 'DIALOGS/GET-STATE-DIALOGS': {
            const copyState = {...state, dialogs: [...state.dialogs], message: [...state.message]}
            action.users.forEach(user => {
                console.log(user)

                if (!copyState.dialogs.find(d => d.id === user.id)) {
                    copyState.dialogs.push({id: user.id, name: user.name, photo: user.photos.small})
                    copyState.message.push({idDialogs: user.id, message: []})
                }
            })

            return copyState
        }
        default:
            return state
    }
}


export type sendMessageACType = {
    type: 'SEND-MESSAGE'
    idDialogs: number
}
export type changeTextInputDialogsACType = {
    type: 'DIALOGS/CHANGE-TEXT-INPUT'
    text: string | undefined
}

export type getStateDialogsACType = {
    type: 'DIALOGS/GET-STATE-DIALOGS'
    users: Array<UsersType>
}


type actionType = sendMessageACType | changeTextInputDialogsACType | getStateDialogsACType


const getStateDialogsAC = (users: Array<UsersType>): getStateDialogsACType => {
    return {type: 'DIALOGS/GET-STATE-DIALOGS', users}
}

export const sendMessageAC = (idDialogs: number): sendMessageACType => {
    return {type: 'SEND-MESSAGE', idDialogs}
}

export const changeTextInputDialogsAC = (text: string | undefined): changeTextInputDialogsACType => {
    return {type: 'DIALOGS/CHANGE-TEXT-INPUT', text}
}


export const formDialogsThunk = () => {
    return (Dispatch: Dispatch) => {
        requestAPI.getUsers(1, 100, true)
            .then(res => {
                console.log(res.data.items)
                Dispatch(getStateDialogsAC(res.data.items))
            })
    }
}















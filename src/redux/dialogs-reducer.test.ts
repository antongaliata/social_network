import {DialogsType, MessageType} from "./state";
import {handlerTextInputDialogsAC, dialogsPageType, dialogsReducer, sendMessageAC} from "./dialogs-reducer";


let startState: dialogsPageType = {
    dialogs: <Array<DialogsType>>[],
    message: <Array<MessageType>>[],
    textInputDialog: 'newMessage'
}


beforeEach(() => {
    startState = {
        dialogs: <Array<DialogsType>>[
            {id: '1', name: 'john'},
            {id: '2', name: 'fred'},
            {id: '3', name: 'Ketty'}
        ],
        message: <Array<MessageType>>[
            {idDialogs: '1', message: []},
            {idDialogs: '2', message: []},
            {idDialogs: '3', message: []}
        ],
        textInputDialog: 'newMessage'
    }
})

test('send message, push in obj message', () => {
    const action = sendMessageAC('2')
    const endState = dialogsReducer(startState, action)

    expect(endState.message[1].message.length).toBe(1)
    expect(endState.message[1].message[0]).toBe('newMessage')
})

test('add text in input', () => {
    const action = handlerTextInputDialogsAC('new title')
    const endState = dialogsReducer(startState, action)

    expect(endState.textInputDialog).toBe('new title')
})


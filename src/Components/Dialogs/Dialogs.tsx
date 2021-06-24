import {NavLink, Route} from "react-router-dom";
import './dialogs_and_message.css';
import React from "react";
import {dialogsPageType} from "../../redux/dialogs-reducer";
import Messages from "./Messages";


export type DialogsComponentType = {
    dialogsState: dialogsPageType
    changeSendMessage: (idDialogs: number, myId: number) => void
    changeTextInputDialogs: (text: string | undefined) => void
    authMe: () => void
    formDialogs: () => void
    myId: number
    botMessage: (idDialogs: number, userId: number) => void
}

class Dialogs extends React.Component<DialogsComponentType> {

    componentDidMount() {
        this.props.formDialogs()
    }

    render() {
        return <div className={'Message_Component'}>
            <div className={'list_users'}>
                {this.props.dialogsState.dialogs.map(dialog => {
                    return <NavLink to={`/message/dialogs/id/${dialog.id}`} key={dialog.id}>{dialog.name}</NavLink>
                })}
            </div>
            <div className={'wrapper_messages'}>
                {this.props.dialogsState.message.map(mes => {
                    return <Route path={`/message/dialogs/id/${mes.idDialogs}`} key={mes.idDialogs}>{
                        <Messages textInput={this.props.dialogsState.textInputDialog}
                                  messageObj={mes}
                                  changeSendMessage={this.props.changeSendMessage}
                                  changeTextInputDialogs={this.props.changeTextInputDialogs}
                                  myId={this.props.myId}
                                  botMessage={this.props.botMessage}
                        isTyping={this.props.dialogsState.isTyping}/>
                    }</Route>
                })}
            </div>


        </div>

    }
}

export default Dialogs;
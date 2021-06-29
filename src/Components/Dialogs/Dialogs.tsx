import {NavLink, Route} from "react-router-dom";
import './dialogs_and_message.css';
import './list_user.css'
import React from "react";
import {dialogsPageType} from "../../redux/dialogs-reducer";
import Messages from "./Messages";
import imgNoPhoto from "../../images/gender.png"
import {ProfileUsersType} from "../../redux/profile-reducer";

export type DialogsComponentType = {
    dialogsState: dialogsPageType
    changeSendMessage: (idDialogs: number, myId: number) => void
    changeTextInputDialogs: (text: string | undefined, idUser: number) => void
    authMe: () => void
    formDialogs: () => void
    myId: number
    botMessage: (idDialogs: number, userId: number) => void
    profile: ProfileUsersType
}

class Dialogs extends React.Component<DialogsComponentType, { focusUserId: number }> {
    constructor(props: DialogsComponentType) {
        super(props);
        this.state = {
            focusUserId: 0
        }
    }

    componentDidMount() {
        this.props.formDialogs()
    }

    handlerFocus(id: number) {
        this.setState({focusUserId: id})
    }

    render() {
        return <div className={'Message_Component'}>
            <div className={'list_users'}>
                {this.props.dialogsState.dialogs.map(user => {
                    return <NavLink className={this.state.focusUserId === user.id ? 'focusUser' : 'noFocusUser'}
                                    onClick={() => this.handlerFocus(user.id)}
                                    to={`/message/dialogs/id/${user.id}`}
                                    key={user.id}>
                        <img alt={'avatar'} src={user.photo ? user.photo : imgNoPhoto}/>{user.name}
                    </NavLink>
                })}
            </div>
            {this.props.dialogsState.message.map(mes => {
                const user = this.props.dialogsState.dialogs.find(user => user.id === mes.idDialogs)

                return <Route path={`/message/dialogs/id/${mes.idDialogs}`} key={mes.idDialogs}>{

                    <Messages textInput={this.props.dialogsState.textInputDialog}
                              messageObj={mes}
                              changeSendMessage={this.props.changeSendMessage}
                              changeTextInputDialogs={this.props.changeTextInputDialogs}
                              myId={this.props.myId}
                              botMessage={this.props.botMessage}
                              isTyping={this.props.dialogsState.isTyping}
                              user={user}
                              myPhoto={this.props.profile.myPhoto.small}/>
                }</Route>
            })}

        </div>

    }
}

export default Dialogs;
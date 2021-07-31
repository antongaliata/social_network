import {NavLink, Route} from "react-router-dom";
import './dialogs_and_message.css';
import './list_user.css'
import React, {useEffect} from "react";
import {dialogsPageType} from "../../redux/dialogs-reducer";
import Messages from "./Messages";
import imgNoPhoto from "../../images/gender.png"
import {stateProfileType} from "../../redux/profile-reducer";
import {navBarType} from "../../redux/app-reducer";

export type DialogsComponentType = {
    dialogsState: dialogsPageType
    handlerSendMessage: (idDialogs: number, myId: number) => void
    handlerTextInputDialogs: (text: string | undefined, idUser: number) => void
    authMe: () => void
    formDialogs: () => void
    myId: number
    botMessage: (idDialogs: number, userId: number) => void
    profile: stateProfileType
    classNameListUsers: string
    handlerHideListUsers: (className: 'list_users' | 'hide_List_users') => void
    handlerFocusUser: (isUser: number) => void
    handlerFocusNavLink: (navLinkFocus: navBarType) => void
}

const Dialogs = React.memo((props: DialogsComponentType) => {

    useEffect(() => {
        props.formDialogs()
    }, [])

    return <>
        <div className={'Message_Component'}>
            <div className={props.classNameListUsers}>
                {props.dialogsState.dialogs.map(user => {
                    return <NavLink
                        className={props.dialogsState.focusUserId === user.id ? 'focusUser' : 'noFocusUser'}
                        onClick={() => {
                            props.handlerFocusUser(user.id)
                            if (window.innerWidth < 600) {
                                props.handlerHideListUsers('hide_List_users')
                            }
                        }}
                        to={`/message/dialogs/id/${user.id}`}
                        key={user.id}>
                        <img alt={'avatar'} src={user.photo ? user.photo : imgNoPhoto}/>{user.name}
                    </NavLink>
                })}
            </div>
            {props.dialogsState.message.map(mes => {
                const user = props.dialogsState.dialogs.find(user => user.id === mes.idDialogs)
                return <Route path={`/message/dialogs/id/${mes.idDialogs}`} key={mes.idDialogs}>{
                    <Messages textInput={props.dialogsState.textInputDialog}
                              messageObj={mes}
                              handlerSendMessage={props.handlerSendMessage}
                              handlerTextInputDialogs={props.handlerTextInputDialogs}
                              myId={props.myId}
                              botMessage={props.botMessage}
                              isTyping={props.dialogsState.isTyping}
                              user={user}
                              myPhoto={props.profile.myPhoto.small}
                              handlerHideListUsers={props.handlerHideListUsers}
                              handlerFocusNavLink={props.handlerFocusNavLink}/>
                }</Route>
            })}
        </div>
    </>

})

export default Dialogs;
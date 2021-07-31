import {connect} from "react-redux";
import {stateType} from "../../redux/store";
import Dialogs from "./Dialogs";
import {
    botMessageThunk,
    handlerTextInputDialogsAC,
    getStateDialogsThunk,
    handlerFocusUserAC,
    handlerHideListUsersAC,
    sendMessageAC
} from "../../redux/dialogs-reducer";
import {authMeThunk, handlerFocusNavLinkAC, navBarType} from "../../redux/app-reducer";


const mapStateToProps = (state: stateType) => {
    return {
        dialogsState: state.dialogs,
        myId: state.app.id,
        profile: state.profilePage,
        classNameListUsers: state.dialogs.classNameListUsers
    }
}

const mapDispatchToProps = (Dispatch: any) => {
    return {
        authMe: () => Dispatch(authMeThunk()),
        handlerSendMessage: (idDialogs: number, myId: number) => Dispatch(sendMessageAC(idDialogs, myId)),
        handlerTextInputDialogs: (text: string | undefined, idUser: number) => Dispatch(handlerTextInputDialogsAC(text, idUser)),
        formDialogs: () => Dispatch(getStateDialogsThunk()),
        botMessage: (idDialogs: number, userId: number) => Dispatch(botMessageThunk(idDialogs, userId)),
        handlerHideListUsers: (className: 'list_users' | 'hide_List_users') => Dispatch(handlerHideListUsersAC(className)),
        handlerFocusUser: (isUser: number) => Dispatch(handlerFocusUserAC(isUser)),
        handlerFocusNavLink: (navLinkFocus: navBarType) => Dispatch(handlerFocusNavLinkAC(navLinkFocus))
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export default DialogsContainer;
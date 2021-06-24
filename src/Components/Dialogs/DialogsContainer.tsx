import {connect} from "react-redux";
import {stateType} from "../../redux/store";
import Dialogs from "./Dialogs";
import {
    botMessageThunk,
    changeTextInputDialogsAC,
    formDialogsThunk,
    sendMessageAC
} from "../../redux/dialogs-reducer";
import {authMeThunk} from "../../redux/app-reducer";


const mapStateToProps = (state: stateType) => {
    return {dialogsState: state.dialogs, myId: state.app.id}
}

const mapDispatchToProps = (Dispatch: any) => {
    return {
        authMe: () => Dispatch(authMeThunk()),
        changeSendMessage: (idDialogs: number, myId: number) => Dispatch(sendMessageAC(idDialogs, myId)),
        changeTextInputDialogs: (text: string | undefined) => Dispatch(changeTextInputDialogsAC(text)),
        formDialogs: () => Dispatch(formDialogsThunk()),
        botMessage: (idDialogs: number, userId: number) => Dispatch(botMessageThunk(idDialogs, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs)
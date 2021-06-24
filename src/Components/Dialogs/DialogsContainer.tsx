import {connect} from "react-redux";
import {stateType} from "../../redux/store";
import Dialogs from "./Dialogs";
import {changeTextInputDialogsAC, dialogsPageType, formDialogsThunk, sendMessageAC} from "../../redux/dialogs-reducer";
import {authMeThunk} from "../../redux/app-reducer";


type mapSTPFDType = {
    dialogsState: dialogsPageType
}

const mapStateToProps = (state: stateType): mapSTPFDType => {
    return {dialogsState: state.dialogs}
}

const mapDispatchToProps = (Dispatch: any) => {
    return {
        authMe: () => Dispatch(authMeThunk()),
        changeSendMessage: (idDialogs: number) => Dispatch(sendMessageAC(idDialogs)),
        onChangeMessage: (text: string | undefined) => Dispatch(changeTextInputDialogsAC(text)),
        formDialogs: () => Dispatch(formDialogsThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs)
import {connect} from "react-redux";
import Header from "./Header";
import {authMeThunk, handlerFocusNavLinkAC, logOutThunk, openCloseMenuBurgerAC} from "../../redux/app-reducer";
import {stateType} from "../../redux/store";


const mapStateToProps = (state: stateType) => {
    return {
        isOpenMenuBurger: state.app.isOpenMenuBurger,
        loadingStatusPages: state.app.loadingStatusPages,
        myId: state.app.id
    }
}

export const HeaderContainer = connect(mapStateToProps, {logOutThunk, authMeThunk, openCloseMenuBurgerAC,handlerFocusNavLinkAC})(Header)
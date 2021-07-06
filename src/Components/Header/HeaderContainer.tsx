import {connect} from "react-redux";
import Header from "./Header";
import {authMeThunk, logOutThunk, openCloseMenuBurgerAC} from "../../redux/app-reducer";
import {stateType} from "../../redux/store";


const mapStateToProps = (state: stateType) => {
    return {isOpenMenuBurger: state.app.isOpenMenuBurger}
}

export const HeaderContainer = connect(mapStateToProps, {logOutThunk, authMeThunk,openCloseMenuBurgerAC})(Header)
import {connect} from "react-redux";
import {stateType} from "../../redux/store";
import {Navbar} from "./Navbar";
import {handlerFocusNavLinkAC} from "../../redux/app-reducer";


const mapStateToProps = (state: stateType) => {
    return {myData: state.app, navBarFocus: state.app.navBarFocus, isOpenMenu: state.app.isOpenMenuBurger}
}

export const NavbarContainer = connect(mapStateToProps,{handlerFocusNavLinkAC})(Navbar)
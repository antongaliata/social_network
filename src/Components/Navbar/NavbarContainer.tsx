import {connect} from "react-redux";
import {stateType} from "../../redux/store";
import {Navbar} from "./Navbar";

const mapStateToProps = (state: stateType) => {
    return {myData: state.app}
}

export const NavbarContainer = connect(mapStateToProps)(Navbar)
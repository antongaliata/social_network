import {connect} from "react-redux";
import Header from "./Header";

import {authMeThunk, logOutThunk} from "../redux/app-reducer";


export const HeaderContainer = connect(null, {logOutThunk, authMeThunk})(Header)
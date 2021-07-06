import * as React from "react";
import '../style.css'
import {NavLink} from "react-router-dom";
import BurgerMenu from "../Navbar/BurgerMenu/BurgerMenu";

type HeaderType = {
    logOutThunk: () => void
    isAuth: boolean
    isOpenMenuBurger: boolean
    openCloseMenuBurgerAC: (isOpen: boolean) => void
}


class Header extends React.Component<HeaderType> {

    render() {
        return <div className={'Header'}>
            <div className={'wrapper_burger'}>
                {this.props.isAuth && <BurgerMenu
                    isOpenMenuBurger={this.props.isOpenMenuBurger}
                    openCloseMenuBurger={this.props.openCloseMenuBurgerAC}/>}
            </div>
            <div className={'title'}>My social network</div>
                {this.props.isAuth ? <NavLink to='/login' onClick={() => {
                    this.props.logOutThunk()
                }}>sign out</NavLink> : <NavLink to={'/login'}>Login</NavLink>}
        </div>

    }
}

export default Header;
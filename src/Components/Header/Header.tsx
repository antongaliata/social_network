import * as React from "react";
import './header.css'
import {NavLink} from "react-router-dom";
import BurgerMenu from "../Navbar/BurgerMenu/BurgerMenu";
import PreloaderLine from "../Preloader/PreloaderLine";
import {navBarType} from "../../redux/app-reducer";

type HeaderType = {
    myId: number
    logOutThunk: () => void
    isAuth: boolean
    isOpenMenuBurger: boolean
    openCloseMenuBurgerAC: (isOpen: boolean) => void
    loadingStatusPages: boolean
    handlerFocusNavLinkAC: (navLinkFocus: navBarType) => void
}


const Header = (props: HeaderType) => {

    const navLinkProfile = () => {
        if (props.isAuth) {
            props.handlerFocusNavLinkAC('profile')
        }
    }
    return <div className={'Header'}>
        {props.loadingStatusPages && <PreloaderLine/>}
        <div className={'wrapper_burger'}>
            {props.isAuth && <BurgerMenu
                isOpenMenuBurger={props.isOpenMenuBurger}
                openCloseMenuBurger={props.openCloseMenuBurgerAC}/>}
        </div>
        <NavLink to={props.isAuth ? `/profile/${props.myId}` : '/login'} className={'title'} onClick={navLinkProfile}>
            <div className={'part_title1'}>Social</div>
            <div className={'part_title2'}>Network</div>
        </NavLink>
        {props.isAuth ? <NavLink to='/login' onClick={() => {
            props.logOutThunk()
        }}>sign out</NavLink> : <NavLink to={'/login'}>Login</NavLink>}
    </div>
}

export default Header;
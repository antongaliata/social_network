import React from "react";
import './navbar.css'
import {NavLink} from "react-router-dom";
import {authStateType, navBarType} from "../../redux/app-reducer";
import imgProfile from '../../images/profile2.png'
import imgMessage from '../../images/message3.png'
import imgChat from '../../images/chat.png'
import imgNews from '../../images/news2.png'
import imgUsers from '../../images/users2.png'
import imgFriends from '../../images/friends2.png'

type NavbarType = {
    myData: authStateType
    navBarFocus: navBarType
    handlerFocusNavLinkAC: (navLinkFocus: navBarType) => void
    isOpenMenu: boolean
    handlerHideListUsersAC: (className: 'list_users' | 'hide_List_users')=>void
    handlerFocusUserAC: (isUser: number)=>void
}


export function Navbar(props: NavbarType) {

    const handlerClassNavbar = () => {
     if ((!props.isOpenMenu && window.innerWidth <= 1291)  || !props.myData.isAuth ) {
            return 'navbarClose'
        }
        return 'navbar'
    }

    return <div className={'NavbarContainer'}>
        <div className={handlerClassNavbar()}>
            <NavLink className={props.navBarFocus === 'profile' ? 'focusNavLink' : 'a'}
                     to={`/profile/${props.myData.id}`}
                     onClick={() => props.handlerFocusNavLinkAC('profile')}>
                <img alt={'profile'} src={imgProfile}/>Profile</NavLink>
            <NavLink className={props.navBarFocus === 'friends' ? 'focusNavLink' : 'a'}
                     to="/friends"
                     onClick={() => props.handlerFocusNavLinkAC('friends')}>
                <img alt={'friends'} src={imgFriends}/>Friends</NavLink>
            <NavLink className={props.navBarFocus === 'message' ? 'focusNavLink' : 'a'}
                     to="/message"
                     onClick={() =>{
                         props.handlerFocusNavLinkAC('message')
                         props.handlerHideListUsersAC('list_users')
                         props.handlerFocusUserAC(0)

                     }}>
                <img alt={'message'} src={imgMessage}/>Message</NavLink>
            <NavLink className={props.navBarFocus === 'users' ? 'focusNavLink' : 'a'}
                     to="/users"
                     onClick={() => props.handlerFocusNavLinkAC('users')}>
                <img alt={'users'} src={imgUsers}/>Users</NavLink>
            <NavLink className={props.navBarFocus === 'news' ? 'focusNavLink' : 'a'}
                     to="/news"
                     onClick={() => props.handlerFocusNavLinkAC('news')}>
                <img alt={'news'} src={imgNews}/>News</NavLink>
            <NavLink className={props.navBarFocus === 'chat' ? 'focusNavLink' : 'a'}
                     to="/chat"
                     onClick={() => props.handlerFocusNavLinkAC('chat')}>
                <img alt={'chat'} src={imgChat}/>Chat</NavLink>
        </div>
    </div>
}
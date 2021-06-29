import React from "react";
import '../style.css'
import {NavLink} from "react-router-dom";
import {authStateType, navBarType} from "../../redux/app-reducer";
import imgProfile from '../../images/profile2.png'
import imgMessage from '../../images/message3.png'
import imgNews from '../../images/news2.png'
import imgUsers from '../../images/users2.png'
import imgFriends from '../../images/friends2.png'

type NavbarType = {
    myData: authStateType
    navBarFocus: navBarType
    handlerFocusNavLinkAC: (navLinkFocus: navBarType) => void
}


export class Navbar extends React.Component<NavbarType> {

    render() {
        return <div className={'NavbarContainer'}>
            <div className={'navbar'}>
                <NavLink className={this.props.navBarFocus === 'profile' ? 'focusNavLink' : 'a'}
                         to={`/profile/${this.props.myData.id}`}
                         onClick={() => this.props.handlerFocusNavLinkAC('profile')}>
                    <img alt={'profile'} src={imgProfile}/>Profile</NavLink>
                <NavLink className={this.props.navBarFocus === 'friends' ? 'focusNavLink' : 'a'}
                         to="/friends"
                         onClick={() => this.props.handlerFocusNavLinkAC('friends')}>
                    <img alt={'friends'} src={imgFriends}/>Friends</NavLink>
                <NavLink className={this.props.navBarFocus === 'message' ? 'focusNavLink' : 'a'}
                         to="/message"
                         onClick={() => this.props.handlerFocusNavLinkAC('message')}>
                    <img alt={'message'} src={imgMessage}/>Message</NavLink>
                <NavLink className={this.props.navBarFocus === 'users' ? 'focusNavLink' : 'a'}
                         to="/users"
                         onClick={() => this.props.handlerFocusNavLinkAC('users')}>
                    <img alt={'users'} src={imgUsers}/>Users</NavLink>
                <NavLink className={this.props.navBarFocus === 'news' ? 'focusNavLink' : 'a'}
                         to="/news"
                         onClick={() => this.props.handlerFocusNavLinkAC('news')}>
                    <img alt={'news'} src={imgNews}/>News</NavLink>
            </div>
        </div>
    }
}
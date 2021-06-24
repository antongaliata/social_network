import React from "react";
import '../style.css'
import {NavLink} from "react-router-dom";
import {authStateType} from "../../redux/app-reducer";
import imgProfile from '../../images/person.png'
import imgMessage from '../../images/message.png'
import imgNews from '../../images/news.png'
import imgUsers from '../../images/people.png'

type NavbarType = {
    myData: authStateType
}


export class Navbar extends React.Component<NavbarType> {

    render() {
        return <div className={'NavbarContainer'}>
            <div className={'navbar'}>
                <NavLink to={`/profile/${this.props.myData.id}`}>
                    <img alt={'profile'} src={imgProfile}/>Profile</NavLink>
                <NavLink to="/friends">
                    <img alt={'friends'} src={imgUsers}/>Friends</NavLink>
                <NavLink to="/message">
                    <img alt={'message'} src={imgMessage}/>Message</NavLink>
                <NavLink to="/users">
                    <img alt={'users'} src={imgUsers}/>Users</NavLink>
                <NavLink to="/news">
                    <img alt={'news'} src={imgNews}/>News</NavLink>
            </div>
        </div>
    }
}
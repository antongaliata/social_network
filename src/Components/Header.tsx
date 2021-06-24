import * as React from "react";
import './style.css'
import {NavLink} from "react-router-dom";

type HeaderType = {
    logOutThunk: () => void
    isAuth: boolean
}


class Header extends React.Component<HeaderType> {


    render() {
        return <div className={'Header'}>
            <div className={'title'}>My social network</div>
            <ul>
                <li>{this.props.isAuth && <NavLink exact to="/">Home</NavLink>}</li>
                {this.props.isAuth ? <NavLink to='/login' onClick={() => {
                    this.props.logOutThunk()
                }}>sign out</NavLink> : <NavLink to={'/login'}>Login</NavLink>}
            </ul>
        </div>

    }
}

export default Header;
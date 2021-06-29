import './style.css';
import Body from "./Body";
import {HeaderContainer} from "./HeaderContainer";
import {NavbarContainer} from "./Navbar/NavbarContainer";
import React from "react";
import {connect} from "react-redux";
import {stateType} from "../redux/store";
import {authMeThunk} from "../redux/app-reducer";
import Login from "./Login/Login";
import {Redirect, Route} from "react-router-dom";
import Preloader from "./Preloader/Preloader";
import {getSubscribedThunk} from "../redux/users-reducer";
import {formDialogsThunk} from "../redux/dialogs-reducer";


type AppType = {
    isLoading: boolean
    authMeThunk: () => void
    myId: number | null
    isAuth: boolean
    formDialogsThunk: () => void
}

class App extends React.Component<AppType> {

    componentDidMount() {
        this.props.authMeThunk()
    }

    render() {
        return (
            <div className="App">
                <HeaderContainer isAuth={this.props.isAuth}/>
                {this.props.isLoading ? <div className={'wrapper_preloader'}><Preloader/></div> :
                    <div className={'wrapper_navbar_and_body'}>
                        <NavbarContainer/>
                        {this.props.isAuth ? <Body isLoading={this.props.isLoading} myId={this.props.myId}/> :
                            <Redirect to={'/login'}/>}
                        <Route path={'/login'}><Login/></Route>
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = (state: stateType) => {
    return {
        isLoading: state.app.loadingStatus,
        myId: state.app.id,
        isAuth: state.app.isAuth
    }
}

export default connect(mapStateToProps, {authMeThunk, getSubscribedThunk, formDialogsThunk})(App);


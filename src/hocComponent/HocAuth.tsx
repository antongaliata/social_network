import React from "react";
import {connect} from "react-redux";
import {stateType} from "../redux/store";
import {Redirect} from 'react-router-dom'
import {withRouter} from "react-router";
import {handlerWereRedirectWithAC} from "../redux/app-reducer";
import Preloader from "../Components/Preloader/Preloader";


const mapStateToProps = (state: stateType) => {
    return {isAuth: state.app.isAuth, isLoading: state.app.loadingStatus}
}

export const witchAuthRedirect = (Component: any) => {

    class hocComponent extends React.Component<any, any> {
        componentDidMount() {
            this.props.handlerWereRedirectWithAC(this.props.match.url)
        }

        render() {
            if (this.props.isAuth) {
                return this.props.isLoading ? <Preloader /> : <Component {...this.props}/>
            } else {
                return this.props.isLoading ? <Preloader/> : <Redirect to={'/login'}/>
            }
        }
    }

    return connect(mapStateToProps, {handlerWereRedirectWithAC})(withRouter(hocComponent))
}










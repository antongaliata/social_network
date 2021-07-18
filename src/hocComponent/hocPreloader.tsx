import React from "react";
import {connect} from "react-redux";
import {stateType} from "../redux/store";
import Preloader from "../Components/Preloader/Preloader";


const mapStateToProps = (state: stateType) => {
    return {isLoading: state.dialogs.isLoadingStatusDialog}
}

export const witchPreloader = (Component: any) => {

    class hocComponent extends React.Component<{ isLoading: boolean }, any> {
        render() {
            if (this.props.isLoading) {
                return <Preloader />
            } else {
                return <Component {...this.props}/>
            }
        }
    }

    return connect(mapStateToProps)(hocComponent)
}

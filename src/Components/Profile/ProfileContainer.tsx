import {connect} from "react-redux";
import {stateType} from "../../redux/store";
import Profile from "./Profile";
import {withRouter} from "react-router";
import {
    getStatusThunk,
    getUserThunk,
    updatePhotoThunk,
    updateProfileThunk,
    updateStatusThunk
} from "../../redux/profile-reducer";
import imgEdit from '../../images/edit.png'
import imgNoPhoto from '../../images/gender.png'
import {witchAuthRedirect} from "../../hocComponent/HocAuth";
import {compose} from "redux";


const mapStateToProps = (state: stateType) => {
    return {state: state.profilePage, imgNoPhoto, imgEdit, myId: state.app.id}
}

export const ProfileContainer = compose(
    witchAuthRedirect,
    withRouter,
    connect(mapStateToProps, {
        getUserThunk,
        getStatusThunk,
        updateStatusThunk,
        updatePhotoThunk,
        updateProfileThunk
    }))(Profile)


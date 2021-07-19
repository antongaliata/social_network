import {connect} from "react-redux";
import {stateType} from "../../redux/store";
import Profile from "./Profile";
import {withRouter} from "react-router";
import {
    editModeAC,
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
import {handlerWindowErrorThunk} from "../../redux/app-reducer";
import {followUserThunk, unfollowUserThunk} from "../../redux/users-reducer";
import {handlerFocusNavLinkAC} from "../../redux/app-reducer";
import {handlerFocusUserAC, handlerHideListUsersAC} from "../../redux/dialogs-reducer";

const mapStateToProps = (state: stateType) => {
    return {
        stateProfilePage: state.profilePage,
        imgNoPhoto,
        imgEdit,
        myId: state.app.id,
        showWindowError: state.app.showWindowError,
        usersState: state.users,
        isLoadingApp: state.app.loadingStatus
    }
}

export const ProfileContainer = compose(
    witchAuthRedirect,
    withRouter,
    connect(mapStateToProps, {
        followUserThunk,
        unfollowUserThunk,
        getUserThunk,
        getStatusThunk,
        updateStatusThunk,
        updatePhotoThunk,
        updateProfileThunk,
        editModeAC,
        handlerWindowErrorThunk,
        handlerFocusNavLinkAC,
        handlerFocusUserAC,
        handlerHideListUsersAC
    }))(Profile)

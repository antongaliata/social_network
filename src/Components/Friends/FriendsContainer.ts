import {connect} from "react-redux";
import {Friends} from "./Friends";
import {stateType} from "../../redux/store";
import {
    getSubscribedThunk,
    selectedPageUsersAC,
    unfollowUserInComponentFriendsThunk,
} from "../../redux/users-reducer";
import imgNoPhoto from '../../images/gender.png'
import {handlerFocusNavLinkAC} from "../../redux/app-reducer";

const mapStateToProps = (state: stateType) => {
    return {stateUsers: state.users, imgNoPhoto}
}


export const FriendsContainer = connect(mapStateToProps, {handlerFocusNavLinkAC,getSubscribedThunk,unfollowUserInComponentFriendsThunk, selectedPageUsersAC})(Friends)
import {connect} from "react-redux";
import {Friends} from "./Friends";
import {stateType} from "../../redux/store";
import {getSubscribedThunk, selectedPageUsersAC, unfollowUserThunk} from "../../redux/users-reducer";
import imgNoPhoto from '../../images/gender.png'

const mapStateToProps = (state: stateType) => {
    return {stateUsers: state.users, imgNoPhoto}
}


export const FriendsContainer = connect(mapStateToProps, {getSubscribedThunk,unfollowUserThunk, selectedPageUsersAC})(Friends)
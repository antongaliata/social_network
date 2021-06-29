import {connect} from "react-redux";
import Users from "./Users";
import {stateType} from "../../redux/store";
import {followUserThunk, getStateUsersThunk, selectedPageUsersAC, unfollowUserThunk} from "../../redux/users-reducer";
import imgNoPhoto from '../../images/gender.png'
import {witchAuthRedirect} from "../../hocComponent/HocAuth";
import {compose} from "redux";
import {handlerFocusNavLinkAC, navBarType} from "../../redux/app-reducer";



const mapStateToProps = (state: stateType) => {
    return {usersState: state.users, imgNoPhoto, isAuth: state.app.isAuth}
}

const mapDispatchToProps = (Dispatch: any) => {
    return {
        handlerFocusNavLinkAC: (navLinkFocus: navBarType) => Dispatch(handlerFocusNavLinkAC(navLinkFocus)),
        getUsersThunk: (pageUsers: number, pageSize: number) => Dispatch(getStateUsersThunk(pageUsers, pageSize)),
        selectedPageUsersAC: (page: number) => Dispatch(selectedPageUsersAC(page)),
        followUserThunk: (userID: number) => Dispatch(followUserThunk(userID)),
        unfollowUserThunk: (userID: number) => Dispatch(unfollowUserThunk(userID))
    }
}


export const UsersContainer = compose(
    witchAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(Users)

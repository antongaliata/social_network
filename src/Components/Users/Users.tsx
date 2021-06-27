import './users.css'
import './pagination.css'
import React from "react";
import {usersStateType} from "../../redux/users-reducer";
import {User} from "./User";
import Preloader from "../Preloader/Preloader";
import Paginator from "../Paginator/Paginator";


type usersComponentType = {
    usersState: usersStateType,
    getUsersThunk: (pageUsers: number, pageSize: number) => void
    selectedPageUsersAC: (page: number) => void
    imgNoPhoto: string
    followUserThunk: (idUser: number) => void
    unfollowUserThunk: (idUser: number) => void
    isAuth: boolean
}

export default class Users extends React.Component<usersComponentType> {

    componentDidMount() {
        this.props.getUsersThunk(1, this.props.usersState.pageSize)
    }

    render() {
        return <> {this.props.usersState.loadingStatus && <Preloader/>}
            <div className={'window_users'}>
                <div className={'wrapper_users'}>{this.props.usersState.users.map(user => {
                    return <User user={user} imgNoPhoto={this.props.imgNoPhoto}
                                 followUser={this.props.followUserThunk}
                                 unfollowUser={this.props.unfollowUserThunk}
                                 key={user.id}
                                 disabledButton={this.props.usersState.disabledButton}/>
                })}
                </div>
                <Paginator getUsersThunk={this.props.getUsersThunk} selectedPageUsersAC={this.props.selectedPageUsersAC}
                           quantityPageLength={this.props.usersState.quantityPage.length}
                           pageSize={this.props.usersState.pageSize}
                           updateSubscribers={null}/>
            </div>
        </>
    }

}




















import { usersStateType} from "../../redux/users-reducer";
import React from "react";
import Preloader from "../Preloader/Preloader";
import {User} from "../Users/User";
import '../Users/users.css'
import Paginator from "../Paginator/Paginator";


type FriendsType = {
    stateUsers: usersStateType
    imgNoPhoto: string
    selectedPageUsersAC: (page: number) => void
    getSubscribedThunk: (pageUsers: number, pageSize: number) => void
    unfollowUserThunk: (idUser: number) => void
}

export class Friends extends React.Component<FriendsType> {

    componentDidMount() {
        this.props.getSubscribedThunk(1, 10)
    }

    render() {
        return <> {this.props.stateUsers.loadingStatus && <Preloader/>}

            <div className={'window_users'}>
                <div className={'wrapper_users'}>{this.props.stateUsers.friends.map(friend => {
                    return <User user={friend} imgNoPhoto={this.props.imgNoPhoto}
                                 followUser={null}
                                 unfollowUser={this.props.unfollowUserThunk}
                                 getSubscribed={()=>{this.props.getSubscribedThunk(1,10)}}
                                 key={friend.id}
                                 disabledButton={this.props.stateUsers.disabledButton}/>
                })}
                </div>
                <Paginator getUsersThunk={this.props.getSubscribedThunk} selectedPageUsersAC={this.props.selectedPageUsersAC} quantityPageLength={this.props.stateUsers.quantityPageFriends.length} pageSize={10}/>
            </div>
        </>

    }
}
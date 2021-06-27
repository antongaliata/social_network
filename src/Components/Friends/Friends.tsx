import {usersStateType} from "../../redux/users-reducer";
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
    unfollowUserInComponentFriendsThunk: (idUser: number, pageUsers: number, pageSize: number) => void

}

export class Friends extends React.PureComponent<FriendsType, { numberPage: number }> {
    constructor(props: FriendsType) {
        super(props);
        this.state = {
            numberPage: 1
        }
    }

    componentDidMount() {
        this.props.getSubscribedThunk(1, 10)
    }

    updateSubscribers = (numberPage: number) => {
        this.setState({numberPage: numberPage})
    }

    render() {
        return <> {this.props.stateUsers.loadingStatus && <Preloader/>}
            <div className={'window_users'}>
                <div className={'wrapper_users'}>{this.props.stateUsers.friends.map(friend => {
                    if (friend.followed) {
                        return <User user={friend} imgNoPhoto={this.props.imgNoPhoto}
                                     followUser={null}
                                     unfollowUser={() => {
                                         let page = this.state.numberPage
                                         if (this.props.stateUsers.totalCountFriends <= 11) {
                                             page = 1
                                         }
                                         this.props.unfollowUserInComponentFriendsThunk
                                         (friend.id, page, 10)
                                     }}
                                     key={friend.id}
                                     disabledButton={this.props.stateUsers.disabledButton}/>
                    }
                })}
                </div>
                {this.props.stateUsers.quantityPageFriends.length > 1 &&
                <Paginator getUsersThunk={this.props.getSubscribedThunk}
                           selectedPageUsersAC={this.props.selectedPageUsersAC}
                           quantityPageLength={this.props.stateUsers.quantityPageFriends.length} pageSize={10}
                           updateSubscribers={this.updateSubscribers}/>}
            </div>
        </>
    }
}
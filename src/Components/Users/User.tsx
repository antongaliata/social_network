import React from "react";
import {NavLink} from "react-router-dom";
import {UsersType} from "../../requestAPI/requestAPI";
import {navBarType} from "../../redux/app-reducer";
import ButtonFollowUnfollow from "./ButtonFollowUnfollow";

type UserCardType = {
    user: UsersType
    imgNoPhoto: string
    followUser: ((idUser: number) => void) | null
    unfollowUser: (idUser: number) => void
    handlerFocusNavLinkAC: (navLinkFocus: navBarType) => void
    disabledButton: Array<number>
}


export const User = (props: UserCardType) => {

    return <div className={'user'}>
        <NavLink to={`/profile/${props.user.id}`}
                 className={'navLink_wrapper'}
                 onClick={() => props.handlerFocusNavLinkAC('profile')}>
            <div className={'photo'}>{props.user.photos.small ?
                <img src={props.user.photos.small} alt='photo'/> :
                <img src={props.imgNoPhoto} alt='photo'/>}</div>
            <div className={'name'}><span>{props.user.name}</span></div>
        </NavLink>
            <ButtonFollowUnfollow followUser={props.followUser}
                                  user={props.user}
                                  unfollowUser={props.unfollowUser}
                                  disabledButton={props.disabledButton}/>

    </div>
}




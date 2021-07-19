import './profile.css';
import MyPosts from "./Posts/MyPostsContainer";
import React, {ChangeEvent, PureComponent} from "react";
import {stateProfileType} from "../../redux/profile-reducer";
import Status from "../Status/Status";
import imgCamera from '../../images/camera3.png'
import {InfoProfile} from "./InfoProfile";
import {UpdateProfileType} from "../../requestAPI/requestAPI";
import ButtonFollowUnfollow from "../Users/ButtonFollowUnfollow";
import {usersStateType} from "../../redux/users-reducer";
import '../Users/button.css'
import {NavLink} from "react-router-dom";
import {navBarType} from "../../redux/app-reducer";

type ProfileType = {
    handlerFocusNavLinkAC: (navLinkFocus: navBarType) => void
    handlerFocusUserAC: (isUser: number) => void
    usersState: usersStateType
    followUserThunk: (idUser: number) => void
    unfollowUserThunk: (idUser: number) => void
    getUserThunk: (userID: string, status?: boolean) => void
    getStatusThunk: (userID: number) => void
    updateStatusThunk: (status: string) => void
    stateProfilePage: stateProfileType
    history: any
    location: { pathname: string, search: string, hash: string, state: any, key: string }
    match: { path: string, url: string, isExact: boolean, params: { idUsers: string } }
    imgNoPhoto: string
    imgEdit: string
    myId: number
    updatePhotoThunk: (photoFile: any) => void
    updateProfileThunk: (profile: UpdateProfileType) => void
    editModeAC: (editMode: boolean) => void
    handlerWindowErrorThunk: (error: boolean) => void
    showWindowError: boolean
    isLoadingApp: boolean
    handlerHideListUsersAC: (className: 'list_users' | 'hide_List_users') => void
}

class Profile extends PureComponent<ProfileType> {


    componentDidMount() {
        if (this.props.match.params.idUsers !== String(this.props.myId)) {
            this.props.getUserThunk(this.props.match.params.idUsers)
        }else {
            this.props.getUserThunk(this.props.match.params.idUsers, false)
        }
    }

    componentDidUpdate(prevProps: Readonly<ProfileType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.idUsers !== prevProps.match.params.idUsers) {
            this.props.getUserThunk(this.props.match.params.idUsers)
        }
    }

    changePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            this.props.updatePhotoThunk(e.target.files[0])
        }
    }

    userForButtonFollow = () => {
        const user1 = this.props.usersState.users.find(user => user.id === this.props.stateProfilePage.profile.userId)
        const user2 = this.props.usersState.friends.find(user => user.id === this.props.stateProfilePage.profile.userId)
        return user1 || user2
    }


    render() {
        return <>
            <div className={'Profile'}>
                <div className={'container_info_and_avatar'}>
                    <div className={'container_avatar'}>
                        <div className={'wrapper_avatar'}>{this.props.stateProfilePage.profile.photos.large ?
                            <img src={this.props.stateProfilePage.profile.photos.large} alt={'photo'}/> :
                            <img src={this.props.imgNoPhoto} alt={'photo'}/>}
                        </div>
                        {this.props.stateProfilePage.profile.userId === this.props.myId && <>
                            <div><input id={'change_photo'} type={'file'} onChange={this.changePhoto}/></div>
                            <label htmlFor='change_photo' className={'input_camera'}>
                                <div>
                                    <img src={imgCamera} alt={'camera'}/>
                                </div>
                            </label>
                        </>}

                        {this.props.stateProfilePage.profile.userId !== this.props.myId &&
                        <div className={'wrapper_buttons'}>
                            <div className={'wrapper_butt_message'}>
                                <div className={this.userForButtonFollow()?.followed ?
                                    'butt_follow_or_message' : 'butt_disabled'}>
                                    <NavLink onClick={() => {
                                        if (window.innerWidth < 600) {
                                            this.props.handlerHideListUsersAC('hide_List_users')
                                        }
                                        this.props.handlerFocusNavLinkAC('message')
                                        this.props.handlerFocusUserAC(this.props.stateProfilePage.profile.userId)
                                    }}
                                             to={`/message/dialogs/id/${this.props.stateProfilePage.profile.userId}`}>
                                        Message
                                    </NavLink>
                                </div>
                            </div>
                            <ButtonFollowUnfollow
                                unfollowUser={this.props.unfollowUserThunk}
                                followUser={this.props.followUserThunk}
                                disabledButton={this.props.usersState?.disabledButton}
                                user={this.userForButtonFollow()}/>
                        </div>
                        }</div>

                    <InfoProfile profile={this.props.stateProfilePage.profile}
                                 updateProfile={this.props.updateProfileThunk}
                                 isMyProfile={this.props.myId === this.props.stateProfilePage.profile.userId}
                                 handlerEditMode={this.props.editModeAC}
                                 editMode={this.props.stateProfilePage.editMode}
                                 nameErrorUpdate={this.props.stateProfilePage.nameError}
                                 handlerWindowError={this.props.handlerWindowErrorThunk}
                                 showWindowError={this.props.showWindowError}/>
                </div>
                <div className={'container_posts_and_status'}>
                    <div className={'container_status_and_name'}>
                        <div className={'user_name'}>{this.props.stateProfilePage.profile.fullName}</div>

                        {<Status userId={Number(this.props.match.params.idUsers)}
                                 myId={this.props.myId}
                                 getStatusThunk={this.props.getStatusThunk}
                                 updateStatusThunk={this.props.updateStatusThunk}
                                 status={this.props.stateProfilePage.status}
                                 imgEdit={this.props.imgEdit}/>}</div>

                    <MyPosts photo={this.props.stateProfilePage.profile.photos.small ?
                        this.props.stateProfilePage.profile.photos.small :
                        this.props.imgNoPhoto}
                             showPosts={this.props.stateProfilePage.profile.userId === this.props.myId}/>
                </div>
            </div>
        </>
    }
}


export default Profile;





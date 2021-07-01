import './profile.css';
import MyPosts from "./Posts/MyPostsContainer";
import React, {ChangeEvent, PureComponent} from "react";
import {ProfileUsersType} from "../../redux/profile-reducer";
import Status from "../Status/Status";
import Preloader from "../Preloader/Preloader";
import imgCamera from '../../images/camera3.png'
import {InfoProfile} from "./InfoProfile";
import {UpdateProfileType} from "../../requestAPI/requestAPI";

type ProfileType = {
    getUserThunk: (userID: string) => void
    getStatusThunk: (userID: number) => void
    updateStatusThunk: (status: string) => void
    state: ProfileUsersType
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
}

class Profile extends PureComponent<ProfileType> {


    componentDidMount() {
        this.props.getUserThunk(this.props.match.params.idUsers)
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


    render() {
        return <>{this.props.state.loadingStatus && <Preloader/>}
            <div className={'Profile'}>
                <div className={'container_info_and_avatar'}>
                    <div className={'container_avatar'}>
                        <div className={'wrapper_avatar'}>{this.props.state.profile.photos.large ?
                            <img src={this.props.state.profile.photos.large} alt={'photo'}/> :
                            <img src={this.props.imgNoPhoto} alt={'photo'}/>}
                        </div>
                        {this.props.state.profile.userId === this.props.myId && <>
                            <div><input id={'change_photo'} type={'file'} onChange={this.changePhoto}/></div>
                            <label htmlFor='change_photo' className={'input_camera'}>
                                <div>
                                    <img src={imgCamera} alt={'camera'}/>
                                </div>
                            </label>
                        </>}

                    </div>
                    <InfoProfile profile={this.props.state.profile}
                                 updateProfile={this.props.updateProfileThunk}
                                 isMyProfile={this.props.myId === this.props.state.profile.userId}
                                 handlerEditMode={this.props.editModeAC}
                                 editMode={this.props.state.editMode}
                                 nameErrorUpdate={this.props.state.nameError}
                                 handlerWindowError={this.props.handlerWindowErrorThunk}
                                 showWindowError={this.props.showWindowError}/>
                </div>
                <div className={'container_posts_and_status'}>
                    <div className={'container_status_and_name'}>
                        <div className={'user_name'}>{this.props.state.profile.fullName}</div>
                        {<Status userId={Number(this.props.match.params.idUsers)}
                                 myId={this.props.myId}
                                 getStatusThunk={this.props.getStatusThunk}
                                 updateStatusThunk={this.props.updateStatusThunk}
                                 status={this.props.state.status}
                                 imgEdit={this.props.imgEdit}/>}</div>

                    <MyPosts photo={this.props.state.profile.photos.small ?
                        this.props.state.profile.photos.small :
                        this.props.imgNoPhoto}
                             showPosts={this.props.state.profile.userId === this.props.myId}/>

                </div>
            </div>
        </>
    }
}


export default Profile;





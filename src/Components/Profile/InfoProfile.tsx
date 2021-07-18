import {UpdateProfileType} from "../../requestAPI/requestAPI";
import React, {ChangeEvent, useEffect, useState} from "react";
import './infoProfileStyle.css';
import imgEditInfo from '../../images/edit3.png'
import imgSave from '../../images/save2.png'
import {nameErrorType} from "../../redux/profile-reducer";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type InfoProfileType = {
    profile: UpdateProfileType
    updateProfile: (profile: UpdateProfileType) => void
    isMyProfile: boolean
    nameErrorUpdate: nameErrorType
    handlerEditMode: (editMode: boolean) => void
    editMode: boolean
    handlerWindowError: (error: boolean) => void
    showWindowError: boolean
}


export const InfoProfile = React.memo((props: InfoProfileType) => {
        const [profileForm, setProfileForm] = useState<UpdateProfileType>({
            ...props.profile,
            contacts: {...props.profile.contacts}
        })

        useEffect(() => {
            setProfileForm(props.profile)
        }, [props.profile])


        type keyType = keyof typeof profileForm.contacts
        const contactKeys = Object.keys(profileForm.contacts) as Array<keyType>

        const handlerInput = (e: ChangeEvent<HTMLInputElement>, key: keyType) => {
            setProfileForm({...profileForm, contacts: {...profileForm.contacts, [key]: e.currentTarget.value}})
        }
        const handlerOboutMe = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setProfileForm({...profileForm, aboutMe: e.currentTarget.value})
        }
        const handlerLookingForAJob = (e: ChangeEvent<HTMLInputElement>) => {
            setProfileForm({
                ...profileForm,
                lookingForAJob: e.currentTarget.checked
            })
        }
        const handlerInfoJob = (e: ChangeEvent<HTMLInputElement>) => {
            setProfileForm({
                ...profileForm,
                lookingForAJobDescription: e.currentTarget.value
            })
        }

        const handlerFullName = (e: ChangeEvent<HTMLInputElement>) => {
            setProfileForm({...profileForm, fullName: e.currentTarget.value})
        }

        const updateProfile = () => {
            if (profileForm !== props.profile) {
                props.updateProfile(profileForm)
            }
            if (!props.nameErrorUpdate) {
                props.handlerEditMode(false)
            }
        }


        return <div className={'container_info'}>
            {!props.editMode && <div>
                {props.isMyProfile &&
                <img src={imgEditInfo}
                     alt={'edit'}
                     className={'butt'}
                     onClick={() => props.handlerEditMode(true)}/>}
                <div className={'contacts'}>
                    <span>contacts:</span>
                    {contactKeys.map((key, i) => {
                        if (profileForm.contacts[key])
                            return <div key={i}>{profileForm.contacts[key]}</div>
                    })}
                    <div className={'container_job'}>
                        <span>job:</span>
                        {profileForm.lookingForAJob && <div>{profileForm.lookingForAJobDescription}</div>}
                    </div>
                </div>
                <div className={'container_about'}>
                    <div><span>about:</span>
                        <div className={'text'}>{props.profile.aboutMe}</div>
                    </div>
                </div>
            </div>}

            {props.editMode && <div className={'edit'}>
                {props.isMyProfile
                && <img src={imgSave}
                        alt={'save'}
                        className={'butt'}
                        onClick={updateProfile}/>}

                <div className={'container_edit_fullName'}>
                    <span>full name</span>
                    <input type={'text'}
                           value={profileForm.fullName}
                           onChange={handlerFullName}
                           placeholder={profileForm.fullName}/>
                </div>

                {contactKeys.map((key, i) => {
                    return <input type={'text'}
                                  className={(props.nameErrorUpdate === key && props.showWindowError) ? 'errorContact' : 'noErrorContact'}
                                  onClick={() => props.handlerWindowError(false)}
                                  key={i}
                                  onChange={(e) => handlerInput(e, key)}
                                  value={profileForm.contacts[key] ? profileForm.contacts[key] : ''}
                                  placeholder={key}/>
                })}

                <div className={'container_about_job'}>
                    <div>
                        <input type={'checkbox'}
                               onChange={handlerLookingForAJob}
                               checked={profileForm.lookingForAJob}/>
                        <span>show information about work</span>
                    </div>
                    <input type={'text'}
                           className={'inputText'}
                           value={profileForm.lookingForAJobDescription}
                           onChange={handlerInfoJob}/>
                </div>

                <textarea placeholder={'about'}
                          onChange={handlerOboutMe}
                          value={profileForm.aboutMe ? profileForm.aboutMe : ''}/>
            </div>}
            <ErrorMessage
                handlerWindowError={props.handlerWindowError}
                nameErrorUpdate={props.nameErrorUpdate}
                showWindowError={props.showWindowError}/>
        </div>
    }
)















import {UpdateProfileType} from "../../requestAPI/requestAPI";
import React, {ChangeEvent, useEffect, useState} from "react";
import './infoProfileStyle.css';
import imgEditInfo from '../../images/edit_info.png'
import imgSave from '../../images/save.png'

type InfoProfileType = {
    profile: UpdateProfileType
    updateProfile: (profile: UpdateProfileType) => void
    isMyProfile: boolean
}


export const InfoProfile = React.memo((props: InfoProfileType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
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

    return (<div className={'container_info'}>

        {!editMode && <div>
            {props.isMyProfile &&
            <img src={imgEditInfo} alt={'edit'} className={'butt'} onClick={() => setEditMode(true)}/>}
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
                <div><span>about user:</span>
                    <div className={'text'}>{props.profile.aboutMe}</div>
                </div>
            </div>

        </div>}

        {editMode && <div className={'edit'}>

            {props.isMyProfile && <img src={imgSave} alt={'save'} className={'butt'} onClick={() => {
                if (profileForm !== props.profile) {
                    props.updateProfile(profileForm)
                }
                setEditMode(false)
            }}/>}

            <div className={'container_edit_fullName'}>
                <span>full name</span>
                <input type={'text'} value={profileForm.fullName} onChange={handlerFullName}
                       placeholder={profileForm.fullName}/>
            </div>


            {contactKeys.map((key, i) => {
                return <input type={'text'} key={i} onChange={(e) => handlerInput(e, key)}
                              value={profileForm.contacts[key] ? profileForm.contacts[key] : ''} placeholder={key}/>
            })}

            <div className={'container_about_job'}>
                <div><input type={'checkbox'} onChange={handlerLookingForAJob}
                            checked={profileForm.lookingForAJob}/><span>show information about work</span>
                </div>

                <input type={'text'} className={'inputText'} value={profileForm.lookingForAJobDescription} onChange={handlerInfoJob}/>
            </div>

            <textarea placeholder={'about user'} onChange={handlerOboutMe}
                      value={profileForm.aboutMe ? profileForm.aboutMe : ''}/>

        </div>}

    </div>)
}
)















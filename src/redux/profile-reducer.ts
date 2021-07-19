import {requestAPI, UpdateProfileType} from "../requestAPI/requestAPI";
import {Dispatch} from "redux";
import {handlerPreloaderPagesAC, handlerWindowErrorThunk} from "./app-reducer";


export type photoType = {
    small: string
    large: string
}

export type profileType = {
    aboutMe: string | null
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: photoType
}

export type stateProfileType = {
    profile: profileType
    status: string
    loadingStatus: boolean
    myPhoto: photoType
    myId: number
    nameError: nameErrorType
    editMode: boolean
}
export type nameErrorType = 'github'
    | 'vk'
    | 'facebook'
    | 'instagram'
    | 'twitter'
    | 'website'
    | 'youtube'
    | 'mainLink'
    | ''

type getUserACType = {
    type: 'PROFILE/GET-USER'
    user: profileType
}

type getStatusUserACType = {
    type: 'GET-STATUS'
    status: string | null
}

type updateStatusACType = {
    type: 'UPDATE-STATUS'
    status: string | null
}

type handlerLoadingStatusProfileACType = {
    type: 'PROFILE/LOADING-STATUS'
    loadingStatus: boolean
}
type updatePhotoACType = {
    type: 'PROFILE/UPDATE-PHOTO'
    photos: photoType
}

type getMyIdForProfileType = {
    type: 'PROFILE/GET-MY-ID'
    myId: number
}

type handlerErrorUpdateProfileType = {
    type: 'PROFILE/HANDLER-ERROR-UPDATE'
    error: string
}

type editModeACType = {
    type: 'PROFILE/EDIT-MODE'
    editMode: boolean
}


type actionType = getUserACType
    | getStatusUserACType
    | updateStatusACType
    | handlerLoadingStatusProfileACType
    | updatePhotoACType
    | getMyIdForProfileType
    | handlerErrorUpdateProfileType
    | editModeACType

const initialState: stateProfileType = {
    profile: {
        aboutMe: '',
        userId: 0,
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        contacts: {
            github: '',
            vk: '',
            facebook: '',
            instagram: '',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: '',
        },
        photos: {
            small: '',
            large: '',
        }
    },
    status: '',
    loadingStatus: false,
    myPhoto: {
        small: '',
        large: '',
    },
    myId: 0,
    nameError: '',
    editMode: false
}


export const profileReducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case "PROFILE/GET-MY-ID": {
            return {...state, myId: action.myId}
        }
        case "PROFILE/GET-USER": {
            let myPhoto = {}
            if (state.myId === action.user.userId) {
                myPhoto = action.user.photos
            } else {
                myPhoto = state.myPhoto
            }
            return {
                ...state, profile: {...action.user},
                myPhoto: myPhoto,
                editMode: false,
                nameError: ''
            }
        }
        case "GET-STATUS": {
            return {...state, status: action.status}
        }
        case "UPDATE-STATUS": {
            return {...state, status: action.status}
        }
        case "PROFILE/LOADING-STATUS": {
            return {...state, loadingStatus: action.loadingStatus}
        }
        case "PROFILE/UPDATE-PHOTO": {
            return {...state, profile: {...state.profile, ...action.photos}}
        }
        case "PROFILE/HANDLER-ERROR-UPDATE": {
            const a = action.error.split('')
            const nameError = a.slice(a.indexOf('>') + 1, a.indexOf(')')).join('').toLocaleLowerCase()
            return {...state, nameError, editMode: true}
        }
        case "PROFILE/EDIT-MODE": {
            return {...state, editMode: action.editMode}
        }
        default : {
            return state
        }
    }
}


const getUserAC = (user: profileType): getUserACType => {
    return {type: 'PROFILE/GET-USER', user}
}

const getStatusUserAC = (status: string | null): getStatusUserACType => {
    return {type: 'GET-STATUS', status}
}

const updateStatusAC = (status: string | null): updateStatusACType => {
    return {type: 'UPDATE-STATUS', status}
}

export const handlerLoadingProfileAC = (loadingStatus: boolean): handlerLoadingStatusProfileACType => {
    return {type: 'PROFILE/LOADING-STATUS', loadingStatus}
}

const updatePhotoAC = (photos: photoType): updatePhotoACType => {
    return {type: 'PROFILE/UPDATE-PHOTO', photos}
}

const handlerErrorUpdateProfileAC = (error: string): handlerErrorUpdateProfileType => {
    return {type: 'PROFILE/HANDLER-ERROR-UPDATE', error}
}

export const editModeAC = (editMode: boolean) => {
    return {type: 'PROFILE/EDIT-MODE', editMode}
}


export const getMyIdForProfileAC = (myId: number): getMyIdForProfileType => {
    return {type: 'PROFILE/GET-MY-ID', myId}
}

export const getUserThunk = (userId: string, status = true) => {
    return async (Dispatch: Dispatch) => {
        Dispatch(handlerPreloaderPagesAC(status))
        const response = await requestAPI.getUserPage(userId)
        Dispatch(getUserAC(response.data))
        setTimeout(()=>{
            Dispatch(handlerPreloaderPagesAC(false))
        }, 1000)
    }
}

export const getStatusThunk = (userId: number) => {
    return async (Dispatch: Dispatch) => {
        const response = await requestAPI.getStatus(userId)
        Dispatch(getStatusUserAC(response.data))
    }
}

export const updateStatusThunk = (status: string) => {
    return async (Dispatch: Dispatch) => {
        const response = await requestAPI.updateStatus(status)
        if (!response.data.resultCode) {
            Dispatch(updateStatusAC(status))
        }
    }
}

export const updatePhotoThunk = (photoFile: any) => {
    return async (Dispatch: Dispatch) => {
        const promise = await requestAPI.updatePhoto(photoFile)
        try {
            Dispatch(updatePhotoAC(promise.data.data))
        } catch {
        }
    }
}

export const updateProfileThunk = (profile: UpdateProfileType) => {
    return async (Dispatch: any) => {
        Dispatch(handlerPreloaderPagesAC(true))
        const promise = await requestAPI.updateProfile(profile)
        try {
            if (promise.data.messages[0]) {
                Dispatch(handlerErrorUpdateProfileAC(promise.data.messages[0]))
                setTimeout(()=>{
                    Dispatch(handlerPreloaderPagesAC(false))
                }, 1000)
                Dispatch(handlerWindowErrorThunk(true))
            } else {
                Dispatch(getUserThunk(profile.userId.toString()))
                Dispatch(handlerWindowErrorThunk(false))
            }
        } catch {
            setTimeout(()=>{
                Dispatch(handlerPreloaderPagesAC(false))
            }, 1000)
        }
    }
}













































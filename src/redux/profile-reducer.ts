import {requestAPI, UpdateProfileType} from "../requestAPI/requestAPI";
import {Dispatch} from "redux";


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


export type ProfileUsersType = {
    profile: profileType
    status: string
    loadingStatus: boolean
}

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


type actionType = getUserACType
    | getStatusUserACType
    | updateStatusACType
    | handlerLoadingStatusProfileACType
    | updatePhotoACType

const initialState: ProfileUsersType = {
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
    loadingStatus: false
}


export const profileReducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case "PROFILE/GET-USER": {
            return {...state, profile: {...action.user}}
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
            console.log(action.photos)
            return {...state, profile: {...state.profile, ...action.photos}}
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
const handlerLoadingProfileAC = (loadingStatus: boolean): handlerLoadingStatusProfileACType => {
    return {type: 'PROFILE/LOADING-STATUS', loadingStatus}
}

const updatePhotoAC = (photos: photoType): updatePhotoACType => {
    return {type: 'PROFILE/UPDATE-PHOTO', photos}
}


export const getUserThunk = (userId: string) => {
    return async (Dispatch: Dispatch) => {
        Dispatch(handlerLoadingProfileAC(true))
        const response = await requestAPI.getUserPage(userId)
        Dispatch(getUserAC(response.data))
        Dispatch(handlerLoadingProfileAC(false))
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
            console.log(promise)
        }
    }
}


export const updateProfileThunk = (profile: UpdateProfileType) => {

    return async (Dispatch: any)=>{
        Dispatch(handlerLoadingProfileAC(true))
        const promise = await requestAPI.updateProfile(profile)
        try {
            console.log(promise)
            Dispatch(getUserThunk(profile.userId.toString()))
        }catch{
            Dispatch(handlerLoadingProfileAC(false))
            console.log('catch')
            console.log(promise)
        }
    }
}













































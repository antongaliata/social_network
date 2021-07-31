import {Dispatch} from "redux";
import {authType, requestAPI} from "../requestAPI/requestAPI";
import {getMyIdForProfileAC, getUserThunk, photoType} from "./profile-reducer";


export type LoginType = { email: string, password: string, RememberMe: boolean }

type authMeACType = {
    type: 'AUTH-ME'
    authState: authType | null
    isAuth: boolean
}

type handlerWereRedirectWithACType = {
    type: 'WERE-REDIRECTED'
    wereRedirectWith: string
}

type handlerPreloaderACType = {
    type: 'APP/LOADING-STATUS'
    loadingStatus: boolean
}

type handlerPreloaderPagesACType = {
    type: 'APP/LOADING-STATUS-PAGES'
    loadingStatusPages: boolean
}

type loginErrorACType = {
    type: 'LOGIN-ERROR'
    messagesError: Array<string>
}

type handlerFocusNavLinkACType = {
    type: 'APP-NAV/FOCUS-NAV'
    navLinkFocus: navBarType
}

type windowErrorACType = {
    type: 'APP/WINDOW-ERROR'
    error: boolean
}
type openCloseMenuBurgerACType = {
    type: 'APP/OPEN-CLOSE-MENU'
    isOpen: boolean
}


type actionType = authMeACType |
    handlerWereRedirectWithACType |
    handlerPreloaderACType |
    loginErrorACType |
    handlerFocusNavLinkACType |
    windowErrorACType |
    openCloseMenuBurgerACType|
    handlerPreloaderPagesACType

export type navBarType = 'profile' | 'friends' | 'message' | 'users' | 'news' | 'chat'
export type authStateType = {
    id: number
    email: string | null
    login: string | null
    isAuth: boolean
    wereRedirectWith: string
    loadingStatus: boolean
    loadingStatusPages: boolean
    loginMessageError: Array<string>
    navBarFocus: navBarType
    myPhoto: photoType
    showWindowError: boolean
    isOpenMenuBurger: boolean
}


const initialState: authStateType = {
    id: 0,
    email: null,
    login: null,
    isAuth: false,
    wereRedirectWith: '',
    loadingStatus: false,
    loadingStatusPages: false,
    loginMessageError: [],
    navBarFocus: 'profile',
    myPhoto: {small: '', large: ''},
    showWindowError: false,
    isOpenMenuBurger: false
}

export const appReducer = (state = initialState, action: actionType) => {

    switch (action.type) {
        case "AUTH-ME": {
            if (action.isAuth) {
                return {
                    ...state,
                    ...action.authState,
                    isAuth: action.isAuth,
                }
            } else {
                return {...state, isAuth: action.isAuth}
            }
        }
        case "WERE-REDIRECTED": {
            return {...state, wereRedirectWith: action.wereRedirectWith}
        }
        case "APP/LOADING-STATUS": {
            return {...state, loadingStatus: action.loadingStatus}
        }
        case "LOGIN-ERROR": {
            return {...state, loginMessageError: [...action.messagesError]}
        }
        case "APP-NAV/FOCUS-NAV": {
            return {...state, navBarFocus: action.navLinkFocus}
        }
        case "APP/WINDOW-ERROR": {
            return {...state, showWindowError: action.error}
        }
        case "APP/OPEN-CLOSE-MENU": {
            return {...state, isOpenMenuBurger: action.isOpen}
        }
        case "APP/LOADING-STATUS-PAGES": {
            return {...state, loadingStatusPages: action.loadingStatusPages}
        }
        default :
            return state

    }
}


export const openCloseMenuBurgerAC = (isOpen: boolean): openCloseMenuBurgerACType => {
    return {type: "APP/OPEN-CLOSE-MENU", isOpen}
}

const loginErrorAC = (messagesError: Array<string>): loginErrorACType => {
    return {type: 'LOGIN-ERROR', messagesError}
}

const windowErrorAC = (error: boolean): windowErrorACType => {
    return {type: 'APP/WINDOW-ERROR', error}
}

const authMeAC = (authState: authType, isAuth: boolean): authMeACType => {
    return {type: 'AUTH-ME', authState, isAuth}
}

export const handlerWereRedirectWithAC = (wereRedirectWith: string): handlerWereRedirectWithACType => {
    return {type: 'WERE-REDIRECTED', wereRedirectWith}
}


export const handlerPreloaderPagesAC = (loadingStatusPages: boolean): handlerPreloaderPagesACType => {
    return {type: 'APP/LOADING-STATUS-PAGES', loadingStatusPages}
}

export const handlerPreloaderAC = (loadingStatus: boolean): handlerPreloaderACType => {
    return {type: 'APP/LOADING-STATUS', loadingStatus}
}

export const handlerFocusNavLinkAC = (navLinkFocus: navBarType): handlerFocusNavLinkACType => {
    return {type: 'APP-NAV/FOCUS-NAV', navLinkFocus}
}


export const authMeThunk = () => {
    return (Dispatch: any) => {
        Dispatch(handlerPreloaderAC(true))
        requestAPI.authMe()
            .then(res => {
                if (!res.data.resultCode) {
                    Dispatch(authMeAC(res.data.data, true))
                    Dispatch(getMyIdForProfileAC(res.data.data.id))
                    Dispatch(getUserThunk(String(res.data.data.id), false))
                } else {
                    Dispatch(authMeAC(res.data.data, false))
                }
                setTimeout(()=>{
                    Dispatch(handlerPreloaderAC(false))
                }, 2000)
            })
    }
}


export const loginThunk = (log: LoginType) => {
    return (Dispatch: any) => {
        Dispatch(handlerPreloaderAC(true))
        requestAPI.login(log)
            .then(res => {
                if (!res.data.resultCode) {
                    Dispatch(authMeThunk())
                } else {
                    Dispatch(handlerPreloaderAC(false))
                    Dispatch(loginErrorAC(res.data.messages))
                }
            })
    }
}

export const logOutThunk = () => {
    return (Dispatch: any) => {
        Dispatch(handlerPreloaderAC(true))
        requestAPI.logOut()
            .then(res => {
                if (!res.data.resultCode) {
                    Dispatch(authMeThunk())
                } else {
                    Dispatch(handlerPreloaderAC(false))
                }
            })
    }
}

export const handlerWindowErrorThunk = (error: boolean) => {
    return (Dispatch: Dispatch) => {
        Dispatch(windowErrorAC(error))
        if (error) {
            setTimeout(() => {
                Dispatch(windowErrorAC(false))
            }, 5000)
        }
    }
}
























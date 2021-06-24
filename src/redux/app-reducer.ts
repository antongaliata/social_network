import {Dispatch} from "redux";
import {authType, requestAPI} from "../requestAPI/requestAPI";

export type authStateType = {
    id: number
    email: string | null
    login: string | null
    isAuth: boolean
    wereRedirectWith: string
    loadingStatus: boolean
    loginMessageError: Array<string>
}

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


type loginErrorACType = {
    type: 'LOGIN-ERROR'
    messagesError: Array<string>
}


type actionType = authMeACType |
    handlerWereRedirectWithACType |
    handlerPreloaderACType |
    loginErrorACType

const initialState: authStateType = {
    id: 0,
    email: null,
    login: null,
    isAuth: false,
    wereRedirectWith: '',
    loadingStatus: false,
    loginMessageError: []
}

export const appReducer = (state = initialState, action: actionType) => {

    switch (action.type) {
        case "AUTH-ME": {
            if (action.isAuth) {
                return {
                    ...state,
                    ...action.authState,
                    isAuth: action.isAuth
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

        default :
            return state

    }
}

const loginErrorAC = (messagesError: Array<string>): loginErrorACType => {
    return {type: 'LOGIN-ERROR', messagesError}
}

const authMeAC = (authState: authType, isAuth: boolean): authMeACType => {
    return {type: 'AUTH-ME', authState, isAuth}
}

export const handlerWereRedirectWithAC = (wereRedirectWith: string): handlerWereRedirectWithACType => {
    return {type: 'WERE-REDIRECTED', wereRedirectWith}
}

export const handlerPreloaderAC = (loadingStatus: boolean): handlerPreloaderACType => {
    return {type: 'APP/LOADING-STATUS', loadingStatus}
}


export const authMeThunk = () => {

    return (Dispatch: Dispatch) => {
        Dispatch(handlerPreloaderAC(true))
        requestAPI.authMe()
            .then(res => {
                if (!res.data.resultCode) {
                    Dispatch(authMeAC(res.data.data, true))
                } else {
                    console.log(res.data)
                    Dispatch(authMeAC(res.data.data, false))
                }
                Dispatch(handlerPreloaderAC(false))
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



























import {requestAPI, responseUsersType, UsersType} from "../requestAPI/requestAPI";
import {Dispatch} from "redux";
import {handlerPreloaderPagesAC} from "./app-reducer";


type getUsersACType = {
    type: 'USERS/GET-USERS'
    users: responseUsersType<Array<UsersType>>
}

type handlerSubscribedACType = {
    type: 'USERS/GET-SUBSCRIBED'
    users: responseUsersType<Array<UsersType>>
}

type selectedPageUsersACType = {
    type: 'USERS/SELECTED-PAGE'
    page: number
}

type followUserACType = {
    type: 'FOLLOW-USER'
    idUser: number
}

type unfollowUserACType = {
    type: 'UNFOLLOW-USER'
    idUser: number
}
type disabledButtonACType = {
    type: 'USERS/DISABLED-BUTT'
    idUser: number
    disabled: boolean
}

type handlerLoadingStatusAC = {
    type: 'USERS/LOADING-STATUS'
    loadingStatus: boolean
}


type actionType =
    getUsersACType
    | selectedPageUsersACType
    | followUserACType
    | unfollowUserACType
    | disabledButtonACType
    | handlerLoadingStatusAC
    | handlerSubscribedACType


export type usersStateType = {
    users: Array<UsersType>
    friends: Array<UsersType>
    totalCountFriends: number
    totalCount: number
    quantityPage: Array<number>
    quantityPageFriends: Array<number>
    currentPage: number
    pageSize: number
    disabledButton: Array<number>
    loadingStatus: boolean
}


const initialState: usersStateType = {
    users: [],
    friends: [],
    totalCount: 0,
    totalCountFriends: 0,
    quantityPageFriends: [],
    quantityPage: [],
    currentPage: 1,
    pageSize: 10,
    disabledButton: [],
    loadingStatus: false
}


export const usersReducer = (state = initialState, action: actionType) => {

    switch (action.type) {
        case 'USERS/GET-USERS' : {
            const quantityPage = []
            for (let i = 1; i <= Math.ceil(action.users.totalCount / state.pageSize); i++) {
                quantityPage.push(i)
            }
            return {
                ...state,
                users: action.users.items,
                totalCount: action.users.totalCount,
                quantityPage: quantityPage
            }
        }
        case 'USERS/SELECTED-PAGE' : {
            return {
                ...state,
                currentPage: action.page
            }
        }
        case 'FOLLOW-USER': {
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.idUser) {
                        user.followed = true
                    }
                    return user
                }),
                friends: state.friends.map(user => {
                    if (user.id === action.idUser) {
                        user.followed = true
                    }
                    return user
                })
            }
        }
        case 'UNFOLLOW-USER': {
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.idUser) {
                        user.followed = false
                    }
                    return user
                }),
                friends: state.friends.map(user => {
                    if (user.id === action.idUser) {
                        user.followed = false
                    }
                    return user
                })
            }
        }
        case 'USERS/DISABLED-BUTT': {
            if (action.disabled) {
                return {
                    ...state,
                    disabledButton: [...state.disabledButton, action.idUser]
                }
            } else {
                return {
                    ...state,
                    disabledButton: state.disabledButton.map(userId => userId !== action.idUser)
                }
            }
        }
        case 'USERS/LOADING-STATUS': {
            return {...state, loadingStatus: action.loadingStatus}
        }
        case "USERS/GET-SUBSCRIBED": {
            const quantityPage = []
            for (let i = 1; i <= Math.ceil(action.users.totalCount / state.pageSize); i++) {
                quantityPage.push(i)
            }
            return {
                ...state,
                friends: [...action.users.items],
                totalCountFriends: action.users.totalCount,
                quantityPageFriends: quantityPage
            }
        }

        default : {
            return state
        }
    }
}

export const selectedPageUsersAC = (page: number) => {
    return {type: 'USERS/SELECTED-PAGE', page}
}

const handlerLoadingAC = (loadingStatus: boolean) => {
    return {type: 'USERS/LOADING-STATUS', loadingStatus}
}

const getUsersAC = (users: responseUsersType<Array<UsersType>>): getUsersACType => {
    return {type: 'USERS/GET-USERS', users}
}

export const handlerSubscribedAC = (users: responseUsersType<Array<UsersType>>): handlerSubscribedACType => {
    return {type: 'USERS/GET-SUBSCRIBED', users}
}

const followUserAC = (idUser: number): followUserACType => {
    return {type: 'FOLLOW-USER', idUser}
}

const unfollowUserAC = (idUser: number): unfollowUserACType => {
    return {type: "UNFOLLOW-USER", idUser}
}

const disabledButtonAC = (idUser: number, disabled: boolean): disabledButtonACType => {
    return {type: 'USERS/DISABLED-BUTT', idUser, disabled}
}


export const getStateUsersThunk = (pageUsers: number, pageSize: number) => {
    return (Dispatch: Dispatch) => {
        Dispatch(handlerPreloaderPagesAC(true))
        requestAPI.getUsers(pageUsers || 1, pageSize)
            .then(res => {
                Dispatch(getUsersAC(res.data))
                setTimeout(()=>{
                    Dispatch(handlerPreloaderPagesAC(false))
                }, 1000)
            })
    }
}
export const getSubscribedThunk = (pageUsers: number, pageSize: number) => {
    return (Dispatch: Dispatch) => {
        Dispatch(handlerPreloaderPagesAC(true))
        requestAPI.getUsers(pageUsers, pageSize, true)
            .then(res => {
                Dispatch(handlerSubscribedAC(res.data))
                setTimeout(()=>{
                    Dispatch(handlerPreloaderPagesAC(false))
                }, 1000)
            })
    }
}

export const followUserThunk = (idUser: number) => {
    return (Dispatch: Dispatch) => {
        Dispatch(disabledButtonAC(idUser, true))
        requestAPI.subscribeUser(idUser)
            .then(res => {
                if (!res.data.resultCode) {
                    Dispatch(followUserAC(idUser))
                    Dispatch(disabledButtonAC(idUser, false))
                }
            })
    }
}

export const unfollowUserThunk = (idUser: number) => {
    return (Dispatch: Dispatch) => {
        Dispatch(disabledButtonAC(idUser, true))
        requestAPI.unsubscribeUser(idUser)
            .then(res => {
                if (!res.data.resultCode) {
                    Dispatch(unfollowUserAC(idUser))
                    Dispatch(disabledButtonAC(idUser, false))
                }
            })
    }
}


export const unfollowUserInComponentFriendsThunk = (idUser: number, pageUsers: number, pageSize: number) => {
    return (Dispatch: any) => {
        Dispatch(disabledButtonAC(idUser, true))
        requestAPI.unsubscribeUser(idUser)
            .then(res => {
                if (!res.data.resultCode) {
                    Dispatch(unfollowUserAC(idUser))
                    Dispatch(disabledButtonAC(idUser, false))
                    Dispatch(getSubscribedThunk(pageUsers, pageSize))
                }
            })
    }
}










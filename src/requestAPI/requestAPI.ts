import * as axios from 'axios';
import {photoType, profileType} from "../redux/profile-reducer";


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '3a123130-7eae-4888-b422-da332a4d5f0c'
    }
}
const instance = axios.default.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    ...settings
})


type responseType<d> = {
    resultCode: number
    messages: Array<string>
    data: d
}

export type responseUsersType<i> = {
    error: string
    items: i
    totalCount: number
}

export type UsersType = {
    "name": string
    "id": number,
    "photos": {
        "small": string,
        "large": string
    },
    "status": any,
    "followed": boolean
}
export type authType = {
    id: number
    email: string
    login: string
}

export type UpdateProfileType = {
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
}


export const requestAPI = {
    getUsers: (pageNumber: number, pageSize: number, friend: boolean | null = null) => {
        return instance.get<responseUsersType<Array<UsersType>>>(`/users?page=${pageNumber}&count=${pageSize}&friend=${friend}`)
    },
    getUserPage: (userID: string) => {
        return instance.get<profileType>(`/profile/${userID}`)
    },
    subscribeUser: (userId: number) => {
        return instance.post<responseType<{}>>(`/follow/${userId}`)
    },
    unsubscribeUser: (userId: number) => {
        return instance.delete<responseType<{}>>(`/follow/${userId}`)
    },
    authMe: () => {
        return instance.get<responseType<authType>>('/auth/me')
    },
    getStatus: (userId: number) => {
        return instance.get<string>(`/profile/status/${userId}`)
    },
    updateStatus: (status: string) => {
        return instance.put<responseType<{}>>('/profile/status', {status})
    },
    login: (log: { email: string, password: string, RememberMe: boolean }) => {
        return instance.post <responseType<{ userId: number }>>('/auth/login', {...log})
    },
    logOut: () => {
        return instance.delete<responseType<{}>>('/auth/login')
    },
    updatePhoto: (photoFile: any) => {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<responseType<photoType>>('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfile: (profile: UpdateProfileType) => {
        return instance.put<responseType<UpdateProfileType>>('/profile', profile)
    }
}

export const newsAPI = {
    getNews: () => {
        return axios.default.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=004df6a388da448b8ab7cb60bb8fc5d3')
    }

}




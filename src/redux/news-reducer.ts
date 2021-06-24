import {newsAPI} from "../requestAPI/requestAPI";
import {Dispatch} from "redux";

type getNewsACType = {
    type: 'NEWS/GET-NEWS'
    article: Array<articlesType>
}

type handlerLoadingNewsACType = {
    type: 'NEWS/LOADING-STATUS'
    loadingStatus: boolean
}


type actionType = getNewsACType | handlerLoadingNewsACType

export type articlesType = {
    author: string
    content: string
    description: string
    publishedAt: string
    source: {
        id: string
        name: string
    }
    title: string
    url: string
    urlToImage: string
}

export type newsPageType = {
    articles: Array<articlesType>
    loadingStatus: boolean
}

const initialState: newsPageType = {
    articles: [],
    loadingStatus: false
}


export const newsReducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case "NEWS/GET-NEWS": {
            return {...state, articles: [...action.article]}
        }
        case "NEWS/LOADING-STATUS": {
            return {...state, loadingStatus: action.loadingStatus}
        }

        default :
            return state
    }

}


const getNewsAC = (article: Array<articlesType>): getNewsACType => {
    return {type: 'NEWS/GET-NEWS', article}
}
const handlerLoadingNewsAC = (loadingStatus: boolean): handlerLoadingNewsACType => {
    return {type: 'NEWS/LOADING-STATUS', loadingStatus}
}


export const getNewsThunk = () => {

    return async (Dispatch: Dispatch) => {
        Dispatch(handlerLoadingNewsAC(true))
        const promise = await newsAPI.getNews()
        try {
            Dispatch(getNewsAC(promise.data.articles))
            Dispatch(handlerLoadingNewsAC(false))
        } catch {

        }
    }
}









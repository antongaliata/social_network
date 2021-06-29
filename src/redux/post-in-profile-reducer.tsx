import {v1} from "uuid";

export type PostType = {
    id: string,
    message: string,
    like: number
}


export type postsType = {
    posts: Array<PostType>
    textInput: string
}


const textText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'


const initialState: postsType = {
    posts: [{id:'1', like: 0, message: textText},{id:'2', like: 0, message: textText}],
    textInput: ''
}


export const postInProfileReducer = (state = initialState, action: actionType): postsType => {

    switch (action.type) {
        case 'PROFILE/CHANGE-TEXT-INPUT' : {
            const copyState = {...state}
            if (action.text) {
                copyState.textInput = action.text
            } else {
                copyState.textInput = ''
            }
            return copyState
        }
        case 'ADD-POST' : {
            const copyState = {
                ...state,
                posts: [...state.posts]
            }
            copyState.posts.unshift({id: v1(), message: copyState.textInput, like: 0})
            return copyState
        }
        case "POST/DELETE-POST": {
            return {...state, posts: state.posts.filter(post=> post.id !== action.idPost)}
        }

        case 'HANDLER-LIKE' : {
            const copyState = {...state}
            copyState.posts.forEach(post => {
                if (post.id === action.id) {
                    if(post.like){
                        post.like--
                    }else {
                      post.like++
                    }
                }
            })
            return copyState
        }

        default:
            return state

    }
}


type changeTextInputPostACType = {
    type: 'PROFILE/CHANGE-TEXT-INPUT'
    text: string | undefined
}
type addPostACType = {
    type: 'ADD-POST'
}
type handlerLikeACType = {
    type: 'HANDLER-LIKE'
    id: string
}

type deletePostACType = {
    type: 'POST/DELETE-POST'
    idPost: string
}


type actionType = changeTextInputPostACType | addPostACType | handlerLikeACType | deletePostACType


export const changeTextInputPostAC = (text: string | undefined): changeTextInputPostACType => {
    return {type: 'PROFILE/CHANGE-TEXT-INPUT', text}
}

export const addPostAC = (): addPostACType => {
    return {type: 'ADD-POST'}
}

export const deletePostAC = (idPost: string):deletePostACType => {
    return {type: 'POST/DELETE-POST', idPost }
}

export const handlerLikeAC = (id: string): handlerLikeACType => {
    return {type: 'HANDLER-LIKE', id}
}






















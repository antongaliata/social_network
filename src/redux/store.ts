import {applyMiddleware, combineReducers, createStore} from "redux";
import {postInProfileReducer} from "./post-in-profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import thunk from 'redux-thunk'
import {usersReducer} from "./users-reducer";
import {profileReducer} from "./profile-reducer";
import {appReducer} from "./app-reducer";
import {newsReducer} from "./news-reducer";


const rootReducer = combineReducers({
    posts: postInProfileReducer,
    dialogs: dialogsReducer,
    users: usersReducer,
    profilePage: profileReducer,
    app: appReducer,
    news: newsReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))


export type stateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store


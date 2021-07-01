import React from "react";
import Posts from "./Posts";
import {postsType} from "../../../redux/post-in-profile-reducer";

type MyPostsType = {
    onPostChange: (text: string | undefined) => void
    addPost: (text: string | undefined) => void
    posts: postsType
    photo: string
    showPosts: boolean
    handlerLikeAC: (id: string) => void
    deletePostAC: (idPost: string) => void
}


const MyPosts = (props: MyPostsType) => {
    const newPostsElement = React.createRef<HTMLTextAreaElement>()
    const sendEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if(newPostsElement.current?.value){
                props.addPost(newPostsElement.current.value)
            }
        }
    }

    return <div className={'myPostsContainer'}>
            <div className={'wrapper_text_but'}>{props.showPosts && <>
            <textarea placeholder={'what\'s new with you?'}
                      onKeyDown={sendEnter}
                onChange={(e) => {
                props.onPostChange(e.currentTarget.value)
            }} ref={newPostsElement} value={props.posts.textInput}/>
                <button onClick={() => {
                    props.addPost(newPostsElement.current?.value)
                }}>Post
                </button>
            </>}</div>
            <div className={'wrapper_posts'}>
                {props.showPosts && props.posts.posts.map((post => {
                    return <Posts key={post.id}
                                  post={post}
                                  photo={props.photo}
                                  handlerLikeAC={props.handlerLikeAC}
                                  deletePostAC={props.deletePostAC}/>
                }))}
            </div>
    </div>
}


export default MyPosts;


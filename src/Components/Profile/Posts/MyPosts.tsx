import React from "react";
import Post from "./Post";
import {postsType} from "../../../redux/post-in-profile-reducer";
import imgNoPost from '../../../images/NoPost.png'

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
        {props.showPosts && <div className={'wrapper_text_butt'}>{props.showPosts && <>
            <textarea placeholder={'What\'s new with you?'}
                      onKeyDown={sendEnter}
                      onChange={(e) => {
                          props.onPostChange(e.currentTarget.value)
                      }} ref={newPostsElement} value={props.posts.textInput}/>
            <button onClick={() => {
                props.addPost(newPostsElement.current?.value)
            }}>Post
            </button>
        </>}</div>

        }<div className={props.showPosts?'wrapper_posts' : 'wrapper_posts_dont_my_page' }>
            {(!props.posts.posts.length || !props.showPosts) && <div className={'imgNoPost'}>
                <img src={imgNoPost} alt='noPost'/>
                <span>No more posts</span>
            </div>}
            {props.showPosts && props.posts.posts.map((post => {
                return <Post key={post.id}
                             post={post}
                             photo={props.photo}
                             handlerLikeAC={props.handlerLikeAC}
                             deletePostAC={props.deletePostAC}/>
            }))}
        </div>
    </div>
}


export default MyPosts;


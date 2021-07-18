import './posts.css';
import {PostType} from "../../../redux/post-in-profile-reducer";
import like from '../../../images/like2.png'
import dislike from '../../../images/dislike.png'
import deleteImg from '../../../images/delete3.png'


type PostsType = {
    post: PostType
    photo: string
    handlerLikeAC: (id: string) => void
    deletePostAC:(idPost: string)=>void
}

const Post = (props: PostsType) => {

    const inLike = props.post.like

    const onClickLike = () => {
        props.handlerLikeAC(props.post.id)
    }
    const deletePost = ()=>{
        props.deletePostAC(props.post.id)
    }

    return <div className={'post'}>
        <img className={'avatar'} src={props.photo} alt='ava'/>
        <div className={'wrapper_message_like'}>
            <div className={'post_message'}>{props.post.message}</div>
            <div className={'wrapper_post_like'}>
                <div className={inLike ? 'like' : 'dislike'}><div onClick={onClickLike}>
                     <span>Like</span>
                    <img src={inLike ? like : dislike} alt='like'/><span>{props.post.like}</span></div>
                </div>
                <div className={'delete_container'} onClick={deletePost}><span>delete</span><img src={deleteImg} alt='delete'/></div>
            </div>
        </div>
    </div>
}


export default Post;


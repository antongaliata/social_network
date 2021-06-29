import './posts.css';
import {PostType} from "../../../redux/post-in-profile-reducer";
import like from '../../../images/like2.png'
import dislike from '../../../images/dislike.png'


type PostsType = {
    post: PostType
    photo: string
    handlerLikeAC: (id: string) => void
    deletePostAC:(idPost: string)=>void
}

const Posts = (props: PostsType) => {

    const inLike = props.post.like

    const onClickLike = () => {
        props.handlerLikeAC(props.post.id)
    }
    const deletePost = ()=>{
        props.deletePostAC(props.post.id)
    }

    return <div className={'post'}>
        <img className={'avatar'} src={props.photo} alt='ava'/>
        <span className={'delete_post'} onClick={deletePost}>&#10006;</span>
        <div className={'wrapper_message_like'}>
            <div className={'post_message'}>{props.post.message}</div>
            <div className={'wrapper_post_like'}>
                <div className={inLike ? 'like' : 'dislike'}><span onClick={onClickLike}>
                    <img src={inLike ? like : dislike} alt='like'/>{props.post.like}</span>
                </div>
            </div>
        </div>
    </div>
}


export default Posts;


import './posts.css';
import {store} from "../../../redux/store";
import {handlerLikeAC, PostType} from "../../../redux/post-in-profile-reducer";
import like2 from '../../../images/like4.png'
import like from '../../../images/like3.png'
import {Component} from "react";


type PostsType = {
    post: PostType
    photo: string
}

export class Posts extends Component<PostsType, { likeActive: boolean }> {
    constructor(props: PostsType) {
        super(props);
    }


    onClickLike = () => {
        store.dispatch(handlerLikeAC(this.props.post.id))
    }

    render() {

        return <div className={'post'}>
            <img className={'avatar'} src={this.props.photo} alt='ava'/>
            <div className={'wrapper_message_like'}>
                <div className={'post_message'}>{this.props.post.message}</div>
                <div className={'post_like'}><span onClick={this.onClickLike}><img
                    src={this.props.post.like ? like2 : like} alt='like'/></span>{this.props.post.like}
                </div>
            </div>
        </div>
    }
}



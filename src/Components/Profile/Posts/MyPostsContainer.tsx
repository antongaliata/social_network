import React from "react";
import {addPostAC, changeTextInputPostAC, deletePostAC, handlerLikeAC} from "../../../redux/post-in-profile-reducer";
import {stateType} from "../../../redux/store";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";

const mapStateToProps = (state: stateType) => {
    return {posts: state.posts}
}

const mapDispatchToProps = (Dispatch: any) => {
    return {
        onPostChange: (text: string | undefined) => Dispatch(changeTextInputPostAC(text)),
        addPost: (text: string | undefined) => {
            if (text) {
                Dispatch(addPostAC())
                Dispatch(changeTextInputPostAC(''))
            }
        },
        handlerLikeAC: (id: string) => Dispatch(handlerLikeAC(id)),
        deletePostAC: (idPost: string) => Dispatch(deletePostAC(idPost))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
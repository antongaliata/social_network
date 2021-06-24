import React from "react";
import {addPostAC, changeTextInputPostAC} from "../../../redux/post-in-profile-reducer";
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
            } else {
                alert('введите текст')
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
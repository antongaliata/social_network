import './button.css'
import {UsersType} from "../../requestAPI/requestAPI";


export type ButtonType = {
    user: UsersType | undefined
    followUser: ((idUser: number) => void) | null
    unfollowUser: (idUser: number) => void
    disabledButton: Array<number>
}

const ButtonFollowUnfollow = (props: ButtonType) => {
    return <div className={'container_button_user'}>
        {props.user?.followed ?
            <button className={props.disabledButton.some((el) => el === props.user?.id)? 'butt_disabled' : 'butt_unfollow'}
                    disabled={props.disabledButton.some((el) => el === props.user?.id)}
                    onClick={(EventTarget) => {
                        EventTarget.stopPropagation()
                        props.user &&  props.unfollowUser(props.user.id)
                    }}>Unfollow</button> :
            <button className={props.disabledButton.some((el) => el === props.user?.id)? 'butt_disabled' : 'butt_follow_or_message'}
                    disabled={props.disabledButton.some((el) => el === props.user?.id)}
                    onClick={(EventTarget) => {
                        EventTarget.stopPropagation()
                        props.user && props.followUser && props.followUser(props.user.id)
                    }}>Follow</button>}
    </div>
}


export default ButtonFollowUnfollow;
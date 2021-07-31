import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {ProfileContainer} from "./Profile/ProfileContainer";
import {UsersContainer} from "./Users/UsersContainer";
import Preloader from "./Preloader/Preloader";
import {NewsContainer} from "./News/NewsContainer";
import {FriendsContainer} from "./Friends/FriendsContainer";
import DialogsContainer from "./Dialogs/DialogsContainer";
import {ChatPage} from "./Chat/ChatPage";


type bodyType = {
    isLoading: boolean
    myId: number | null
}

const Body = (props: bodyType) => {
    return <div className={'Body'}>
        <Switch>
            {props.isLoading && <Preloader/>}
            <Redirect exact from={'/'} to={`/profile/${props.myId}`}/>
            <Route path={'/profile/:idUsers'}><ProfileContainer/></Route>
            <Route path={'/friends'}><FriendsContainer/></Route>
            <Route path={'/message'}><DialogsContainer/></Route>
            <Route path={'/users'}><UsersContainer/></Route>
            <Route path={'/news'}><NewsContainer/></Route>
            <Route path={'/chat'}><ChatPage/></Route>
        </Switch>
    </div>
}

export default Body;
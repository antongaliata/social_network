import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Dialogs from './Dialogs/DialogsContainer'
import {ProfileContainer} from "./Profile/ProfileContainer";
import {UsersContainer} from "./Users/UsersContainer";
import Preloader from "./Preloader/Preloader";
import {NewsContainer} from "./News/NewsContainer";
import {FriendsContainer} from "./Friends/FriendsContainer";


const Body = (props: { isLoading: boolean, myId: number | null }) => {

    return <div className={'Body'}>
        <Switch>
            {props.isLoading && <Preloader/>}
            <Redirect exact from={'/'} to={`/profile/${props.myId}`}/>
            <Route path={'/profile/:idUsers'}><ProfileContainer/></Route>
            <Route path={'/friends'}><FriendsContainer/></Route>
            <Route path={'/message'}><Dialogs/></Route>
            <Route path={'/users'}><UsersContainer/></Route>
            <Route path={'/news'}><NewsContainer/></Route>
        </Switch>
    </div>
}

export default Body;
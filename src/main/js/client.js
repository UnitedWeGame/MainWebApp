import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";


import Layout from "./pages/Layout";
import LayoutNoSideStatus from "./pages/LayoutNoSideStatus";
import Activity from "./pages/Activity";
import Friends from "./pages/Friends";
import GameInfo from "./pages/GameInfo";
import Library from "./pages/Library";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups";
import GroupSettings from "./pages/GroupSettings";
import Settings from "./pages/Settings";


const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Activity}></IndexRoute>
            <Route path="activity" name="activity" component={Activity}></Route>
            <Route path="friends" name="friends" component={Friends}></Route>
            <Route path="library" name="library" component={Library}></Route>
            <Route path="notifications" component={Notifications}></Route>
            <Route path="settings" name="settings" component={Settings}></Route>
            <Route path="groupSettings" name="groupSettings" component={GroupSettings}></Route>
            <Route path="groupSettings/:groupID" component={GroupSettings} />
        </Route>
        <Route component={LayoutNoSideStatus}>
            <Route path="/game*" component={GameInfo}></Route>
            <Route path="/profile/:userID" name="profile" component={Profile}></Route>
            {/*<Route path="groups" name="groups" component={Groups}></Route>*/}
            <Route path="groups/:groupID" component={Groups} />
        </Route>
    </Router>,
    app);

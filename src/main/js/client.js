import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";


import Layout from "./pages/Layout";
import Activity from "./pages/Activity";
import Groups from "./pages/Groups";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";


const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Activity}></IndexRoute>
            <Route path="activity" name="activity" component={Activity}></Route>
            <Route path="groups" name="groups" component={Groups}></Route>
            <Route path="library" name="library" component={Library}></Route>
            <Route path="profile" name="profile" component={Profile}></Route>
            <Route path="settings" name="settings" component={Settings}></Route>
        </Route>
    </Router>,
    app);

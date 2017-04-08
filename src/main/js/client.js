import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, IndexRoute, hashHistory } from "react-router-dom";

import Layout from "./pages/Layout";
import Groups from "./pages/Groups";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const app = document.getElementById('app');

ReactDOM.render(
    <BrowserRouter history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Profile}></IndexRoute>
            <Route path="groups" component={Groups}></Route>
            <Route path="library" component={Library}></Route>
            <Route path="settings" component={Settings}></Route>
        </Route>
    </BrowserRouter>,
    app);

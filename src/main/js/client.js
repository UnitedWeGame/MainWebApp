import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Profile from "./pages/Profile";

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Profile}>
            <IndexRoute component={Profile}></IndexRoute>
        </Route>
    </Router>,
    app);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, IndexRoute, hashHistory } from "react-router-dom";

import Layout from "./pages/Layout";
import Profile from "./pages/Profile";

const app = document.getElementById('app');

ReactDOM.render(
    <BrowserRouter history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Profile}></IndexRoute>
        </Route>
    </BrowserRouter>,
    app);

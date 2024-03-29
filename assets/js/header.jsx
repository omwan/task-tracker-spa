import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import api from './api';

function Header(props) {
    let {session, loginForm, dispatch} = props;
    let sessionInfo = null;
    let accountInfo = null;

    if (session == null) {
        sessionInfo = <div className="form-inline my-2 login-form">
            <input type="username" placeholder="username"
                   className="form-control"
                   onChange={(ev) => update({username: ev.target.value})}/>
            <input type="password" placeholder="password"
                   className="form-control"
                   onChange={(ev) => update({password: ev.target.value})}/>
            <button className="btn btn-secondary" onClick={login}>Login</button>
        </div>;

        accountInfo = <li className="nav-item">
            <Link className="nav-link" to={"/users/new"}>Create Account</Link>
        </li>;
    } else {
        sessionInfo = <ul className="navbar-nav login-form">
            <li className="nav-item">
                Logged in as {session.username} |&nbsp;
                <a href="javascript:void(0)" onClick={logout}>Logout</a>
            </li>
        </ul>;

        api.fetchUser(session.user_id);
        accountInfo = <li className="nav-item">
            <Link className="nav-link" to={`/users/${session.user_id}`}>My account</Link>
        </li>;
    }

    function login() {
        api.createSession(loginForm.username, loginForm.password);
    }

    function logout() {
        api.deleteSession();
    }

    function update(data) {
        dispatch({
            type: "UPDATE_LOGIN_FORM",
            data: data
        });
    }

    return <nav className="navbar navbar-expand-lg navbar-light bg-white justify-content-between">
        <a className="navbar-brand">Task Tracker</a>
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to={"/"}>Home</Link>
            </li>
            {accountInfo}
        </ul>
        {sessionInfo}
    </nav>;
}

function stateToProps(state) {
    return {
        session: state.session,
        loginForm: state.loginForm
    };
}

export default connect(stateToProps)(Header);

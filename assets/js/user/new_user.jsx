import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import api from '../api';

import UserForm from './user_form';

function NewTask(props) {
    let {userFormSubmitted, dispatch} = props;

    let submitFunction = function (event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let newUser = {};
        formData.forEach(function (value, key) {
            newUser[key] = value;
        });
        api.createUser({user: newUser});
    };

    if (userFormSubmitted) {
        return <Redirect to={"/"}/>
    } else {
        return <UserForm dispatch={dispatch} submitFunction={submitFunction}/>;
    }
}

function stateToProps(state) {
    return {
        user: state.user,
        userFormSubmitted: state.userFormSubmitted
    };
}

export default connect(stateToProps)(NewTask);

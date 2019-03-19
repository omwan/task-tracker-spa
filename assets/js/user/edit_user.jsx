import React from 'react';
import { connect } from 'react-redux';

import UserForm from './user_form';

function EditUser(props) {
    let {user, dispatch} = props;

    let submitFunction = function() {
        console.log("edit user");
    };

    return <UserForm user={user} dispatch={dispatch} submitFunction={submitFunction} />;
}

function stateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(stateToProps)(EditUser);

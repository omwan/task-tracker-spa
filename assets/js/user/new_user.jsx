import React from 'react';
import { connect } from 'react-redux';

import UserForm from './user_form';

function NewUser(props) {
    let {dispatch} = props;

    let submitFunction = function() {
        console.log("ney user");
    };

    return <UserForm user={null} dispatch={dispatch} submitFunction={submitFunction} />;
}

function stateToProps(state) {
    return {};
}

export default connect(stateToProps)(NewUser);
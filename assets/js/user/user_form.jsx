import React from 'react';
import {connect} from 'react-redux';

function UserForm(props) {
    let {user, dispatch, submitFunction} = props;

    function update(data) {
        dispatch({
            type: "UPDATE_USER_FORM",
            data: data
        });
    }

    if (user === null) {
        return <div>Form loading</div>;
    } else {
        return <form onSubmit={submitFunction}>
            <div className="container form-container">
                <div className="form-group row">
                    <label className="control-label col-form-label col-md-2"
                           htmlFor="username">Username</label>
                    <input className="form-control  col-md-4"
                           id="username" name="username" type="text"
                           value={user.username}
                           onChange={(event) => update({username: event.target.value})}/>
                </div>
                <div className="form-group row">
                    <label className="control-label col-form-label col-md-2"
                           htmlFor="password">Password</label>
                    <input className="form-control  col-md-4"
                           id="password" name="password" type="password"
                           value={user.password}
                           onChange={(event) => update({password: event.target.value})}/>
                </div>
                <div className="form-group row">
                    <label className="control-label col-form-label col-md-2"
                           htmlFor="admin">Admin</label>
                    <input className="form-control  col-md-4"
                           id="admin" name="admin" type="checkbox"
                           value={user.admin}
                           checked={user.admin}
                           onChange={(event) => update({admin: event.target.checked})}/>
                </div>
                <div className="form-group row">
                    <button className="btn btn-primary">Save</button>
                </div>
            </div>
        </form>;
    }
}

function stateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(stateToProps)(UserForm);
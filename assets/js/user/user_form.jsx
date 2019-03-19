import React from 'react';

function UserForm(props) {
    let {user, dispatch, submitFunction} = props;

    let passwordDisabled;
    let formValues;

    if (user == null) {
        passwordDisabled = false;
        formValues = {
            username: "",
            password: "",
            admin: false
        };
    } else {
        passwordDisabled = true;
        formValues = user;
    }

    function update(data) {
        dispatch({
            type: "UPDATE_USER_FORM",
            data: data
        })
    }

    return <form onSubmit={submitFunction}>
        <div className="container form-container">
            <div className="form-group row">
                <label className="control-label col-form-label col-md-2"
                       htmlFor="username">Username</label>
                <input className="form-control  col-md-4"
                       id="username" name="username" type="text"
                       value={formValues.username}
                       onChange={(event) => update({username: event.target.value})} />
            </div>

            <div className="form-group row">
                <label className="control-label col-form-label col-md-2"
                       htmlFor="password">Password</label>
                <input className="form-control col-md-4 disabled"
                       id="password" name="password" type="password"
                       disabled={passwordDisabled} value={formValues.password}
                       onChange={(event) => update({password: event.target.value})} />
            </div>

            <div className="form-group row">
                <label className="control-label col-form-label col-md-2"
                       htmlFor="admin">Admin</label>
                <input className="form-control col-md-4"
                       id="admin" name="admin" type="checkbox"
                       value={formValues.admin}
                       onChange={(event) => update({admin: event.target.checked})} />
            </div>

            <div className="form-group row">
                <button className="btn btn-primary">Save</button>
            </div>
        </div>
    </form>;
}

export default UserForm;
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function UserDetail(props) {
    let {user} = props;

    let userDetail;

    if (user == null) {
        userDetail = <div className="col-md-12">
            Not logged in
        </div>;
    } else {
        userDetail = <div className="col-md-12">
            <h2>Account Details</h2>
            <ul>
                <li>
                    <strong>Username: </strong>
                    {user.username}
                </li>
                <li>
                    <strong>Admin: </strong>
                    {JSON.stringify(user.admin)}
                </li>
            </ul>
            <Link to={`/users/${user.id}/edit`}>
                <button className="btn btn-primary">Edit</button>
            </Link>
        </div>;
    }

    return <div className="row">
        {userDetail}
    </div>;
}

function stateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(stateToProps)(UserDetail);
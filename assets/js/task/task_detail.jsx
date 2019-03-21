import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

function TaskDetail(props) {
    let {task} = props;

    let assignee = task && task.user ? task.user.username : "No user assigned";

    if (task !== null) {
        return <div className="col-md-12">
            <h2>Task Details</h2>
            <ul>
                <li>
                    <strong>Name: </strong>
                    {task.name}
                </li>
                <li>
                    <strong>Description: </strong>
                    {task.description}
                </li>
                <li>
                    <strong>Complete: </strong>
                    {JSON.stringify(task.complete)}
                </li>
                <li>
                    <strong>Time spent: </strong>
                    {task.time_spent}
                </li>
                <li>
                    <strong>Assignee: </strong>
                    {assignee}
                </li>
            </ul>
            <Link to={`/tasks/${task.id}/edit`}>
                <button className="btn btn-primary">Edit</button>
            </Link>
            <Link to={`/`}>
                <button className="btn btn-default">Back</button>
            </Link>
        </div>;
    } else {
        return <div>Task not loaded</div>;
    }
}

function stateToProps(state) {
    return {
        task: state.task
    }
}

export default connect(stateToProps)(TaskDetail);

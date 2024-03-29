import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import api from '../api';

function TaskList(props) {
    let {tasks, session, dispatch} = props;

    let taskList = _.map(tasks, function (task, index) {
        return <Task key={index} task={task} session={session} dispatch={dispatch}/>;
    });

    let newTaskButton;

    if (session) {
        newTaskButton = <div className="row">
            <div className="col-md-12">
                <Link to={"/tasks/new"}>
                    <button className="btn btn-primary">New Task</button>
                </Link>
            </div>
        </div>;
    }

    return <div className="row tasks">
        <h2>All Tasks</h2>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Complete</th>
                <th>Time spent</th>
                <th>Assignee</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {taskList}
            </tbody>
        </table>
        {newTaskButton}
    </div>;
}

function Task(props) {
    let {index, task, session, dispatch} = props;

    let assignee;
    if (task.user) {
        assignee = task.user.username;
    } else {
        assignee = "No user assigned";
    }

    let editButton;
    let deleteButton;
    if (session) {
        editButton = <Link to={`/tasks/${task.id}/edit`}>
            <button className="btn btn-default">Edit</button>
        </Link>;
        deleteButton = <button className="btn btn-danger" onClick={() => {
            let confirmed = confirm("Are you sure?");
            if (confirmed) {
                api.deleteTask(task.id, session.token);
            }
        }}>Delete</button>;
    }

    return <tr>
        <td>{task.name}</td>
        <td>{JSON.stringify(task.complete)}</td>
        <td>{task.time_spent}</td>
        <td>
            {assignee}
        </td>
        <td className="text-right">
            <Link to={`/tasks/${task.id}`}>
                <button className="btn btn-default">Show</button>
            </Link>
            {editButton}
            {deleteButton}
        </td>
    </tr>
}

function stateToProps(state) {
    return {
        tasks: state.tasks,
        session: state.session
    };
}

export default connect(stateToProps)(TaskList);

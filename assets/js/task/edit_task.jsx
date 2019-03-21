import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import api from '../api';

import TaskForm from './task_form';

function EditTask(props) {
    let {task, taskFormSubmitted, session, dispatch} = props;

    let submitFunction = function (event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let taskUpdates = {};
        formData.forEach(function (value, key) {
            taskUpdates[key] = value;
        });
        api.updateTask(task.id, {task: task});
    };

    if (task === null) {
        return <div>Loading task details</div>;
    } else if (taskFormSubmitted) {
        return <Redirect to={"/"}/>
    } else {
        return <TaskForm submitFunction={submitFunction.bind(this)}/>;
    }
}

function stateToProps(state) {
    return {
        task: state.task,
        taskFormSubmitted: state.taskFormSubmitted,
        session: state.session
    };
}

export default connect(stateToProps)(EditTask);

import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import api from '../api';

import TaskForm from './task_form';

function NewTask(props) {
    let {task, taskFormSubmitted, dispatch} = props;

    let submitFunction = function (event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let newTask = {};
        formData.forEach(function (value, key) {
            newTask[key] = value;
        });
        api.createTask({task: task});
    };

    if (taskFormSubmitted) {
        return <Redirect to={"/"}/>
    } else {
        return <TaskForm submitFunction={submitFunction}/>;
    }
}

function stateToProps(state) {
    return {
        task: state.task,
        taskFormSubmitted: state.taskFormSubmitted,
    };
}

export default connect(stateToProps)(NewTask);

import React from 'react';
import { connect } from 'react-redux';

import TaskForm from './task_form';

function NewTask(props) {
    let {task, dispatch} = props;

    let submitFunction = function() {
        console.log("new task");
    };

    return <TaskForm task={task} dispatch={dispatch} submitFunction={submitFunction} />;
}

function stateToProps(state) {
    return {
        task: state.task
    };
}

export default connect(stateToProps)(NewTask);

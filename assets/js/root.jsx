import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import {Provider} from 'react-redux';

import api from './api';

import Header from './header';
import TaskList from './task_list';

export default function root_init(node, store) {
    ReactDOM.render(
        <Provider store={store}>
            <Root/>
        </Provider>, node);
}

class Root extends React.Component {
    constructor(props) {
        super(props);

        api.fetchTasks();
    }

    render() {
        return <div>
            <Header/>
            <TaskList/>
        </div>
    }
}

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import api from './api';

import Header from './header';
import TaskList from './task/task_list';
import UserDetail from './user/user_detail';
import NewUser from './user/new_user';
import EditUser from './user/edit_user';

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
            <Router>
                <div>
                    <Header/>
                    <div className="container page-container">
                        <Route path="/" exact={true}
                               render={() => <TaskList/>}/>
                        <Switch>
                            <Route path="/users/new" exact={true}
                                   render={() => <NewUser/>}/>
                            <Route path="/users/:id" exact={true}
                                   render={() => <UserDetail/>}/>
                            <Route path="/users/:id/edit" exact={true}
                                   render={() => <EditUser/>}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    }
}

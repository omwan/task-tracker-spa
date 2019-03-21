import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import api from './api';
import store from './store';

import Header from './header';

import TaskList from './task/task_list';
import TaskDetail from './task/task_detail';
import NewTask from './task/new_task';
import EditTask from './task/edit_task';

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
        api.fetchUsers();

        if (window.session !== null) {
            store.dispatch({
                type: 'NEW_SESSION',
                data: window.session
            });
        }
    }

    render() {
        return <div>
            <Router>
                <div>
                    <Header/>
                    <div className="container page-container">
                        <Route path="/" exact={true}
                               render={() => {
                                   api.fetchTasks();
                                   api.fetchUsers();
                                   store.dispatch({
                                       type: 'TASK_FORM_SUBMITTED',
                                       data: false
                                   });
                                   store.dispatch({
                                       type: 'USER_FORM_SUBMITTED',
                                       data: false
                                   });
                                   return <TaskList/>;
                               }}/>
                        <Switch>
                            <Route path="/users/new" exact={true}
                                   render={() => {
                                       store.dispatch({
                                           type: 'USER_DETAIL',
                                           data: {
                                               username: "",
                                               password: "",
                                               admin: false
                                           }
                                       });
                                       return <NewUser/>;
                                   }}/>
                            <Route path="/users/:id" exact={true}
                                   render={({match}) => {
                                       api.fetchUser(match.params.id);
                                       return <UserDetail/>;
                                   }}/>
                            <Route path="/users/:id/edit" exact={true}
                                   render={({match}) => {
                                       api.fetchUser(match.params.id);
                                       return <EditUser/>;
                                   }}/>
                        </Switch>
                        <Switch>
                            <Route path="/tasks/new" exact={true}
                                   render={() => {
                                       store.dispatch({
                                           type: 'TASK_DETAIL',
                                           data: {
                                               name: "",
                                               description: "",
                                               complete: false,
                                               time_spent: 0,
                                               user: null,
                                               user_id: ""
                                           }
                                       });
                                       return <NewTask/>;
                                   }}/>
                            <Route path="/tasks/:id" exact={true}
                                   render={({match}) => {
                                       api.fetchTask(match.params.id);
                                       return <TaskDetail/>;
                                   }}/>
                            <Route path="/tasks/:id/edit" exact={true}
                                   render={({match}) => {
                                       api.fetchTask(match.params.id);
                                       return <EditTask/>;
                                   }}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    }
}

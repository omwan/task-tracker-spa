import store from './store';
import $ from "jquery";

class Server {
    parseErrorMessage(status, exception) {
        let responseText = JSON.parse(status.responseText).errors;
        console.log(responseText);
        let errors = _.map(responseText, function(value, key) {
            return `${key} ${value}`;
        }).join(" and ");
        alert(`The following fields must be fixed: ${errors}`)
    }

    executeAjax(method, url, headers, data, success, error = this.parseErrorMessage) {
        $.ajax(url, {
            method: method,
            headers: headers,
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: data === "" ? data : JSON.stringify(data),
            success: success,
            error: error
        });
    }

    getData(url, success, error = undefined) {
        this.executeAjax("GET", url, {}, "", success, error);
    }

    postData(url, headers, data, success, error = undefined) {
        this.executeAjax("POST", url, headers, data, success, error);
    }

    putData(url, headers, data, success, error = undefined) {
        this.executeAjax("PUT", url, headers, data, success, error);
    }

    deleteData(url, headers, success, error = undefined) {
        this.executeAjax("DELETE", url, headers, "", success, error);
    }

    createSession(username, password) {
        let successFunction = function (response) {
            store.dispatch({
                type: "NEW_SESSION",
                data: response.data
            });
        };
        let errorFunction = function(status, exception) {
            alert(JSON.parse(status.responseText).error);
        };
        let body = {username, password};
        this.postData("/api/v1/auth", {}, body, successFunction, errorFunction);
    }

    deleteSession() {
        let successFunction = function() {
            store.dispatch({
                type: "DELETE_SESSION",
            });
            store.dispatch({
                type: "USER_LOGGED_OUT",
            });
        };
        this.deleteData("/api/v1/auth", {}, successFunction);
    }

    fetchUsers() {
        let successFunction = function (response) {
            store.dispatch({
                type: 'USER_LIST',
                data: response.data
            });
        };
        this.getData("/api/v1/users", successFunction);
    }

    fetchUser(id) {
        let successFunction = function (response) {
            store.dispatch({
                type: 'USER_DETAIL',
                data: response.data
            });
        };
        this.getData(`/api/v1/users/${id}`, successFunction);
    }

    createUser(body) {
        let successFunction = function(response) {
            store.dispatch({
                type: 'USER_FORM_SUBMITTED',
                data: true
            })
        };
        this.postData("/api/v1/users", {}, body, successFunction);
    }

    fetchTasks() {
        let successFunction = function(response) {
            store.dispatch({
                type: 'TASK_LIST',
                data: response.data
            });
        };
        this.getData("/api/v1/tasks", successFunction);
    }

    fetchTask(id) {
        let successFunction = function (response) {
            store.dispatch({
                type: 'TASK_DETAIL',
                data: response.data
            });
        };
        this.getData(`/api/v1/tasks/${id}`, successFunction);
    }

    updateTask(id, body, token) {
        let successFunction = function (response) {
            store.dispatch({
                type: 'TASK_DETAIL',
                data: response.data
            });
            store.dispatch({
                type: 'TASK_FORM_SUBMITTED',
                data: true
            });
        };
        this.putData(`/api/v1/tasks/${id}`, {"x-auth": token}, body, successFunction);
    }

    createTask(body, token) {
        let successFunction = function(response) {
            store.dispatch({
                type: 'TASK_DETAIL',
                data: response.data
            });
            store.dispatch({
                type: 'TASK_FORM_SUBMITTED',
                data: true
            });
        };
        this.postData("/api/v1/tasks", {"x-auth": token}, body, successFunction);
    }

    deleteTask(id, token) {
        let successFunction = function() {
            store.dispatch({
                type: 'DELETE_TASK',
                taskId: id
            });
        };
        this.deleteData(`/api/v1/tasks/${id}`, {"x-auth": token}, successFunction);
    }
}

export default new Server();

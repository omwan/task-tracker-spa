import store from './store';
import $ from "jquery";

class Server {
    executeAjax(method, url, data, success, error = function(){}) {
        $.ajax(url, {
            method: method,
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: success,
            error: error
        });
    }

    getData(url, success, error = function(){}) {
        this.executeAjax("GET", url, "", success, error);
    }

    postData(url, data, success, error = function(){}) {
        this.executeAjax("POST", url, data, success, error);
    }

    putData(url, data, success, error = function(){}) {
        this.executeAjax("PUT", url, data, success, error);
    }

    deleteData(url, success, error = function(){}) {
        this.executeAjax("DELETE", url, "", success, error)
    }

    createSession(username, password) {
        let successFunction = function (response) {
            store.dispatch({
                type: "NEW_SESSION",
                data: response.data
            });
        };
        let body = {username, password};
        this.postData("/api/v1/auth", body, successFunction);
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
        this.deleteData("/api/v1/auth", successFunction);
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

    updateTask(id, body) {
        let successFunction = function (response) {
            store.dispatch({
                type: 'TASK_DETAIL',
                data: response.data
            });
        };
        this.putData(`/api/v1/tasks/${id}`, body, successFunction);
    }

    createTask(body) {
        let successFunction = function(response) {
            store.dispatch({
                type: 'TASK_DETAIL',
                data: response.data
            });
        };
        this.postData("/api/v1/tasks", body, successFunction);
    }

    deleteTask(id) {
        let successFunction = function() {
            console.log("hey");
            store.dispatch({
                type: 'DELETE_TASK',
                taskId: id
            });
        };
        this.deleteData(`/api/v1/tasks/${id}`, successFunction);
    }
}

export default new Server();

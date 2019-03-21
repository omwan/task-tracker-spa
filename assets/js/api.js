import store from './store';
import $ from "jquery";

class Server {
    createSession(username, password) {
        $.ajax("/api/v1/auth", {
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({username, password}),
            success: function (response) {
                store.dispatch({
                    type: "NEW_SESSION",
                    data: response.data
                });
            }
        })
    }

    fetchTasks() {
        $.ajax("/api/v1/tasks", {
            method: "GET",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: function (response) {
                store.dispatch({
                    type: 'TASK_LIST',
                    data: response.data
                })
            }
        })
    }

    fetchUser(id) {
        $.ajax(`/api/v1/users/${id}`, {
            method: "GET",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: function (response) {
                store.dispatch({
                    type: 'USER_DETAIL',
                    data: response.data
                })
            }
        });
    }

    fetchTask(id) {
        $.ajax(`/api/v1/tasks/${id}`, {
            method: "GET",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: function (response) {
                store.dispatch({
                    type: 'TASK_DETAIL',
                    data: response.data
                })
            }
        });
    }

    updateTask(id, body) {
        $.ajax(`/api/v1/tasks/${id}`, {
            method: "PUT",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(body),
            success: function (response) {
                store.dispatch({
                    type: 'TASK_DETAIL',
                    data: response.data
                })
            }
        })
    }
}

export default new Server();

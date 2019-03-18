import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

export default function root_init(node) {
    let prods = window.products;
    ReactDOM.render(<Root products={prods}/>, node);
}

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginForm: {
                username: "",
                password: ""
            },
            session: null
        };
    }

    updateLoginForm(data) {
        let form = _.assign({}, this.state.loginForm, data);
        this.setState(_.assign({}, this.state, {loginForm: form}))
    }

    login() {
        $.ajax("/api/v1/auth", {
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(this.state.loginForm),
            success: function (response) {
                console.log(response.data);
            }
        })
    }

    render() {
        return <div>
            <Header root={this} session={this.state.session}/>
        </div>
    }
}

function Header(props) {
    let {root, session} = props;
    let sessionInfo = null;

    if (session == null) {
        sessionInfo = <div className="form-inline my-2">
            <input type="username" placeholder="username"
                   onChange={(ev) => root.updateLoginForm({username: ev.target.value})}/>
            <input type="password" placeholder="password"
                   onChange={(ev) => root.updateLoginForm({password: ev.target.value})}/>
            <button className="btn btn-secondary" onClick={() => root.login()}>Login</button>
        </div>;
    } else {
        sessionInfo = <div className="my-2">
            {/*<p>Logged in as {session.user_id}</p>*/}
            <p>Logged in as Olivia</p>
        </div>
    }

    return sessionInfo;
}
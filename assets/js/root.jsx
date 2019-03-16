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
        this.state = {};
    }

    render() {
        return <div>Hello world!</div>
    }
}
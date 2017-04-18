/**
 * Created by admin on 2017/4/18.
 */
var React = require('react');
var ReactDOM = require('react-dom');

var HelloMessage = React.createClass({
    render: function() {
        return <h1>Hello World！</h1>;
    }
});

ReactDOM.render(
    <HelloMessage />,
    document.getElementById('example')
);

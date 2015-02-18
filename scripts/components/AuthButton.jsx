var React = require('react');

var AuthButton = React.createClass({
  authorize: function (e) {
    this.props.startAuth();
    gapi.auth.authorize({client_id: this.props.clientId, scope: this.props.scope, immediate: false}, this.props.onAuth)
  },
  render: function() {
    return (
      <button onClick={this.authorize}>Authorize</button>
    );
  }

});

module.exports = AuthButton;
/** @jsx React.DOM */

'use strict';
var clientId = "1025030226045-5rpe7stvttnv23om79kibb6askb9ap0e.apps.googleusercontent.com";
var apiKey = "AIzaSyAGT4XW0Dpw7xg7k2lG-hU5yodutO3UiLM";
var scopes = "https://www.googleapis.com/auth/calendar.readonly";

var CalendarView = require('./CalendarView.jsx');
var AuthButton = require('./AuthButton.jsx');
var React = require('react'),

    Mycomponent = React.createClass({
      getInitialState: function() {
        return {
          checkingAuth: true
        };
      },
      indicateAuth: function () {
        this.setState({checkingAuth: true})
      },
      authCallback: function (authResult) {
        this.setState({needAuth: !!authResult.error, checkingAuth: false, error: authResult.error})
      },
      componentDidMount: function() {
        var self = this;
        window.handleClientLoad = function () {
          gapi.client.setApiKey(apiKey);
          var args = { client_id: clientId, scope: scopes, immediate: true};
          gapi.auth.authorize(args, self.authCallback);
        }
      },
      renderLoader: function () {
        if (this.state.checkingAuth) {
          return <span><i className="loader">↻</i> Checking auth</span>
        } else {
          return null;
        }
      },
      render: function() {
        debugger
        return (<div>
          {this.renderLoader() }
          {(this.state.error && this.state.error !== 'immediate_failed') && <span className='error'>Error is: {this.state.error}</span>}
          {this.state.needAuth && <AuthButton startAuth={this.indicateAuth} scope={scopes} clientId={clientId} onAuth={this.authCallback} />}
          {!this.state.checkingAuth && !this.state.needAuth && !this.state.errror && <CalendarView />}
        </div>)
      }
    });

module.exports = Mycomponent;

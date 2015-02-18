var React = require('react');
var _ = require('lodash');
var EventView = React.createClass({
  getDefaultProps: function() {
    return {
      events: []
    };
  },
  getInitialState: function() {
    return {
      separate: false
    };
  },
  getAllOrganizers: function () {
    return _(this.props.events).map(function (e) { return e.creator.email}).compact().unique().value()
  },
  renderAllOrganizers: function () {
    return <textarea className='big-list' value={this.getAllOrganizers().join(', ')}></textarea>
  },
  getAllAttendees: function () {
    return _(this.props.events).map(function(e){ return e.attendees}).flatten().map(function (e) { return e && e.email}).compact().unique().value()
  },
  renderAllAttendees: function () {
    return <textarea className='big-list' value={this.getAllAttendees().join(', ')}></textarea>
  },
  getAllGuests: function () {
    return _.union(this.getAllOrganizers(), this.getAllAttendees())
  },
  renderAllGuests: function () {
    return <textarea className='big-list' value={this.getAllGuests().join(', ')}></textarea>
  },
  toggleSeparation: function () {
    this.setState({separate: !this.state.separate});
  },
  renderLists: function () {
    if (!this.props.events.length) {
      return <div>No events here</div>
    }
    if (this.state.separate) {
      return (<div>
        All event creators: {this.renderAllOrganizers()}
        All event attendees: {this.renderAllAttendees()}
      </div>)
    }
    return <div>All event guests {this.renderAllGuests()}</div>
  },
  render: function() {
    return (<div>
        <h1>Got total of {this.props.events.length} events</h1>
        {this.props.events.length == 2500 && <pre>You have exactly 2500 events which is API limit</pre>}
        <label>Separate ogranizers/guests <input type="checkbox" onClick={this.toggleSeparation} /></label>

        {this.renderLists()}
      </div>

    );
  }

});

module.exports = EventView;
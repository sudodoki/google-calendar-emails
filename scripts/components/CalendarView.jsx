var React = require('react');
var EventView = require('./EventView.jsx');
var CalendarView = React.createClass({
  getInitialState: function() {
    return {
      items: {},
      progress: {},
      calendars: []
    };
  },
  componentDidMount: function() {
    var self = this;
    gapi.client.load("calendar", "v3").then(function () {
      var calendar = gapi.client.calendar
      calendar.calendarList.list().then(function (response) { 
        self.setState({calendars: response.result.items})
      });
    })
  },

  getDataByCalendar: function (id) {
    var self = this;
    function setProgress(id, state) {
      self.state.progress[id] = state
      self.setState({progress: self.state.progress})
    }
    this.setState({selectedCal: id})
    if (this.state.progress[id]) {
      this.setState({selectedItems: this.state.items[id]})
      return null
    }
    setProgress(id, 'loading')
    gapi.client.calendar.events.list({
        'calendarId': id
      }).then(function (response) {
        setProgress(id, 'loaded')
        var curItems = response.result.items
        self.state.items[id] = curItems
        self.setState({selectedItems: curItems, items: self.state.items})
        console.log(curItems);
      });
  },
  renderStatus: function (id) {
    var map = {
      'loading': <i title='Loading' className="loader">↻</i>,
      'loaded': <i title='Loaded the info on this'>✓</i>,
      'none': <i title='Click to load'>?</i>
    }, state = this.state.progress[id] || 'none'

    return <span>({map[state]}) </span>
  },
  renderCalendar: function (calItem) {
    return <li onClick={this.getDataByCalendar.bind(this, calItem.id)} 
               className={"calendar-item " + (this.state.selectedCal === calItem.id ? 'calendar-selected' : '')}
               title={'id is ' + calItem.id}>
               {this.renderStatus(calItem.id)}
               {calItem.summary} ({calItem.timeZone})</li>

  },
  render: function() {
    return (<div>
      <h1>Your calendars</h1>
      <ul className="calendar">
      {this.state.calendars.map(this.renderCalendar)}
      </ul>
      {this.state.selectedItems && <EventView events={this.state.selectedItems} />}
    </div>);
  }

});

module.exports = CalendarView;
import React, {Component} from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.clockTimeId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.clockTimeId);
  }

  tick() {
    this.setState({date: new Date()});
  }

  render() {
    const {date} = this.state;
    const day = date.toString().substr(0, 10);
    const time = date.toString().substr(15, 6);
    return (
      <div>
        <h3>{day}</h3>
        <h1>{time}</h1>
      </div>
    );
  }
}

export default Clock;

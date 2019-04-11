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
    return (
      <div>
        <h1>
          {`${date.toISOString().substr(11, 5)}`}
        </h1>
      </div>
    );
  }
}

export default Clock;

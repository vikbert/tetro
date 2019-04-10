import React, {Component} from 'react';
import styles from './Clock.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timeId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  tick() {
    this.setState({date: new Date()});
  }

  render() {
    const {date} = this.state;
    return (
      <div className={styles.time}>
        {`${date.toISOString().substr(11, 5)}`}
      </div>
    );
  }
}

export default Clock;

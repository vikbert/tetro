import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './Component.css';
import routes from "../constants/routes";

class Timer extends Component {
  static clearAllIntervals () {
    const maxIntervalId = window.setTimeout(() => false, 0);
    for (let index = 0; index < maxIntervalId; index += 1) {
      window.clearTimeout(index);
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isPaused: props.isPaused,
    };
  }

  triggerCountDown() {
    this.timerId = setInterval(() => this.countDown(), 1000);
  };

  countDown() {
    const {decrement, seconds} = this.props;

    if (seconds === 0) {
      Timer.clearAllIntervals();
      this.setState({
        isPaused: false
      });
      return;
    }

    decrement(this.timerId);
  };

  onTogglePause = e => {
    e.preventDefault();

    const {isPaused} = this.state;
    this.setState({isPaused: !isPaused});
    if (isPaused === true) {
      clearInterval(this.timerId);
    } else {
      this.triggerCountDown();
    }
  };

  onReset = e => {
    e.preventDefault();
    const {reset} = this.props;
    this.setState({
      isPaused: false,
    });
    reset(this.timerId);
    clearInterval(this.timerId);
  };

  render() {
    const current = new Date(null);
    const {seconds, isCompleted} = this.props;
    const {isPaused} = this.state;

    current.setSeconds(seconds);

    const resetIcon = (isPaused && !isCompleted) ? <i className="far fa-pause-circle"/> : <i className="btn far fa-play-circle"/>;

    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x"/>
          </Link>
        </div>
        <div className={`${styles.container}`} data-tid="counter">
          <h1>
            {current.toISOString().substr(14, 5)}
          </h1>
          <div className="btnGroup">
            <a href="#reset" onClick={this.onReset}>
              <i className="fas fa-ban"/>
            </a>
            <a href="#toggle" onClick={this.onTogglePause}>
              {resetIcon}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  isPaused: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  decrement: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Timer;

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './Component.css';
import routes from "../constants/routes";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: props.seconds,
      isPaused: false,
    };
  }

  triggerCountDown() {
    this.timerId = setInterval(() => this.countDown(), 1000);
  };

  countDown() {
    const {seconds} = this.state;
    if (seconds === 0) {
      clearInterval(this.timerId);
      return;
    }

    this.setState({seconds: seconds - 1});
  };

  handleClickPause = e => {
    e.preventDefault();

    const {isPaused} = this.state;
    this.setState({isPaused: !isPaused});
    if (isPaused === true) {
      clearInterval(this.timerId);
    } else {
      this.triggerCountDown();
    }
  };

  handleClickReset = e => {
    e.preventDefault();
    const {seconds} = this.props;
    this.setState({
      isPaused: false,
      seconds,
    });
    clearInterval(this.timerId);
  };

  render() {
    const current = new Date(null);
    const {seconds, isPaused} = this.state;
    current.setSeconds(seconds);

    const resetIcon = isPaused ? <i className="far fa-pause-circle" /> : <i className="btn far fa-play-circle"/>;

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
            <a href="#stop" onClick={this.handleClickReset}>
              <i className="btn far fa-stop-circle"/>
            </a>
            <a href="#reset" onClick={this.handleClickPause}>
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
};

export default Timer;

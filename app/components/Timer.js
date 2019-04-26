import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './Component.css';
import routes from "../constants/routes";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaused: props.isPaused,
      changeColor: false,
    };
  }

  componentDidUpdate() {
    const {changeColor} = this.state;
    const {isCompleted} = this.props;

    if (changeColor && isCompleted) {
      setTimeout(() => {
        this.setState({changeColor: false});
      }, 8000);
    }
  }

  triggerCountDown() {
    this.timerId = setInterval(() => this.countDown(), 1000);
  };

  countDown() {
    const {decrement, seconds} = this.props;

    if (seconds === 0) {
      this.setState({
        isPaused: false,
        changeColor: true,
      });
    }

    decrement(this.timerId);
  };

  onTogglePause = e => {
    e.preventDefault();

    const {isPaused} = this.state;
    const {pause, start} = this.props;
    const newStatus = !isPaused;

    if (newStatus === true) {
      pause();
    } else {
      start();
      this.triggerCountDown();
    }

    this.setState({isPaused: newStatus});
  };

  onReset = e => {
    e.preventDefault();

    const {reset} = this.props;
    const {selectedSeconds} = this.state;
    this.setState({
      isPaused: false,
    });

    reset(selectedSeconds);
  };

  onClickTimeInterval = (seconds, e) => {
    e.preventDefault();

    const {reset} = this.props;
    this.setState({
      selectedSeconds: seconds,
    });

    reset(seconds);
    clearInterval(this.timerId);
  };

  render() {
    const current = new Date(null);
    const {seconds, init, isCompleted} = this.props;
    const {isPaused, changeColor} = this.state;
    const cssClassContainer = changeColor && isCompleted ? `${styles.container} ${styles.green}` : styles.container;

    current.setSeconds(seconds);

    const toggleIcon = (!isPaused && !isCompleted) ? <i className="far fa-pause-circle fa-3x"/> :
      <i className="btn far fa-play-circle fa-3x"/>;

    return (
      <div className={cssClassContainer} data-tid="counter">
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x"/>
          </Link>
        </div>
        <div>
          <a href="#25" onClick={(e) => this.onClickTimeInterval(1500, e)}>
            <div className={init === 1500 ? `${styles.circle} ${styles.selected}` : styles.circle}>
              <p>25</p>
            </div>
          </a>
          <a href="#10" onClick={(e) => this.onClickTimeInterval(2700, e)}>
            <div className={init === 2700 ? `${styles.circle} ${styles.selected}` : styles.circle}>
              <p>45</p>
            </div>
          </a>
          <a href="#5" onClick={(e) => this.onClickTimeInterval(300, e)}>
            <div className={init === 300 ? `${styles.circle} ${styles.selected}` : styles.circle}>
              <p>5</p>
            </div>
          </a>
          <h1>
            {current.toISOString().substr(14, 5)}
          </h1>
          <div className="btnGroup">
            <a href="#reset" onClick={this.onReset}>
              <i className="fas fa-redo fa-3x"/>
            </a>
            <a href="#toggle" onClick={this.onTogglePause}>
              {toggleIcon}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  init: PropTypes.number.isRequired,
  isPaused: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  decrement: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
};

export default Timer;

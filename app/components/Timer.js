import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './Component.css';
import routes from "../constants/routes";
import {clearAllIntervals} from '../utils/WindowsTimer';

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
    console.log('did updated', changeColor);
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
      clearAllIntervals();
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

  onClickTimeInterval = (value, e) => {
    e.preventDefault();

    const {init} = this.props;
    init(value);
    clearInterval(this.timerId);
  };

  render() {
    const current = new Date(null);
    const {seconds, isCompleted} = this.props;
    const {isPaused, changeColor} = this.state;
    const cssClasses = changeColor && isCompleted ? `${styles.container} ${styles.green}` : styles.container;
    console.log(cssClasses);

    current.setSeconds(seconds);

    const resetIcon = (isPaused && !isCompleted) ? <i className="far fa-pause-circle fa-3x"/> :
      <i className="btn far fa-play-circle fa-3x"/>;

    return (
      <div className={cssClasses} data-tid="counter">
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x"/>
          </Link>
        </div>
        <div>

          <a href="#25" onClick={(e) => this.onClickTimeInterval(1500, e)} >
            <div className={styles.circle} data-seconds="1500">
              <p>25</p>
            </div>
          </a>
          <a href="#10" onClick={(e) => this.onClickTimeInterval(2700, e)}>
            <div className={styles.circle} data-seconds="2700">
              <p>45</p>
            </div>
          </a>
          <a href="#5" onClick={(e) => this.onClickTimeInterval(10, e)}>
            <div className={styles.circle} data-seconds="300">
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
  init: PropTypes.func.isRequired,
};

export default Timer;

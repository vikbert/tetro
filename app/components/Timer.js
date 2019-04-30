import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './Component.css';
import routes from "../constants/routes";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const {decrement, current} = this.props;

    if (current === 0) {
      this.setState({
        isRunning: true,
        changeColor: true,
      });
    }

    decrement(this.timerId);
  };

  onToggleIcon = e => {
    e.preventDefault();

    const {pause, start, isRunning} = this.props;

    if (isRunning) {
      pause();
    } else {
      start();
      this.triggerCountDown();
    }
  };

  onReset = e => {
    e.preventDefault();

    const {reset, init} = this.props;
    console.log(init, reset);
    reset(init);
  };

  onClickTimeInterval = (current, e) => {
    e.preventDefault();

    const {reset} = this.props;

    reset(current);
    clearInterval(this.timerId);
  };

  render() {
    const newDate = new Date(null);
    const {current, init, isCompleted, isRunning} = this.props;
    const {changeColor} = this.state;
    const cssClassContainer = changeColor && isCompleted ? `${styles.container} ${styles.green}` : styles.container;

    newDate.setSeconds(current);

    const toggleIcon = isRunning ? <i className="far fa-pause-circle fa-3x"/> :
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
            {newDate.toISOString().substr(14, 5)}
          </h1>
          <div className="btnGroup">
            <a href="#reset" onClick={this.onReset}>
              <i className="fas fa-redo fa-3x"/>
            </a>
            <a href="#toggle" onClick={this.onToggleIcon}>
              {toggleIcon}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  current: PropTypes.number.isRequired,
  init: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  decrement: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
};

export default Timer;

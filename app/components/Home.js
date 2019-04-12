import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../constants/routes';
import Clock from './Clock';
import styles from './Component.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeColor: !props.isCompleted,
    };
  }

  componentDidUpdate() {

    const {changeColor} = this.state;
    if (changeColor) {
      setTimeout(() => {
        this.setState({changeColor: false});
      }, 8000);
    }
  }

  render() {
    const {changeColor} = this.state;
    const {isCompleted} = this.props;
    const bgStyle = changeColor && isCompleted ? {background: 'green'} : null;

    return (
      <div className={styles.container} data-tid="container" style={bgStyle}>
        <Clock/>
        <br/>
        <Link to={routes.COUNTER}>
          <i className="far fa-clock"/>
        </Link>
      </div>
    );
  }
}

Home.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
};

export default Home;


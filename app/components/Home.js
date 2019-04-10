// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import routes from '../constants/routes';
import Clock from './Clock';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <Clock/>
        <br/>
        <Link to={routes.COUNTER}>
          <i className="far fa-clock" />
        </Link>
      </div>
    );
  }
}

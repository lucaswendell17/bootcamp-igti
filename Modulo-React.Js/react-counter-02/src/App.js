import React, { Component, Fragment } from 'react';
import Counter from './components/Counter/Counter';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Counter value={5} />
        <Counter value={10} />
        <Counter value={25} />
      </Fragment>
    );
  }
}

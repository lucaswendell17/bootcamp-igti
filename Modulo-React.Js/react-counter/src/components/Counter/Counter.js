import React, { Component } from 'react';
import css from './counter.module.css';

export default class Counter extends Component {
  constructor() {
    super();

    this.state = {
      currentCounter: 0,
    };
  }

  handleCounter = (op = 'i') => {
    if (op === 'd') {
      if (this.state.currentCounter <= 0) return;
      this.setState({ currentCounter: --this.state.currentCounter });
    } else {
      this.setState({ currentCounter: ++this.state.currentCounter });
    }
  };

  render() {
    return (
      <div className={css.counterContainer}>
        <button
          onClick={() => this.handleCounter('d')}
          className="waves-effect waves-light btn red darken-4"
        >
          -
        </button>
        <span className={css.counterValue}>{this.state.currentCounter}</span>
        <button
          onClick={this.handleCounter}
          className="waves-effect waves-light btn green darken-4"
        >
          +
        </button>
      </div>
    );
  }
}

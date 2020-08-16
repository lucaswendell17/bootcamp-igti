import React, { Component } from 'react';

import css from './countries.module.css';

export default class Country extends Component {
  render() {
    const { country } = this.props;
    return (
      <div className={`${css.border} ${css.country}`}>
        <img className={css.flag} src={country.flag} alt={country.name} />
        <span className={css.countryName}>{country.name}</span>
      </div>
    );
  }
}

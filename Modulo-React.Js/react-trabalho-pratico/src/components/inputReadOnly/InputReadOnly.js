import React, { Component } from 'react';

export default class InputReadOnly extends Component {
  render() {
    const { value, title, color = 'black' } = this.props;
    return (
      <div className="input-field col s3">
        <input
          disabled
          value={value}
          type="text"
          className="validate"
          style={{ color: color }}
        />
        <label className="active">{title}</label>
      </div>
    );
  }
}

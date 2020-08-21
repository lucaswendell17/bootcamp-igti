import React, { Component } from 'react';

export default class InputReadOnly extends Component {
  render() {
    const { value, title, color = 'black', valuePerc, type } = this.props;
    return (
      <div className="input-field col s3">
        <input
          disabled
          readOnly
          value={`${type !== 'p' ? value : value + ' (' + valuePerc + '%)'}`}
          type="text"
          className="validate"
          style={{ color: color }}
        />
        <label className="active">{title}</label>
      </div>
    );
  }
}

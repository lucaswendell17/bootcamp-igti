import React, { Component } from 'react';

export default class InputFullSalary extends Component {
  handleInputSalary = (event) => {
    const fullSalary = event.target.value;
    this.props.handleChangeSalary(fullSalary);
  };

  render() {
    const { title, value } = this.props;
    return (
      <div className="row">
        <div className="input-field col s12">
          <input
            type="number"
            className="validate"
            value={value}
            onChange={this.handleInputSalary}
          />
          <label className="active">{title}</label>
        </div>
      </div>
    );
  }
}

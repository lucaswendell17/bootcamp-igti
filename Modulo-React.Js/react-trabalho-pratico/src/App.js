import React, { Component } from 'react';
import InputFullSalary from './components/inputFullSalary/InputFullSalary';
import InputReadOnly from './components/inputReadOnly/InputReadOnly';

import {
  calculateSalaryFrom,
  formatNumber,
  calculatePercentage,
} from './helpers/salary';
import ProgressBarSalary from './components/progressBarSalary/ProgressBarSalary';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
      calculations: {
        baseINSS: 0,
        discountINSS: 0,
        baseIRPF: 0,
        discountIRPF: 0,
        netSalary: 0,
      },
      percentage: {
        disInss: 0,
        disIrpf: 0,
        netSalary: 0,
      },
    };
  }

  handleInputSalary = (fullSalary) => {
    this.setState({ fullSalary });
  };

  componentDidUpdate(_, previousState) {
    const { fullSalary: oldSalary } = previousState;
    const { fullSalary: newSalary } = this.state;

    if (oldSalary !== newSalary) {
      const calculations = calculateSalaryFrom(newSalary);
      const percentage = calculatePercentage(calculations);
      this.setState({ calculations });
      this.setState({ percentage });
    }
  }

  render() {
    const { fullSalary, calculations, percentage } = this.state;
    return (
      <div className="container center-align">
        <h1>React Salário</h1>

        <InputFullSalary
          title="Salário Bruto"
          value={fullSalary}
          handleChangeSalary={this.handleInputSalary}
        />

        <div className="row">
          <InputReadOnly
            title="Base INSS"
            value={formatNumber(calculations.baseINSS)}
          />
          <InputReadOnly
            title="Desconto INSS"
            value={formatNumber(calculations.discountINSS)}
            valuePerc={percentage.disInss}
            type="p"
            color="#e67e22"
          />
          <InputReadOnly
            title="Base IRPF"
            value={formatNumber(calculations.baseIRPF)}
          />
          <InputReadOnly
            title="Desconto IRPF"
            value={formatNumber(calculations.discountIRPF)}
            valuePerc={percentage.disIrpf}
            type="p"
            color="#c0392b"
          />
          <InputReadOnly
            title="Salário líquido"
            value={formatNumber(calculations.netSalary)}
            valuePerc={percentage.netSalary}
            type="p"
            color="#16a085"
          />
        </div>
        <div style={styles.bar}>
          <ProgressBarSalary value={percentage.disInss} color="#e67e22" />
          <ProgressBarSalary value={percentage.disIrpf} color="#c0392b" />
          <ProgressBarSalary value={percentage.netSalary} color="#16a085" />
        </div>
      </div>
    );
  }
}

const styles = {
  bar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

import React, { Component } from 'react';
import InputFullSalary from './components/inputFullSalary/InputFullSalary';
import InputReadOnly from './components/inputReadOnly/InputReadOnly';

import {
  calculateSalaryFrom,
  formatNumber,
  calculatePorcentagem,
} from './helpers/salary';
import ProgressBarSalary from './components/progressBarSalary/ProgressBarSalary';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
    };

    this.baseInss = 0;
    this.discountInss = 0;
    this.baseIrpf = 0;
    this.discountIrpf = 0;
    this.netSalary = 0;

    this.percDescInss = 0;
    this.percDescIrpf = 0;
    this.percNetSalary = 0;
  }

  handleInputSalary = (fullSalary) => {
    this.setState({ fullSalary });
  };

  componentDidUpdate() {
    const res = calculateSalaryFrom(this.state.fullSalary);
    this.percDescInss = calculatePorcentagem(
      res.discountINSS,
      res.baseINSS
    ).toFixed(2);
    this.percDescIrpf = calculatePorcentagem(
      res.discountIRPF,
      res.baseINSS
    ).toFixed(2);
    this.baseInss = formatNumber(res.baseINSS);
    this.discountInss = `${formatNumber(res.discountINSS)} ${
      this.percDescInss
    }%`;
    this.baseIrpf = formatNumber(res.baseIRPF);
    this.discountIrpf = `${formatNumber(res.discountIRPF)} ${
      this.percDescIrpf
    }%`;
    this.netSalary = formatNumber(res.netSalary);
    this.percNetSalary = (100 - this.percDescIrpf - this.percDescInss).toFixed(
      2
    );
  }

  render() {
    const { fullSalary } = this.state;
    return (
      <div className="container center-align">
        <h1>React Salário</h1>

        <InputFullSalary
          title="Salário Bruto"
          value={fullSalary}
          handleChangeSalary={this.handleInputSalary}
        />

        <div className="row">
          <InputReadOnly title="Base INSS" value={this.baseInss} />
          <InputReadOnly
            title="Desconto INSS"
            value={this.discountInss}
            color="#e67e22"
          />
          <InputReadOnly title="Base IRPF" value={this.baseIrpf} />
          <InputReadOnly
            title="Desconto IRPF"
            value={this.discountIrpf}
            color="#c0392b"
          />
          <InputReadOnly
            title="Salário líquido"
            value={this.netSalary}
            color="#16a085"
          />
        </div>
        {console.log(this.percDescInss, this.percDescIrpf, this.percNetSalary)}
        <div style={styles.bar}>
          <ProgressBarSalary value={this.percDescInss} color="#e67e22" />
          <ProgressBarSalary value={this.percDescIrpf} color="#c0392b" />
          <ProgressBarSalary value={this.percNetSalary} color="#16a085" />
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

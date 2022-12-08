import React, { Component } from 'react';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
  };

  render() {
    const { value, description } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="description">
            <span>Despesa: </span>
            <input
              type="text-area"
              placeholder="Despesa:"
              value={ description }
              name="description"
            />
          </label>
          <label htmlFor="value">
            <span>Valor: </span>
            <input
              type="number"
              placeholder="Valor da despesa:"
              data-testid="value-input"
              value={ value }
              name="value"
            />
          </label>
          <label htmlFor="currency">
            <select
              data-testid="currency-input"
              name="currency"
            >
              <option value="" hidden selected>Moeda</option>
            </select>
          </label>

        </form>
      </div>
    );
  }
}

export default WalletForm;

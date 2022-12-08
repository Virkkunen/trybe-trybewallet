import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
  };

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
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
              {
                currencies.map((currency) => (
                  <option
                    key={ currency }
                    value={ currency }
                  >
                    {currency}
                  </option>
                ))
              }
            </select>
          </label>

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
};

export default WalletForm;

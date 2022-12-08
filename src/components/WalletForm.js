import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as api from '../services/fetchCurrency';
import { addExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'money',
    tag: 'food',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  clearState = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'money',
      tag: 'food',
    });
  };

  handleSubmit = async (e) => {
    e.preventDefaults();
    const { dispatch } = this.props;

    const currs = await api.fetchRates();
    const expense = {
      id: 0, // descobrir como mudar
      value,
      description,
      currency,
      method,
      tag,
      exchangeRate: currs,
    };
    dispatch(addExpense(expense));
    this.clearState();
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="description">
            <span>Despesa: </span>
            <input
              type="text-area"
              placeholder="Despesa:"
              value={ description }
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((curr) => (
                  <option
                    key={ curr }
                    value={ curr }
                  >
                    {curr}
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="money">Dinheiro</option>
              <option value="credit">Cartão de crédito</option>
              <option value="debit">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="food">Alimentação</option>
              <option value="fun">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);

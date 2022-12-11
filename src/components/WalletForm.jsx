import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as api from '../services/fetchCurrency';
import { addExpense, exitEditor, updateExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    edit: false,
  };

  componentDidUpdate() {
    const { dispatch, expenses, idToEdit, editor } = this.props;
    if (editor) {
      dispatch(exitEditor()); // pra parar o loop

      const {
        value,
        description,
        currency,
        method,
        tag,
      } = expenses.find((exp) => exp.id === idToEdit);

      this.setState({
        value,
        description,
        currency,
        method,
        tag,
        edit: true,
      });
    }
  }

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
      method: 'Dinheiro',
      tag: 'Alimentação',
      edit: false,
    });
  };

  submitNewExpense = async () => {
    const { dispatch, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const currs = await api.fetchRates();
    const expense = {
      id: expenses.length, // ve o tamanho do state global e define como id
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currs,
    };
    dispatch(addExpense(expense));
    this.clearState();
  };

  editExpense = async (id) => {
    const { dispatch, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    let editedExpense = expenses.find((exp) => exp.id === id);
    editedExpense = {
      ...editedExpense,
      value,
      description,
      currency,
      method,
      tag,
    };

    const filteredExpenses = expenses.filter((exp) => exp.id !== id);
    const updatedExpenses = [...filteredExpenses, editedExpense]
      .sort((a, b) => a.id - b.id);
    // console.log(updatedExpenses);
    dispatch(updateExpenses(updatedExpenses));
    this.clearState();
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { edit } = this.state;
    const { idToEdit } = this.props;
    if (!edit) this.submitNewExpense();
    if (edit) this.editExpense(idToEdit);
  };

  render() {
    const { value, description, currency, method, tag, edit } = this.state;
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
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="submit"
          >
            { edit ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
  idToEdit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);

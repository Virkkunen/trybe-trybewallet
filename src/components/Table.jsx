import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, editExpense } from '../redux/actions';

class Table extends Component {
  deleteExpense = (id) => {
    // console.log(id)
    const { expenses, dispatch } = this.props;
    const updatedExpenses = expenses.filter((exp) => exp.id !== id);
    // console.log(updatedExpenses);
    dispatch(removeExpense(updatedExpenses));
  };

  modifyExpense = (id) => {
    const { dispatch } = this.props;
    // resolver isso nas actions
    dispatch(editExpense(id));
  };

  handleClick = (e, id) => {
    // nada ortodoxo isso
    // const rowId = target.parentElement.id;
    if (e.target.name === 'delete') this.deleteExpense(id);
    if (e.target.name === 'edit') this.modifyExpense(id);
  };

  render() {
    const { expenses } = this.props;
    // mapear infos na tabela
    const mapTable = expenses.map(({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    }) => (
      <tr
        key={ id }
      >
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ Number(value).toFixed(2) }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
        <td>{ Number(exchangeRates[currency].ask * value).toFixed(2) }</td>
        <td>Real</td>
        <td id={ id }>
          <button
            name="edit"
            type="button"
            data-testid="edit-btn"
            onClick={ (e) => this.handleClick(e, id) }
          >
            Editar
          </button>
          <button
            name="delete"
            type="button"
            data-testid="delete-btn"
            onClick={ (e) => this.handleClick(e, id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
    //
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {mapTable}
        </tbody>
      </table>
    );
  }
}

Table.defaultProps = {
  expenses: [],
};

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array),
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

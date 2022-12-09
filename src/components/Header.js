import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props; // pegar expenses inteiro
    // reduce pra pegar o total
    const total = expenses
      .reduce((acc, curr) => (
        acc + (curr.value * curr.exchangeRates[curr.currency].ask)
      ), 0);
    return (
      <div>
        <div>
          <span data-testid="email-field">{ email || 0 }</span>
        </div>
        <div>
          <span data-testid="total-field">{ total.toFixed(2) }</span>
        </div>
        <div>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </div>
    );
  }
}

// Header.defaultProps = {
//   total: 0,
//   currency: 'BRL',
// };

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,

};

const mapStateToProps = (state) => ({
  ...state.user,
  // ...state.wallet,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total, currency } = this.props;
    return (
      <div>
        <div>
          <span data-testid="email-field">{ email }</span>
        </div>
        <div>
          <span data-testid="total-field">{total || 0}</span>
        </div>
        <div>
          <span data-testid="header-currency-field">{ currency || 'BRL' }</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Header;

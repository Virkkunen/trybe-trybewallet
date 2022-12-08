import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import * as api from '../services/fetchCurrency';
import { setCurrencies } from '../redux/actions';

class Wallet extends React.Component {
  state = {
    currencies: [],
  };

  componentDidMount() {
    this.getCurrencies();
  }

  currenciesToGlobalState = () => {
    const { dispatch } = this.props;
    const { currencies } = this.state;
    dispatch(setCurrencies(currencies));
  };

  getCurrencies = async () => {
    const currencies = await api.fetchCurrencies();
    this.setState({
      currencies,
    }, this.currenciesToGlobalState);
  };

  render() {
    const { email } = this.props;

    return (
      <div>
        <Header email={ email } />
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);

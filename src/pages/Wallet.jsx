import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import fetchCurrency from '../services/fetchCurrency';
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
    const currencies = await fetchCurrency();
    this.setState({
      currencies,
    }, this.currenciesToGlobalState);
  };

  render() {
    const { email, currencies } = this.props;

    return (
      <div>
        <Header email={ email } />
        <WalletForm currencies={ currencies } />
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
  currencies: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Wallet);

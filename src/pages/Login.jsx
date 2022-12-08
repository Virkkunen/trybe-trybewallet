import React from 'react';
import { connect } from 'react-redux';
import { addUserInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    inputValid: false,
  };

  validateInput = () => {
    const { email, password } = this.state;
    const passwdLength = 6;
    const emailValid = email.match(/[a-zA-Z.\-'0-9]+@[a-zA-Z]+\.[a-z]/);
    const passwdValid = password.length >= passwdLength;
    const valid = emailValid && passwdValid;
    this.setState({ inputValid: valid });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateInput);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;

    const { dispatch } = this.props;
    console.log(email)
    dispatch(addUserInfo(email));
  };

  render() {
    const { email, password, inputValid } = this.state;

    return (
      <div>
        <form
          onSubmit={ this.handleSubmit }
        >
          <label htmlFor="email-input">
            <input
              placeholder="Email: "
              type="email"
              data-testid="email-input"
              value={ email }
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              data-testid="password-input"
              placeholder="Senha: "
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            disabled={ !inputValid }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);

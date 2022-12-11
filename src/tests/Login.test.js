import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do Login', () => {
  const emailInput = 'email-input';
  const passwdInput = 'password-input'; // lint 🙄

  test('Os elementos corretos são exibidos na página', () => {
    // pegar inputs, botão
    renderWithRouterAndRedux(<App />);

    // lembrar que os elementos já tem data-testid pra facilitar
    const emailEl = screen.getByTestId(emailInput);
    const loginBtn = screen.getByRole('button'); // btn não tem id, mas é o único na pagina
    const passwdEl = screen.getByTestId(passwdInput);
    expect(emailEl).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(passwdEl).toBeInTheDocument();
  });

  test('Se o botão Login começa desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    const loginBtn = screen.getByRole('button');
    expect(loginBtn).toBeDisabled();
  });
  // e ai testar validação do botão
  test('Se o botão Login valida corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const email = 'email@domain.net';
    const passwd = '12345678990';
    const emailWrong = 'asdf';
    const passwdWrong = '123';

    const emailEl = screen.getByTestId(emailInput);
    const loginBtn = screen.getByRole('button'); // btn não tem id, mas é o único na pagina
    const passwdEl = screen.getByTestId(passwdInput);

    // user.type, user.clear
    userEvent.type(emailEl, email);
    userEvent.type(passwdEl, passwd);
    expect(loginBtn).toBeEnabled();

    userEvent.clear(emailEl);
    userEvent.type(emailEl, emailWrong);
    expect(loginBtn).toBeDisabled();

    userEvent.clear(emailEl);
    userEvent.clear(passwdEl);
    userEvent.type(emailEl, email);
    userEvent.type(passwdEl, passwdWrong);
    expect(loginBtn).toBeDisabled();
  });

  test('Se o botão Login redireciona pra página correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = 'email@domain.net';
    const passwd = '12345678990';
    const emailEl = screen.getByTestId(emailInput);
    const loginBtn = screen.getByRole('button');
    const passwdEl = screen.getByTestId(passwdInput);

    userEvent.type(emailEl, email);
    userEvent.type(passwdEl, passwd);
    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

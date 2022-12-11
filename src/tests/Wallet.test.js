import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do Login', () => {
  test('Os elementos corretos são exibidos na página', () => {
    // pegar inputs, botão
    renderWithRouterAndRedux(<App />);

    // lembrar que os elementos já tem data-testid pra facilitar
    const emailEl = screen.getByTestId('email-input');
    const loginBtn = screen.getByRole('button'); // btn não tem id, mas é o único na pagina
    const passwdEl = screen.getByTestId('password-input');
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

    const emailEl = screen.getByTestId('email-input');
    const loginBtn = screen.getByRole('button'); // btn não tem id, mas é o único na pagina
    const passwdEl = screen.getByTestId('password-input');
  });
});

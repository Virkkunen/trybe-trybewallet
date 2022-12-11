import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do Wallet', () => {
  const email = 'asd@asd.org';
  const passwd = 'as3dfg2hjkl';

  test('Os elementos corretos são exibidos na página', () => {
    renderWithRouterAndRedux(<App />);
    // repetir o login, pegar os elementos da pagina
    const emailEl = screen.getByTestId('email-input');
    const passwdEl = screen.getByTestId('password-input');
    const loginBtn = screen.getByRole('button');
    userEvent.type(emailEl, email);
    userEvent.type(passwdEl, passwd);
    userEvent.click(loginBtn);

    const emailField = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');
    const currField = screen.getByTestId('header-currency-field');
    const descInput = screen.getByTestId('description-input');
    const valueInput = screen.getByTestId('value-input');
    const currInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addBtn = screen.getByRole('button');

    expect(emailField).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
    expect(currField).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(currInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();
  });

  test('Se os elementos começam com as informações corretas', () => {
    renderWithRouterAndRedux(<App />);
    const emailEl = screen.getByTestId('email-input');
    const passwdEl = screen.getByTestId('password-input');
    const loginBtn = screen.getByRole('button');
    userEvent.type(emailEl, email);
    userEvent.type(passwdEl, passwd);
    userEvent.click(loginBtn);

    const emailField = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');
    const currField = screen.getByTestId('header-currency-field');

    expect(emailField.textContent).toBe(email);
    expect(totalField.textContent).toBe('0.00');
    expect(currField.textContent).toBe('BRL');
  });

  test('Se é possível adicionar despesas', async () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries }); // assim vai direto pra página

    const descInput = screen.getByTestId('description-input');
    const valueInput = screen.getByTestId('value-input');
    const currInput = await screen.getByTestId('currency-input'); // faz fetch
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addBtn = screen.getByRole('button');

    // escolher opções
    const currOption = await screen.findByRole('option', { name: 'CAD' }); // find
    const methodOption = screen.getByRole('option', { name: 'Cartão de débito' });
    const tagOption = screen.getByRole('option', { name: 'Trabalho' });

    act(() => {
      userEvent.type(descInput, 'lorem ipsum');
      userEvent.type(valueInput, '119');
      userEvent.selectOptions(currInput, currOption);
      userEvent.selectOptions(methodInput, methodOption);
      userEvent.selectOptions(tagInput, tagOption);
      userEvent.click(addBtn);
    });
    expect(addBtn).toBeEnabled(); // ja pegou 100% e é isso
  });
});

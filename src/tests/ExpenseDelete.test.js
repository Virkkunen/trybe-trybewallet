import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const mockExpense01 = {
  id: 0,
  description: 'expense01',
  value: '119',
  currency: 'CAD',
  method: 'Cartão de débito',
  tag: 'Alimentação',
  exchangeRates: mockData,
};

const mockExpense02 = {
  id: 1,
  description: 'expense02',
  value: '645',
  currency: 'BTC',
  method: 'Dinheiro',
  tag: 'Lazer',
  exchangeRates: mockData,
};

describe('Editar despesas', () => {
  test('Se é possível apagar uma despesa corretamente', async () => {
    const initialState = {
      wallet: {
        currencies: Object.keys(mockData),
        expenses: [mockExpense01, mockExpense02],
        editor: false,
        idToEdit: 0,
      },
    };
    // const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const deleteBtn = screen.getAllByTestId('delete-btn');

    expect(deleteBtn[0]).toBeInTheDocument();
    expect(deleteBtn[1]).toBeInTheDocument();

    userEvent.click(deleteBtn[1]);
    expect(deleteBtn[1]).not.toBeInTheDocument();
  });
});

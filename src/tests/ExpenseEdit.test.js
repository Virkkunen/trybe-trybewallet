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
  test('Se é possível editar uma despesa corretamente', async () => {
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

    const totalField = screen.getByTestId('total-field');
    const valueInput = screen.getByTestId('value-input');
    const currInput = await screen.findByTestId('currency-input'); // find, fetch
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    const editBtn = screen.getAllByRole('button', { name: /edit/i });
    const currOption = await screen.findByRole('option', { name: 'USD' });

    // por que eu usei valores tão altos?
    expect(totalField.textContent).toBe('95413.53');

    userEvent.click(editBtn[1]);

    expect(addBtn.textContent).toBe('Editar despesa');
    expect(valueInput.value).toBe('645');
    userEvent.clear(valueInput);
    userEvent.type(valueInput, '119');
    userEvent.selectOptions(currInput, currOption);
    userEvent.click(addBtn);

    expect(addBtn.textContent).toBe('Adicionar despesa');
    expect(totalField.textContent).toBe('1012.57');
  });
});

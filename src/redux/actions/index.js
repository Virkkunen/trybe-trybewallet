export const ADD_USER_INFO = 'ADD_USER_INFO';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addUserInfo = (email) => ({
  type: ADD_USER_INFO,
  payload: email,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  payload: currencies,
});

export const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  payload: expenses,
});

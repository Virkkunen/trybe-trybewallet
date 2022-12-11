export const ADD_USER_INFO = 'ADD_USER_INFO';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const EXIT_EDITOR = 'EXIT_EDITOR';

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

export const removeExpense = (expenses) => ({
  type: REMOVE_EXPENSE,
  payload: expenses,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const updateExpenses = (expenses) => ({
  type: UPDATE_EXPENSES,
  payload: expenses,
});

export const exitEditor = () => ({
  type: EXIT_EDITOR,
});

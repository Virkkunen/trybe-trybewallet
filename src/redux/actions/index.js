export const ADD_USER_INFO = 'ADD_USER_INFO';
export const SET_CURRENCIES = 'SET_CURRENCIES';

export const addUserInfo = (email) => ({
  type: ADD_USER_INFO,
  payload: email,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  payload: currencies,
});

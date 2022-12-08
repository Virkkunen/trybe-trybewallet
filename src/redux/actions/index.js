export const ADD_USER_INFO = 'ADD_USER_INFO';

export const addUserInfo = (email) => ({
  type: ADD_USER_INFO,
  payload: email,
});

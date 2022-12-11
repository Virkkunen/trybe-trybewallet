import {
  ADD_EXPENSE, EDIT_EXPENSE, EXIT_EDITOR, REMOVE_EXPENSE, SET_CURRENCIES, UPDATE_EXPENSES,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      editor: false,
      idToEdit: '',
      expenses: action.payload,
    };
  case EXIT_EDITOR:
    return {
      ...state,
      editor: false,
    };
  default: return state;
  }
};

export default wallet;

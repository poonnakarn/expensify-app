import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ADD_EXPENSE (action generator) returns action object
const addExpense = ({
  description = "",
  notes = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: { id: uuid(), description, notes, amount, createdAt }
});
// REMOVE_EXPENSE returns action object
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});
// EDIT_EXPENSE returns action object
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});
// SET_TEXT_FILTER returns action object
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          // if id match then update
          return {
            ...expense,
            ...action.updates //spread out action update object
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// Filters Reducer
const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.text }; // return new 'filter' object
    default:
      return state;
  }
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

// Track all store changes
store.subscribe(() => {
  console.log(store.getState());
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 300 })
);
store.dispatch(removeExpense({ id: expenseOne.expense.id }));

store.dispatch(
  editExpense(expenseTwo.expense.id, { amount: 500, description: "Hot Coffee" })
);

store.dispatch(setTextFilter("rent"));
store.dispatch(setTextFilter());

const demoState = {
  expenses: [
    {
      id: "skfjdskfj;",
      description: "January Rent",
      note: "This is the final payment",
      amount: 54500,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // date or amount
    startDate: undefined,
    endDate: undefined
  }
};

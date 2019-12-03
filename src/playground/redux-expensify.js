import { createStore, combineReducers } from "redux";
import uuid from "uuid";
//
// Expense reducer action generator
//
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

//
// Filters reducer action generator
//
// SET_TEXT_FILTER returns action object
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});
// SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});
// SET_START_DATE
const setStartDate = startDate => ({
  type: "SET_START_DATE",
  startDate
});
// SET_END_DATE
const setEndDate = endDate => ({
  type: "SET_END_DATE",
  endDate
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
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: "amount" };
    case "SORT_BY_DATE":
      return { ...state, sortBy: "date" };
    case "SET_START_DATE":
      return { ...state, startDate: action.startDate };
    case "SET_END_DATE":
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDatte !== "number" || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      }

      if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
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
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
  // console.log(state);
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100, createdAt: -21000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 300, createdAt: -1000 })
);
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(
//   editExpense(expenseTwo.expense.id, { amount: 500, description: "Hot Coffee" })
// );

// store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount()); // amount
// store.dispatch(sortByDate()); // date

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

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

import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  isLoading: false,
  error: null,
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_START':
      return { ...state, isLoading: true, error: null };
    case 'REQUEST_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'SET_EXPENSES':
      return { ...state, isLoading: false, expenses: action.payload };
    case 'ADD_EXPENSE':
      return { ...state, isLoading: false, expenses: [...state.expenses, action.payload] };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        isLoading: false,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        isLoading: false,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const { user } = useAuth();
  const userId = user?.id;

  const handleFailure = (error) => {
    const message = error?.message || 'Đã xảy ra lỗi không xác định.';
    dispatch({ type: 'REQUEST_FAILURE', payload: message });
  };

  const fetchExpenses = useCallback(async () => {
    if (!userId) {
      dispatch({ type: 'SET_EXPENSES', payload: [] });
      return;
    }

    dispatch({ type: 'REQUEST_START' });
    try {
      const data = await api.getExpenses(userId);
      dispatch({ type: 'SET_EXPENSES', payload: data });
    } catch (error) {
      handleFailure(error);
    }
  }, [userId]);

  const addExpense = async (expenseData) => {
    if (!userId) return null;

    dispatch({ type: 'REQUEST_START' });
    try {
      const payload = await api.createExpense({ ...expenseData, userId });
      dispatch({ type: 'ADD_EXPENSE', payload });
      return payload;
    } catch (error) {
      handleFailure(error);
      return null;
    }
  };

  const updateExpense = async (id, expenseData) => {
    dispatch({ type: 'REQUEST_START' });
    try {
      const payload = await api.updateExpense(id, expenseData);
      dispatch({ type: 'UPDATE_EXPENSE', payload });
      return payload;
    } catch (error) {
      handleFailure(error);
      return null;
    }
  };

  const deleteExpense = async (id) => {
    dispatch({ type: 'REQUEST_START' });
    try {
      await api.deleteExpense(id);
      dispatch({ type: 'DELETE_EXPENSE', payload: id });
    } catch (error) {
      handleFailure(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const totalAmount = useMemo(() => {
    return state.expenses.reduce((sum, expense) => {
      const amount = Number(expense.amount) || 0;
      return sum + amount;
    }, 0);
  }, [state.expenses]);

  const categories = useMemo(() => {
    const unique = new Set();
    state.expenses.forEach((expense) => {
      if (expense.category) unique.add(expense.category);
    });
    return Array.from(unique).sort();
  }, [state.expenses]);

  const contextValue = {
    expenses: state.expenses,
    isLoading: state.isLoading,
    error: state.error,
    totalAmount,
    categories,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return <ExpenseContext.Provider value={contextValue}>{children}</ExpenseContext.Provider>;
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used inside ExpenseProvider');
  }
  return context;
};



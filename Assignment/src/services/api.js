//api.js chứa các hàm gọi API tới JSON Server
import axios from 'axios';

// Cấu hình Base URL cho JSON Server
// Giả định JSON Server đang chạy trên cổng 3001 
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

// Expense API - CRUD operations
export const getExpenses = async (userId = null) => {
    try {
        const url = userId ? `/expenses?userId=${userId}` : '/expenses';
        const response = await API.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch expenses');
    }
};

export const getExpenseById = async (id) => {
    try {
        const response = await API.get(`/expenses/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch expense');
    }
};

export const createExpense = async (expenseData) => {
    try {
        const response = await API.post('/expenses', expenseData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create expense');
    }
};

export const updateExpense = async (id, expenseData) => {
    try {
        const response = await API.put(`/expenses/${id}`, expenseData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update expense');
    }
};

export const deleteExpense = async (id) => {
    try {
        await API.delete(`/expenses/${id}`);
        return true;
    } catch (error) {
        throw new Error('Failed to delete expense');
    }
};

// User API - Update user status
export const updateUser = async (id, userData) => {
    try {
        const response = await API.put(`/users/${id}`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};

export const getUserById = async (id) => {
    try {
        const response = await API.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user');
    }
};


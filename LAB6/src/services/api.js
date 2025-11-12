//api.js chứa các hàm gọi API tới JSON Server
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiError = (error, fallbackMessage) => {
  const message = error?.response?.data?.message || error.message || fallbackMessage;
  const err = new Error(message);
  if (error?.response?.status) {
    err.status = error.response.status;
    err.responseStatus = error.response.status;
    err.data = error.response.data;
  }
  throw err;
};

export const getUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch users');
  }
};

export const getUserById = async (id) => {
  try {
    const response = await API.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch user');
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await API.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to update user');
  }
};

export const getPayments = async (userId = null) => {
  try {
    const url = userId ? `/payments?userId=${userId}` : '/payments';
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch payments');
  }
};

export const getPaymentById = async (id) => {
  try {
    const response = await API.get(`/payments/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch payment');
  }
};

export const createPayment = async (paymentData) => {
  try {
    const response = await API.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to create payment');
  }
};

export const updatePayment = async (id, paymentData) => {
  try {
    const response = await API.put(`/payments/${id}`, paymentData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to update payment');
  }
};

export const deletePayment = async (id) => {
  try {
    await API.delete(`/payments/${id}`);
    return true;
  } catch (error) {
    handleApiError(error, 'Failed to delete payment');
  }
};

export const refundPayment = async (id) => {
  try {
    const response = await API.patch(`/payments/${id}`, { status: 'REFUNDED' });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to refund payment');
  }
};


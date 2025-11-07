//PaymentContext.jsx quản lý thanh toán bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

// 1. Tạo Context
const PaymentContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialPaymentState = {
    payments: [],
    isLoading: false,
    error: null,
    selectedPayment: null,
};

// 3. Tạo hàm reduce để quản lý các hành động liên quan đến payment
const paymentReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, isLoading: false, payments: action.payload, error: null };
        case 'FETCH_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        case 'CREATE_SUCCESS':
            return { ...state, payments: [...state.payments, action.payload], isLoading: false };
        case 'UPDATE_SUCCESS':
            return {
                ...state,
                payments: state.payments.map(payment =>
                    payment.id === action.payload.id ? action.payload : payment
                ),
                isLoading: false,
            };
        case 'DELETE_SUCCESS':
            return {
                ...state,
                payments: state.payments.filter(payment => payment.id !== action.payload),
                isLoading: false,
            };
        case 'SET_SELECTED_PAYMENT':
            return { ...state, selectedPayment: action.payload };
        case 'CLEAR_SELECTED_PAYMENT':
            return { ...state, selectedPayment: null };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

// 4. Tạo PaymentProvider để cung cấp Context cho các component con
export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);
    const { user } = useAuth();

    // Fetch all payments (filtered by userId if user is logged in)
    const fetchPayments = useCallback(async () => {
        dispatch({ type: 'FETCH_START' });
        try {
            const userId = user?.id;
            const payments = await api.getPayments(userId);
            dispatch({ type: 'FETCH_SUCCESS', payload: payments });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
        }
    }, [user?.id]);

    // Fetch payment by ID
    const fetchPaymentById = useCallback(async (id) => {
        dispatch({ type: 'FETCH_START' });
        try {
            const payment = await api.getPaymentById(id);
            dispatch({ type: 'SET_SELECTED_PAYMENT', payload: payment });
            dispatch({ type: 'FETCH_SUCCESS', payload: state.payments });
            return payment;
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
            throw error;
        }
    }, [state.payments]);

    // Create new payment
    const createPayment = async (paymentData) => {
        dispatch({ type: 'FETCH_START' });
        try {
            const newPayment = {
                ...paymentData,
                userId: user?.id,
            };
            const created = await api.createPayment(newPayment);
            dispatch({ type: 'CREATE_SUCCESS', payload: created });
            return created;
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
            throw error;
        }
    };

    // Update payment
    const updatePayment = async (id, paymentData) => {
        dispatch({ type: 'FETCH_START' });
        try {
            const updated = await api.updatePayment(id, paymentData);
            dispatch({ type: 'UPDATE_SUCCESS', payload: updated });
            return updated;
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
            throw error;
        }
    };

    // Delete payment
    const deletePayment = async (id) => {
        dispatch({ type: 'FETCH_START' });
        try {
            await api.deletePayment(id);
            dispatch({ type: 'DELETE_SUCCESS', payload: id });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
            throw error;
        }
    };

    // Set selected payment for viewing details
    const setSelectedPayment = (payment) => {
        dispatch({ type: 'SET_SELECTED_PAYMENT', payload: payment });
    };

    // Clear selected payment
    const clearSelectedPayment = () => {
        dispatch({ type: 'CLEAR_SELECTED_PAYMENT' });
    };

    // Fetch payments when user changes
    useEffect(() => {
        if (user) {
            fetchPayments();
        }
    }, [user, fetchPayments]);

    // Context value
    const contextValue = {
        // State
        payments: state.payments,
        isLoading: state.isLoading,
        error: state.error,
        selectedPayment: state.selectedPayment,
        
        // Actions
        fetchPayments,
        fetchPaymentById,
        createPayment,
        updatePayment,
        deletePayment,
        setSelectedPayment,
        clearSelectedPayment,
    };

    return (
        <PaymentContext.Provider value={contextValue}>
            {children}
        </PaymentContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng PaymentContext dễ dàng hơn
export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error('usePayment must be used within a PaymentProvider');
    }
    return context;
};


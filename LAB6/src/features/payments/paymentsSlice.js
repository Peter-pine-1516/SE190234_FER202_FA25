import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import * as api from '../../services/api';

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (userId, { rejectWithValue }) => {
    try {
      const payments = await api.getPayments(userId);
      return payments;
    } catch (error) {
      return rejectWithValue(error.message || 'Không thể tải danh sách thanh toán');
    }
  },
);

export const fetchPaymentById = createAsyncThunk(
  'payments/fetchPaymentById',
  async (id, { rejectWithValue }) => {
    try {
      const payment = await api.getPaymentById(id);
      return payment;
    } catch (error) {
      return rejectWithValue(error.message || 'Không thể tải chi tiết thanh toán');
    }
  },
);

export const createPaymentAsync = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const payment = await api.createPayment(paymentData);
      return payment;
    } catch (error) {
      if (error.status === 402 || error.responseStatus === 402) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }
      return rejectWithValue(error.message || 'Không thể tạo thanh toán');
    }
  },
);

export const updatePaymentAsync = createAsyncThunk(
  'payments/updatePayment',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const payment = await api.updatePayment(id, data);
      return payment;
    } catch (error) {
      return rejectWithValue(error.message || 'Không thể cập nhật thanh toán');
    }
  },
);

export const deletePaymentAsync = createAsyncThunk(
  'payments/deletePayment',
  async (id, { rejectWithValue }) => {
    try {
      await api.deletePayment(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Không thể xóa thanh toán');
    }
  },
);

/**
 * Async thunk hoàn tiền giao dịch.
 * pending  : Gửi request, có thể dùng để hiển thị trạng thái đang xử lý.
 * fulfilled: Giao dịch hoàn tiền thành công, reducer sẽ cập nhật lại bản ghi.
 * rejected : Có lỗi khi hoàn tiền, reducer sẽ ghi nhận lỗi để hiển thị.
 */
export const refundPayment = createAsyncThunk(
  'payments/refundPayment',
  async (id, { rejectWithValue }) => {
    try {
      const payment = await api.refundPayment(id);
      return payment;
    } catch (error) {
      return rejectWithValue(error.message || 'Không thể hoàn tiền giao dịch');
    }
  },
);

const initialState = {
  list: [],
  isLoading: false,
  error: null,
  selectedPayment: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    clearPaymentsError: (state) => {
      state.error = null;
    },
    clearSelectedPayment: (state) => {
      state.selectedPayment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchPaymentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPaymentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPayment = action.payload;
      })
      .addCase(fetchPaymentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createPaymentAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPaymentAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list.push(action.payload);
      })
      .addCase(createPaymentAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updatePaymentAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedPayment = action.payload;
        const index = state.list.findIndex((payment) => payment.id === updatedPayment.id);
        if (index !== -1) {
          state.list[index] = updatedPayment;
        }
        if (state.selectedPayment?.id === updatedPayment.id) {
          state.selectedPayment = updatedPayment;
        }
      })
      .addCase(updatePaymentAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePaymentAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deletePaymentAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePaymentAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = state.list.filter((payment) => payment.id !== action.payload);
      })
      .addCase(deletePaymentAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(refundPayment.pending, (state) => {
        state.error = null;
      })
      .addCase(refundPayment.fulfilled, (state, action) => {
        const refunded = action.payload;
        const index = state.list.findIndex((payment) => payment.id === refunded.id);
        if (index !== -1) {
          state.list[index] = refunded;
        }
        if (state.selectedPayment?.id === refunded.id) {
          state.selectedPayment = refunded;
        }
      })
      .addCase(refundPayment.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearPaymentsError, clearSelectedPayment } = paymentsSlice.actions;

export const selectPaymentsState = (state) => state.payments;
export const selectAllPayments = (state) => state.payments.list;
export const selectSelectedPayment = (state) => state.payments.selectedPayment;

export const selectSuccessfulPayments = createSelector(selectAllPayments, (payments) =>
  payments.filter((payment) => payment.status === 'SUCCESS'),
);

export default paymentsSlice.reducer;


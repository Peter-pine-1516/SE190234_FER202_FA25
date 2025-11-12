import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../../services/api';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await api.getUsers();
      return users;
    } catch (error) {
      return rejectWithValue(error.message || 'Không thể tải danh sách người dùng');
    }
  },
);

export const updateUserStatus = createAsyncThunk(
  'users/updateUserStatus',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const updatedUser = await api.updateUser(id, userData);
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message || 'Không thể cập nhật trạng thái người dùng');
    }
  },
);

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleAdminStatus: (state, action) => {
      const userId = action.payload;
      const user = state.list.find((item) => item.id === userId);
      if (user) {
        user.role = user.role === 'admin' ? 'user' : 'admin';
      }
    },
    clearUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateUserStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.list.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
          state.list[index] = updatedUser;
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { toggleAdminStatus, clearUsersError } = usersSlice.actions;

export const selectUsersState = (state) => state.users;
export const selectAllUsers = (state) => state.users.list;

export default usersSlice.reducer;


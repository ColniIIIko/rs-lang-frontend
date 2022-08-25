import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { instance } from '../../axios/axiosConfig';
import { fetchLogin } from '../../fetchRoutes/fetchAuth';
import { RootState } from '../store';

type AuthResponse = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

type AuthState = {
  data: AuthResponse | null;
  status: 'loading' | 'loaded' | 'error';
};

const initialState: AuthState = {
  data: null,
  status: 'loading',
};

export const fetchLoginThunk = createAsyncThunk('auth/login', fetchLogin);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginThunk.pending, (state: AuthState) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(fetchLoginThunk.fulfilled, (state: AuthState, action: PayloadAction<AuthResponse | null>) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchLoginThunk.rejected, (state: AuthState) => {
        state.data = null;
        state.status = 'error';
      });
  },
});

export const authReducer = authSlice.reducer;
export const selectIsAuth = (state: RootState) => !!state.auth.data;

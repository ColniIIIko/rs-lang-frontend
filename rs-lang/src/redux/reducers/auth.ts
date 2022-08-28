import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin, fetchRegister } from '../../fetchRoutes/fetchAuth';
import { FormLoginInputs, FormRegisterInputs } from '../../pages/Auth/types';
import { RootState } from '../store';

export type AuthResponse = {
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
  status: 'loaded',
};

export const fetchLoginThunk = createAsyncThunk<AuthResponse, FormLoginInputs>('auth/login', fetchLogin);
export const fetchRegisterThunk = createAsyncThunk<AuthResponse, FormRegisterInputs>(
  'auth/register',
  async (userData: FormRegisterInputs) => {
    const { name, ...userLoginData } = userData;
    await fetchRegister(userData);
    return await fetchLogin(userLoginData);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFromStorage: (state, action: PayloadAction<AuthResponse | null>) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    logout: (state: AuthState) => {
      state.data = null;
      state.status = 'loaded';
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
      })
      .addCase(fetchRegisterThunk.pending, (state: AuthState) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(fetchRegisterThunk.fulfilled, (state: AuthState, action: PayloadAction<AuthResponse | null>) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchRegisterThunk.rejected, (state: AuthState) => {
        state.data = null;
        state.status = 'error';
      });
  },
});

export const authReducer = authSlice.reducer;
export const selectIsAuth = (state: RootState) => !!state.auth.data;
export const selectIsLoading = (state: RootState) => state.auth.status === 'loading';
export const selectIsError = (state: RootState) => state.auth.status === 'error';
export const { logout, setFromStorage } = authSlice.actions;

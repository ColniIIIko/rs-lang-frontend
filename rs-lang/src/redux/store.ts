import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth';
import { statReducer } from './reducers/stat';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stat: statReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

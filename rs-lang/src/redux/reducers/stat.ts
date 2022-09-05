import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserGetStat } from '../../fetchRoutes/fetchUserStats';
import { UserStat } from '../../pages/Book/types';
import { RootState } from '../store';

type StatState = {
  data: UserStat | null;
  status: 'loading' | 'error' | 'loaded';
};

const initialState: StatState = {
  data: {
    learnedWords: 0,
    optional: {
      deletedCount: 0,
      learningCount: 0,
      difficultCount: 0,
      learnedCount: 0,
      games: {
        sprint: {
          correctAnswers: 0,
          wrongAnswers: 0,
        },
        audioQuest: {
          correctAnswers: 0,
          wrongAnswers: 0,
        },
      },
    },
  },
  status: 'loaded',
};

export const fetchStatThunk = createAsyncThunk<UserStat, string>('user/stat', fetchUserGetStat);

const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    updateStatWords: (state: StatState, action: PayloadAction<number>) => {
      state.data!.learnedWords += action.payload;
    },
    updateStatDeleted: (state: StatState, action: PayloadAction<number>) => {
      state.data!.optional.deletedCount += action.payload;
    },
    updateStatLearning: (state: StatState, action: PayloadAction<number>) => {
      state.data!.optional.learningCount += action.payload;
    },
    updateStatLearned: (state: StatState, action: PayloadAction<number>) => {
      state.data!.optional.learnedCount += action.payload;
    },
    updateStatDifficult: (state: StatState, action: PayloadAction<number>) => {
      state.data!.optional.difficultCount += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatThunk.pending, (state: StatState) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(fetchStatThunk.fulfilled, (state: StatState, action: PayloadAction<UserStat | null>) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchStatThunk.rejected, (state: StatState) => {
        state.data = null;
        state.status = 'error';
      });
  },
});

export const statReducer = statSlice.reducer;
export const selectLearnedWords = (state: RootState) => state.stat.data?.learnedWords;
export const selectOptionalStat = (state: RootState) => state.stat.data?.optional;
export const { updateStatWords, updateStatLearned, updateStatDeleted, updateStatDifficult, updateStatLearning } =
  statSlice.actions;

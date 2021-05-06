import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import formReducer from './reducers/formSlice';
import handleGamesSlice from './reducers/handleGamesSlice';

export const store = configureStore({
  reducer: {
    formReducer: formReducer,
    handleGamesReducer: handleGamesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

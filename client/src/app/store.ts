import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import formReducer from './reducers/formSlice';
import productsReducer from './reducers/handleProductsSlice';

export const store = configureStore({
  reducer: {
    formReducer: formReducer,
    productsReducer: productsReducer,
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

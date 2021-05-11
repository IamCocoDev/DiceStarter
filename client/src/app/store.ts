import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import formReducer from './reducers/formReducer';
import handleProductsReducer from './reducers/handleProductsReducer';

export const store = configureStore({
  reducer: {
    handleForm: formReducer,
    handleProducts: handleProductsReducer,
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

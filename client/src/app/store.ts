import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import formReducer from './reducers/formReducer';
import handleProductsReducer from './reducers/handleProductsReducer';
import registerReducer from './reducers/registerReducer';

export const store = configureStore({
  reducer: {
    handleForm: formReducer,
    handleProducts: handleProductsReducer,
    handleRegister: registerReducer,
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

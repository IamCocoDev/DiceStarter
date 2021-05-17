import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import formReducer from './reducers/formReducer';
import handleProductsReducer from './reducers/handleProductsReducer';
import registerReducer from './reducers/registerReducer';
import reviewReducer from './reducers/reviewsReducer';
import cartsReducer from './reducers/cartReducer';

export const store = configureStore({
  reducer: {
    handleForm: formReducer,
    handleProducts: handleProductsReducer,
    handleRegister: registerReducer,
    handleReview: reviewReducer,
    handleCart: cartsReducer,
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

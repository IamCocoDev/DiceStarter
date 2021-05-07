import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Products} from '../../types';
// import {RootState} from '../store';

const initialState: Products = {/* Acá definanse un Type en types.ts*/
  // Status
  productsListStatus: 'idle',
  deleteByIdStatus: 'idle',
  productByIdStatus: 'idle',
  // Data
  productsList: [],
  productById: {},
};

export const getProductsAsync = createAsyncThunk(
    'handleProducts/getProducts',
    async (thunkApi) => {
      const res = await axios.get('http://localhost:3001/products/');
      return res.data;
    },
);

export const getProductByIdAsync = createAsyncThunk(
    'handleProducts/getProductById',
    async (id: string) => {
      const res = await axios.get(`http://localhost:3001/product/${id}`);
      return res.data;
    },
);

export const deleteProductByIdAsync = createAsyncThunk(
    'handleProducts/deleteProductById',
    async (id: string) => {
      const res = await axios.delete(`http://localhost:3001/product/${id}`);
      return res.data;
    },
);
// PUT to Edit
export const handleProductsSlice = createSlice({
  // Te creo al reducer, acciones y estados
  name: 'products',
  initialState, // Le pasas el estado inicial
  reducers: {
    // Acá metes tus acciones normales de toda la vida
  },
  extraReducers: (builder) => {
    builder
        // Get products
        .addCase(getProductsAsync.pending, (state) => {
          state.productsListStatus = 'loading';
        })
        .addCase(getProductsAsync.fulfilled, (state, action) => {
          state.productsListStatus = 'idle';
          state.productsList = action.payload;
        })
        .addCase(getProductsAsync.rejected, (state) => {
          state.productsListStatus = 'failed';
        })
        // Get product by ID
        .addCase(getProductByIdAsync.pending, (state) => {
          state.productByIdStatus = 'loading';
        })
        .addCase(getProductByIdAsync.fulfilled, (state, action) => {
          state.productByIdStatus = 'idle';
          state.productById = action.payload;
        })
        .addCase(getProductByIdAsync.rejected, (state) => {
          state.productByIdStatus = 'failed';
        })
        // Delete product by Id
        .addCase(deleteProductByIdAsync.pending, (state) => {
          state.deleteByIdStatus = 'loading';
        })
        .addCase(deleteProductByIdAsync.fulfilled, (state) => {
          state.deleteByIdStatus = 'deleted';
        })
        .addCase(deleteProductByIdAsync.rejected, (state) => {
          state.deleteByIdStatus = 'failed';
        });
  },
});


export default handleProductsSlice.reducer;

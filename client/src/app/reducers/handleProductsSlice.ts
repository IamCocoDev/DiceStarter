import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Products, ProductRes, SearchInput} from '../../types';
import {RootState} from '../store';
// import {RootState} from '../store';

const initialState: Products = {/* Acá definanse un Type en types.ts*/
  // Status
  productsListStatus: 'idle',
  deleteByIdStatus: 'idle',
  productByIdStatus: 'idle',
  // Data
  productsList: null,
  productById: {
    id: '',
    name: '',
    picture: '',
    price: '',
    size: '',
    color: [],
    available: true,
    stock: '',
    description: '',
    rating: '',
    categories: [],
  },
};

export const getProductsAsync = createAsyncThunk(
    'handleProducts/getProducts',
    async (SearchInput: SearchInput) => {
      const res = await axios.get(`http://localhost:3001/products?page=${SearchInput.page}&name=${SearchInput.name}`);
      const product = res.data.map((product: ProductRes) => {
        return {
          id: product.id,
          name: product.name,
          picture: product.picture,
          price: product.price,
          rating: product.rating,
          size: product.size,
          stock: product.stock,
          categories: product.categories,
          color: product.color,
          available: product.available,
          description: product.description,
        };
      });
      return product;
    },
);
// id name size color available picture price stock rating description userId
export const getProductByIdAsync = createAsyncThunk(
    'handleProducts/getProductById',
    async (id: string) => {
      const res = await axios.get(`http://localhost:3001/product/${id}`);
      const {name,
        picture,
        price,
        stock,
        color,
        size,
        available,
        description,
        rating,
        categories,
      } = res.data;
      const productResponse: ProductRes = {
        id,
        name,
        picture,
        price,
        stock,
        color,
        available,
        description,
        size,
        rating,
        categories,
      };
      return productResponse;
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
    resetDeletedByIdStatus: (state) => {
      state.deleteByIdStatus = 'idle';
    },
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

export const productsListStatus = (state: RootState) =>
  state.productsReducer.productsListStatus;
export const deletedProductStatus = (state: RootState) =>
  state.productsReducer.deleteByIdStatus;
export const productByIdStatus = (state: RootState) =>
  state.productsReducer.productByIdStatus;
export const productsList = (state: RootState) =>
  state.productsReducer.productsList;
export const productDetail = (state: RootState) =>
  state.productsReducer.productById;

export const {resetDeletedByIdStatus} = handleProductsSlice.actions;

export default handleProductsSlice.reducer;

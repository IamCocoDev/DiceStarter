import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Products, ProductRes, SearchInput, dbCategories,
  Categories} from '../../types';
import {RootState} from '../store';
// import {RootState} from '../store';

const initialState: Products = {/* Acá definanse un Type en types.ts*/
  // Status
  productsListStatus: 'idle',
  deleteByIdStatus: 'idle',
  productByIdStatus: 'idle',
  getCategoriesStatus: 'idle',
  addCategoryStatus: 'idle',
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
  productCategories: [{label: '', value: 0}],
};

export const getProductsAsync = createAsyncThunk(
    'handleProducts/getProducts',
    async (SearchInput: SearchInput) => {
      const res = await axios.get(`http://localhost:3001/products?page=${SearchInput.page}&name=${SearchInput.name}&filter=${SearchInput.filter || ''}`);
      console.log(res.data);
      const product = res.data.products.map((product: ProductRes) => {
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
export const changeProductInDBAsync = createAsyncThunk(
    'handleProducts/changeProductInDB',
    async (product: Products['productById']) => {
      const toSend = {
        name: product.name,
        available: product.available,
        categories: product.categories,
        color: product.color,
        description: product.description,
        picture: product.picture,
        price: product.price,
        rating: product.rating,
        size: product.size,
        stock: product.stock,
      };
      const res = await axios.put(`http://localhost:3001/product/${product.id}`, toSend);
      return res.data;
    },
);

export const getCategoriesAsync = createAsyncThunk(
    'handleProducts/getCategories',
    async () => {
      const res = await axios.get(`http://localhost:3001/categories`);
      console.log(res.data);
      const categories: Categories[] = res.data.map((
          category: dbCategories) => {
        return {
          value: category.id,
          label: category.name,
        };
      });
      return categories;
    },
);

export const addCategoryAsync = createAsyncThunk(
    'handleProducts/addCategorie',
    async (label: string) => {
      const name = label;
      const res = await axios.post('http://localhost:3001/categories', {name});
      return res.data;
    },
);

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
        })
        // ----------------------
        // Get categories
        .addCase(getCategoriesAsync.pending, (state) => {
          state.getCategoriesStatus = 'loading';
        })
        .addCase(getCategoriesAsync.fulfilled, (state,
            action) => {
          state.getCategoriesStatus = 'idle';
          console.log(action.payload);
          state.productCategories = action.payload;
        })
        .addCase(getCategoriesAsync.rejected, (state) => {
          state.getCategoriesStatus = 'failed';
        })
        // Add category
        .addCase(addCategoryAsync.pending, (state) => {
          state.addCategoryStatus = 'loading';
        })
        .addCase(addCategoryAsync.fulfilled, (state) => {
          state.addCategoryStatus = 'idle';
        })
        .addCase(addCategoryAsync.rejected, (state) => {
          state.addCategoryStatus = 'failed';
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
export const productCategories = (state: RootState) =>
  state.productsReducer.productCategories;

export const {resetDeletedByIdStatus} = handleProductsSlice.actions;

export default handleProductsSlice.reducer;

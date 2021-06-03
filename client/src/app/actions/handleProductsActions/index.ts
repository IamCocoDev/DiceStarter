/* eslint-disable max-len */
import axios from 'axios';
import {SearchInput} from '../../../types';
import {BACK_ROUTE} from '../../../ROUTE.js';

import {SET_PRODUCTS,
  SET_PRODUCT_BY_ID,
  SET_CATEGORIES,
  SET_BEST_PRODUCTS,
} from '../../constants/constants';

const setProducts = (products: any,
    totalPages: number = 1, filter: string = '',
    order: string = '', name: string = '') => ({
  type: SET_PRODUCTS,
  payload: {products, totalPages, filter, order, name},
});

// PRODUCT BY ID HANDLING
const setProductById = (productResponse: any) => ({
  type: SET_PRODUCT_BY_ID,
  payload: productResponse,
});
// GET CATEGORIES
const setCategories = (categories: any) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

// Set best products to redux state
const setBestProducts = (products: any) => ({
  type: SET_BEST_PRODUCTS,
  payload: products,
});

// Actual async functions
const getProductsAsync = (SearchInput: SearchInput) => {
  return async (dispatch: any) => {
    try {
      dispatch(setProducts([]));
      const res = await axios.get(`${BACK_ROUTE}/products?page=${SearchInput.page}&name=${SearchInput.name}&filter=${SearchInput.filter || ''}&order=${SearchInput.sort || ''}`);
      const totalPages = res.data.totalPages;
      const products = res.data.products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          picture: product.picture,
          price: parseFloat(product.price).toFixed(2),
          size: product.size,
          stock: product.stock,
          categories: product.categories,
          color: product.color,
          available: product.available,
          description: product.description,
          rating: product.rating,
          discount: product.discount,
          priceDiscount: product.priceDiscount ? parseFloat(product.priceDiscount).toFixed(2) : null,
        };
      });
      dispatch(setProducts(products,
          totalPages, SearchInput.filter, SearchInput.sort, SearchInput.name));
    } catch (err) {
      console.log(err);
    }
  };
};

const getProductByIdAsync = (id: any) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${BACK_ROUTE}/product/${id}`);
      dispatch(setProductById({
        ...res.data,
        price: parseFloat(res.data.price).toFixed(2),
        priceDiscount: res.data.priceDiscount ? parseFloat(res.data.priceDiscount).toFixed(2) : null,
      }));
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteProductByIdAsync = (id: any, token:string) => {
  return async (dispatch: any) => {
    try {
      await axios.delete(`${BACK_ROUTE}/product/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      dispatch(getProductsAsync({name: '', page: 1}));
    } catch (err) {
      console.log(err);
    }
  };
};

const changeProductInDBAsync = (product: any, token:string) => {
  return async (dispatch: any) => {
    try {
      await axios.put(`${BACK_ROUTE}/product/${product.id}`, product, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      // const res = await axios.get(`${BACK_ROUTE}/product/${product.id}`);
      // dispatch(setProductById({
      //   ...res.data,
      //   price: parseFloat(res.data.price).toFixed(2),
      //   priceDiscount: res.data.priceDiscount ? parseFloat(res.data.priceDiscount).toFixed(2) : null,
      // }));
    } catch (err) {
      console.log(err);
      if (err) return 'error';
    }
  };
};

const getCategoriesAsync = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${BACK_ROUTE}/categories`);
      const categories = res.data.map((
          category: any) => {
        return {
          value: category.name,
          label: category.name,
          id: category.id,
        };
      });
      dispatch(setCategories(categories));
    } catch (err) {
      console.log(err);
    }
  };
};

const addCategoryAsync = (label: string, token:string) => {
  return async (dispatch: any) => {
    try {
      const name = label;
      await axios.post(`${BACK_ROUTE}/categories`, {name}, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

const putCategory = (categoryName, newCategory, token) => {
  return async (dispatch: any) => {
    try {
      await axios.put(`${BACK_ROUTE}/categories/${categoryName}`, newCategory, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      await getCategoriesAsync();
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteCategory = (categoryName, token) => {
  return async (dispatch: any) => {
    try {
      await axios.delete(`${BACK_ROUTE}/categories/${categoryName}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      const cat = await axios.get(`${BACK_ROUTE}/categories`);
      const categories = cat.data.map((
          category: any) => {
        return {
          value: category.name,
          label: category.name,
        };
      });
      dispatch(setCategories(categories));
    } catch (error) {
      console.log(error);
    }
  };
};

const getBestProducts = () => {
  return async (dispatch:any) => {
    try {
      const res = await axios.get(`${BACK_ROUTE}/products/bestRated`);
      dispatch(setBestProducts(res.data));
    } catch (err) {
      console.error(err);
    }
  };
};

export {
  getProductsAsync,
  getProductByIdAsync,
  deleteProductByIdAsync,
  changeProductInDBAsync,
  getCategoriesAsync,
  addCategoryAsync,
  putCategory,
  deleteCategory,
  getBestProducts,
};

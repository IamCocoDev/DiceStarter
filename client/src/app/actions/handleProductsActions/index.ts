import axios from 'axios';
import {ProductRes, SearchInput} from '../../../types';

import {SET_PRODUCTS,
  SET_PRODUCT_BY_ID,
  SET_CATEGORIES,
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

// Actual async functions
const getProductsAsync = (SearchInput: SearchInput) => {
  return async (dispatch: any) => {
    try {
      dispatch(setProducts([]));
      const res = await axios.get(`http://54.232.68.2:3001/products?page=${SearchInput.page}&name=${SearchInput.name}&filter=${SearchInput.filter || ''}&order=${SearchInput.sort || ''}`);
      const totalPages = res.data.totalPages;
      const products = res.data.products.map((product: ProductRes) => {
        return {
          id: product.id,
          name: product.name,
          picture: product.picture,
          price: product.price,
          size: product.size,
          stock: product.stock,
          categories: product.categories,
          color: product.color,
          available: product.available,
          description: product.description,
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
      const res = await axios.get(`http://54.232.68.2:3001/product/${id}`);
      const {name,
        picture,
        price,
        stock,
        color,
        size,
        available,
        description,
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
        categories,
      };
      dispatch(setProductById(productResponse));
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteProductByIdAsync = (id: any, token:string) => {
  return async (dispatch: any) => {
    try {
      await axios.delete(`http://54.232.68.2:3001/product/${id}`, {
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
      const toSend = {
        id: product.id,
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
      await axios.put(`http://54.232.68.2:3001/product/${product.id}`, toSend, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

const getCategoriesAsync = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`http://54.232.68.2:3001/categories`);
      const categories = res.data.map((
          category: any) => {
        return {
          value: category.name,
          label: category.name,
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
      await axios.post('http://54.232.68.2:3001/categories', {name}, {
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
      await axios.put(`http://54.232.68.2:3001/categories/${categoryName}`, newCategory, {
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
      await axios.delete(`http://localhost:3001/categories/${categoryName}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      const cat = await axios.get(`http://localhost:3001/categories`);
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

export {
  getProductsAsync,
  getProductByIdAsync,
  deleteProductByIdAsync,
  changeProductInDBAsync,
  getCategoriesAsync,
  addCategoryAsync,
  putCategory,
  deleteCategory,
};

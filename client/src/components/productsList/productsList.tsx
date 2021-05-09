import React, {useEffect} from 'react';

import './productsList.css';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  productsList,
  getProductsAsync,
  getCategoriesAsync,
} from '../../app/reducers/handleProductsSlice';
import ProductList from '../productList/productList';

// 10 product properties without counting id
function ProductsList() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductsAsync({name: '', page: 1, filter: '', sort: ''}));
    dispatch(getCategoriesAsync());
  }, []);
  const adminProducts = useAppSelector(productsList);
  return (
    <div>
      <div className="productsListGrid">
        <h1 className='productsListName'>Name</h1>
        <h1 className='productsListPrice'>Price</h1>
        <h1 className='productsListCategories'>Categories</h1>
        <h1 className='productsListDescription'>Description</h1>
        <h1 className='productsListRating'>Rating</h1>
        <h1 className='productsListStock'>Stock</h1>
        <h1 className='productsListAvailable'>Available</h1>
        <h1 className='productsListSize'>Size</h1>
        <h1 className='productsListColors'>Colors</h1>
        <h1 className='productsListImageUrl'>Image Url</h1>
      </div>
      <div>
        { adminProducts !== null &&
        adminProducts.map((listProduct) => (
          <ProductList
            key={listProduct.id}
            categories={listProduct.categories}
            name={listProduct.name}
            price={listProduct.price}
            id={listProduct.id}
            picture={listProduct.picture}
            description={listProduct.description}
            color={listProduct.color}
            available={listProduct.available}
            stock={listProduct.stock}
            size={listProduct.size}
            rating={listProduct.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;

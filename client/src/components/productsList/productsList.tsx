import React from 'react';
import './productsList.css';
import {useAppSelector} from '../../app/hooks';
import {productsList} from '../../app/reducers/handleProductsSlice';
import ProductList from '../productList/productList';

// 10 product properties without counting id
function ProductsList(props: any) {
  const adminProducts = useAppSelector(productsList);
  return (
    <div className="productsListGrid">
      <h1>Name</h1>
      <h1>Price</h1>
      <h1>Categories</h1>
      <h1>Description</h1>
      <h1>Stock</h1>
      <h1>Rating</h1>
      <h1>Available</h1>
      <h1>Size</h1>
      <h1>Colors</h1>
      <h1>Image Url</h1>
      {adminProducts !== null &&
        adminProducts.map((listProduct) => (
          <ProductList
            key={listProduct.id}
            categories={listProduct.categories}
            name={listProduct.name}
            price={listProduct.price}
            id={listProduct.id}
            picture={listProduct.picture}
            description={listProduct.description}
            colors={listProduct.colors}
            available={listProduct.available}
            stock={listProduct.stock}
            size={listProduct.size}
            rating={listProduct.rating}
          />
        ))}
    </div>
  );
}

export default ProductsList;

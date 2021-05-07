import React from 'react';
import './productsList.css';
/* categories: [],
    description: '',
    colors: [],
    name: '',
    picture: '',
    price: 0,
    rating: 0,
    size: '',
    stock: 0, */

function ProductsList() {
  return (
    <div className='productsListGrid'>
      <div>
        <h1>Name</h1>
        <h1>Price</h1>
        <h1>Categories</h1>
        <h1>Description</h1>
        <h1>Colors</h1>
        <h1>Size</h1>
      </div>
      <div>
      </div>
    </div>
  );
}

export default ProductsList;

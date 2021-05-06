import React from 'react';

type productAsign = {
    name:string,
    price:string,
    image:string,
    stock:string,
    rating:string};

const product: productAsign = {
  name: `Dragon's Quest`,
  price: `$30`,
  image: `https://juegosmesaparados.com/wp-content/plugins/aawp/public/image.php?url=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTEzeCt2aEFuNUwuanBn`,
  stock: `30`,
  rating: `4.5`,
};

function ProductDetail() {
  return (
    <div className='ProductDetailAll'>
      <h1 contentEditable>{product.name}</h1>
      <img src={product.image}/>
      <h1 contentEditable>{product.image}</h1>
      <p contentEditable>{product.stock}</p>
      <p contentEditable>{product.rating}</p>
    </div>
  );
}

export default ProductDetail;

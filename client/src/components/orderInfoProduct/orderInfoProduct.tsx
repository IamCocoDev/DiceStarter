/* eslint-disable react/prop-types */
import React from 'react';
import {Link} from 'react-router-dom';

const OrderInfoProduct = (props) => {
  const {name, picture, price} = props.product;
  const total = parseFloat(price) * props.product.productxorder.amount;
  return (
    <div>
      <h1>{name}</h1>
      <img src={picture[0]} alt="" />
      <h1>Price: $ {price}</h1>
      <h1>Amount: {props.product.productxorder.amount}</h1>
      <h1>Sub total: $ {total}</h1>
      <Link to={`/product/${props.id}`} >
        <h1>See Product</h1>
      </Link>
    </div>
  );
};

export default OrderInfoProduct;

/* eslint-disable react/prop-types */
import React from 'react';
import {Link} from 'react-router-dom';
import './orderInfoProduct.css';

const OrderInfoProduct = (props) => {
  const {name, price} = props.product;
  const total = parseFloat(price) * props.product.productxorder.amount;
  return (
    <div className='orderInfoProductAll'>
      <p>{name}</p>
      <p>Price: $ {price}</p>
      <p>Amount: {props.product.productxorder.amount}</p>
      <p>Sub total: $ {total}</p>
      <Link to={`/product/${props.id}`} >
        <h3>See Product</h3>
      </Link>
    </div>
  );
};

export default OrderInfoProduct;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {orderInfo} from '../../app/reducers/orderReducer';
import {getOneOrder} from '../../app/actions/orderActions';
import './userOrdersItem.css';
import {Redirect} from 'react-router';

const process = (array) => {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i].price * array[i].amount;
  }
  return total;
};

const UserOrdersItem = (props) => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useAppDispatch();
  const info = useAppSelector(orderInfo);
  const {order, orderProduct} = props;
  const cosas = orderProduct.map((el) => {
    return {
      price: parseFloat(el.price),
      amount: el.productxorder.amount,
    };
  });
  const total = process(cosas);
  console.log(cosas);
  useEffect(() => {
    console.log(info);
  }, [info]);
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getOneOrder(order, total));
    setRedirect(true);
  };
  return (
    <div>
      {redirect && <Redirect to='/list/order/info' />}
      <h1>{order.id}</h1>
      <h1>{order.status}</h1>
      <h1>{total}</h1>
      <input type="button" value='More' onClick={handleClick} />
    </div>
  );
};

export default UserOrdersItem;

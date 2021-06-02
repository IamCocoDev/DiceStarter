/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {orderInfo} from '../../../app/reducers/orderReducer';
import {getOneOrder} from '../../../app/actions/orderActions';
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
    <div className='userOrdersItemAll'>
      {redirect && <Redirect to='/list/order/info' />}
      <p className='userOrdersItemId'>Order number: {order.id}</p>
      <p className='userOrdersItemStatus'>Status: {order.status}</p>
      <p className='userOrdersItemAllDate'>
        Date: {order.modificationDate.slice(0, 10)}</p>
      <h3 className='userOrdersItemTotal'>Total: {total}</h3>
      <input className='userOrdersItemButton' type="button"
        value='More' onClick={handleClick} />
    </div>
  );
};

export default UserOrdersItem;

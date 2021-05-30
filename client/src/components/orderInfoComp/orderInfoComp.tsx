/* eslint-disable max-len */
import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {orderInfo} from '../../app/reducers/orderReducer';
import OrderInfoProduct from '../orderInfoProduct/orderInfoProduct';
import {clearOneOrder} from '../../app/actions/orderActions';

const OrderInfoComp = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(orderInfo);
  const {products} = order;
  useEffect(() => {
    console.log(order);
    console.log(products);
    return () => {
      dispatch(clearOneOrder);
    };
  }, []);
  return (
    <div>
      <h1>ID: {order.id}</h1>
      {products ? products.map((el) => <OrderInfoProduct key={el.id} id={el.id} product={el} />) : null}
      <h1>TOTAL: ${order.price}</h1>
    </div>
  );
};

export default OrderInfoComp;

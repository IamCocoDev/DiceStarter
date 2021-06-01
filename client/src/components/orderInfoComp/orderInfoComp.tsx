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
    return () => {
      dispatch(clearOneOrder);
    };
  }, []);
  return (
    order.id ?
    <div>
      <h1>ID: {order.id}</h1>
      <h1>Fecha: {order.modificationDate.slice(0, 10)}</h1>
      {products ? products.map((el) => <OrderInfoProduct key={el.id} id={el.id} product={el} />) : null}
      <h1>TOTAL: ${order.price}</h1>
    </div> :
    <div>
      You don`t have any orders yet!
    </div>
  );
};

export default OrderInfoComp;

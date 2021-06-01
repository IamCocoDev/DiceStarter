/* eslint-disable max-len */
import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {orderInfo} from '../../app/reducers/orderReducer';
import OrderInfoProduct from '../orderInfoProduct/orderInfoProduct';
import {clearOneOrder} from '../../app/actions/orderActions';
import './orderInfoComp.css';

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
    <div className='orderInfoCompAll'>
      <h3>ID: {order.id}</h3>
      <h3>Fecha: {order.modificationDate.slice(0, 10)}</h3>
      {products ? products.map((el) => <OrderInfoProduct key={el.id} id={el.id} product={el} />) : null}
      <h3 className='orderInfoCompTotal'>TOTAL: ${order.price}</h3>
    </div> :
    <div>
      You don`t have any orders yet!
    </div>
  );
};

export default OrderInfoComp;

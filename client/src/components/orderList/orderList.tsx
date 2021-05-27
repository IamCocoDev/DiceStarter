/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getOrders} from '../../app/actions/orderActions';
import {userToken} from '../../app/reducers/registerReducer';
import OrderListItem from '../orderListItem/orderListItem';
import {orderList} from '../../app/reducers/orderReducer';

const OrderList = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const orders = useAppSelector(orderList);
  useEffect(() => {
    dispatch(getOrders(token));
  }, []);
  useEffect(() => {
    console.log(orders);
  }, [orders]);
  return (
    <div>
      {orders.length ? orders.map((el) =>
        // eslint-disable-next-line max-len
        <OrderListItem key={el.id} id={el.id} status={el.status} order={el} />) : null}
    </div>
  );
};

export default OrderList;

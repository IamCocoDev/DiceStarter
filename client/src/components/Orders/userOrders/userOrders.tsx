/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getUserOrders, clearOrders} from '../../../app/actions/orderActions';
import {orderList} from '../../../app/reducers/orderReducer';
import {userInfo} from '../../../app/reducers/registerReducer';
import UserOrdersItem from '../userOrdersItem/userOrdersItem';
import './userOrders.css';

const UserOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(orderList);
  const user = useAppSelector(userInfo);
  useEffect(() => {
    dispatch(getUserOrders(user.id));
    return () => {
      dispatch(clearOrders());
    };
  }, []);
  useEffect(() => {
    console.log(orders);
  }, [orders]);
  return (
    <div className='userOrdersAll'>
      <h2>Your orders</h2>
      {orders.length ? orders.map((el) =>
        <UserOrdersItem key={el.id} order={el}
          orderProduct={el.products} />) : null}
    </div>
  );
};

export default UserOrders;

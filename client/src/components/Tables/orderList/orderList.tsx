/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getOrders, clearOrders} from '../../../app/actions/orderActions';
import {userToken} from '../../../app/reducers/registerReducer';
import OrderListItem from '../orderListItem/orderListItem';
import {orderList} from '../../../app/reducers/orderReducer';
import Select from 'react-select';
import './orderList.css';

const OrderList = () => {
  const [input, setInput] = useState({
    value: 'allorders',
    label: 'All Orders',
  });
  const statusSelect = [{
    value: 'allorders',
    label: 'All Orders',
  },
  {
    value: 'Created',
    label: 'Created',
  },
  {
    value: 'In process',
    label: 'In process',
  },
  {
    value: 'Canceled',
    label: 'Canceled',
  },
  {
    value: 'Complete',
    label: 'Complete',
  },
  ];
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const orders = useAppSelector(orderList);
  useEffect(() => {
    dispatch(getOrders(token, input.value));
    return () => {
      dispatch(clearOrders());
    };
  }, []);
  useEffect(() => {
    dispatch(getOrders(token, input.value));
  }, [input]);
  useEffect(() => {
    console.log(orders);
  }, [orders]);
  const handleChange = (e) => {
    setInput(e);
  };
  return (
    <div className='orderListGrid'>
      <div className='formCreateProductInputBox'>
        <Select
          className='formCreateProductInput'
          options={statusSelect}
          value={input}
          onChange={handleChange}
        >
        </Select>
      </div>
      <div className='orderListMap'>
        {orders.length ? orders.map((el) =>
        // eslint-disable-next-line max-len
          <OrderListItem key={el.id} id={el.id} status={el.status} order={el} orderProduct={el.products} />) : null}
      </div>
    </div>
  );
};

export default OrderList;

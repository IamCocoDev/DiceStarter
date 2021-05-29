/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import './orderListItem.css';
import Select from 'react-select';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {userToken} from '../../app/reducers/registerReducer';
import {putOrderStatus} from '../../app/actions/orderActions';

const OrderListItem = (props) => {
  // eslint-disable-next-line no-unused-vars
  const {address, id, price, status, user, userId} = props.order;
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const [input, setInput] = useState({
    value: status,
    label: status,
  });
  const statusSelect = [{
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

  const handleChange = (e) => {
    setInput(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      address,
      id,
      price,
      status: input.value,
      user,
      userId,
    };
    console.log(newOrder);
    dispatch(putOrderStatus(userId, newOrder, token));
  };
  return (
    <div className='orderElement'>
      <h2>{'$ ' + price}</h2>
      <h2>{address}</h2>
      {user ? <h2>{user.name}</h2> : null}
      {status === 'Created' ? <Select
        className='formCreateProductInput'
        name="categories"
        options={statusSelect}
        value={input}
        onChange={handleChange}
      >
      </Select> : <h2>{status}</h2>}
      {status === 'Created' ?
        <input type="button" onClick={handleSubmit} value='edit' /> : null}
      <br />
    </div>
  );
};

export default OrderListItem;

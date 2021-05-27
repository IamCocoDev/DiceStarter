/* eslint-disable react/prop-types */
import React from 'react';
import './orderListItem.css';

const OrderListItem = (props) => {
  return (
    <div>
      <h2>{props.id}</h2>
      <h2>{props.status}</h2>
    </div>
  );
};

export default OrderListItem;

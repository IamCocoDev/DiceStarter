/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import './orderListItem.css';
import Select from 'react-select';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {userToken} from '../../../app/reducers/registerReducer';
import {putOrderStatus} from '../../../app/actions/orderActions';
import {Redirect} from 'react-router';
import {getOneOrder} from '../../../app/actions/orderActions';

const process = (array) => {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i].price * array[i].amount;
  }
  return total.toFixed(2);
};

const OrderListItem = (props) => {
  // eslint-disable-next-line no-unused-vars
  const {address, id, price, status, user, userId} = props.order;
  const orderProduct = props.orderProduct;
  const cosas = orderProduct.map((el) => {
    return {
      price: el.priceDiscount ?
        parseFloat(el.priceDiscount).toFixed(2) :
        parseFloat(el.price).toFixed(2),
      amount: el.productxorder.amount ? el.productxorder.amount : 1,
    };
  });
  const total = process(cosas);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const [input, setInput] = useState({
    value: status,
    label: status,
  });
  const [statusSelect, setstatusSelect] = useState([{
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
  ]);

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
    dispatch(putOrderStatus(userId, newOrder, token));
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getOneOrder(props.order, total));
    setRedirect(true);
  };
  useEffect(() => {
    if (status === 'In process') {
      setstatusSelect([{
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
      ]);
    }
  }, [status]);
  useEffect(() => {
    if (status === 'In process') {
      setstatusSelect([{
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
      ]);
    }
  }, []);
  return (
    <div className='orderListItemGrid'>
      {redirect && <Redirect to='/list/order/info' />}
      <h2 className='orderListPrice'>Price: {'$ ' + total}</h2>
      <h2 className='orderListAdress'>Adress: {address}</h2>
      {user ? <h2 className='orderListUser'>User: {user.name}</h2> : null}
      <div className='orderListStatus'>
        {status === 'Created' || status === 'In process' ? <Select
          className='formCreateProductInput'
          name="categories"
          options={statusSelect}
          value={input}
          onChange={handleChange}
        >
        </Select> : <h2>Status: {status}</h2>}
      </div>
      {status === 'Created' || status === 'In process' ?
        <button
          className='orderListEdit'
          onClick={handleSubmit}>
          <i className="material-icons">save</i>
        </button> : null}
      <button className='orderListSeeMore' onClick={handleClick} >
        <i className='material-icons'>read_more</i></button>
      <br />
    </div>
  );
};

export default OrderListItem;

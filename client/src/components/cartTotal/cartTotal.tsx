import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {cartsReducer} from '../../app/reducers/cartReducer';
import {getProductsInCart, goToCheckout} from
  '../../app/actions/cartActions/index';
import './cartTotal.css';
import {NavLink} from 'react-router-dom';

const CartTotal = () => {
  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector(cartsReducer);
  const user = JSON.parse(localStorage
      .getItem('user') || '{}');
  const userId = user.id;
  let total = 0;
  productsInCart.forEach((element) => {
    total += element.price * element.amount;
  });
  // eslint-disable-next-line react/prop-types
  useEffect(() => {
    dispatch(getProductsInCart());
  }, [dispatch, userId]);

  const handleGoToCheckout = () => dispatch(goToCheckout(productsInCart));

  return (
    <div className='cartTotal'>
      <p className='cartTotalText'>TOTAL: ${total}</p>
      {
        userId ? <button onClick={handleGoToCheckout}
          className='cartButtonToCheckout'>Go To Checkout
        </button> : <NavLink to='/login'>
          <button className='cartButtonSignIn' >Sign in</button></NavLink>
      }
    </div>
  );
};

export default CartTotal;

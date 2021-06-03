import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import {cartsReducer} from '../../../app/reducers/cartReducer';
import {getProductsInCart, goToCheckout} from
  '../../../app/actions/cartActions/index';
import {setAddress} from '../../../app/actions/orderActions';
import './cartTotal.css';
import {NavLink} from 'react-router-dom';
import {userInfo} from '../../../app/reducers/registerReducer';
import swal from 'sweetalert2';

const CartTotal = () => {
  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector(cartsReducer);
  const reduxUser = useAppSelector(userInfo);
  let productsTotal = 0;
  productsInCart.forEach((p:any) => productsTotal += p.amount);
  const user = JSON.parse(localStorage
      .getItem('user') || '{}');
  const userId = user.id;
  let total = 0;
  productsInCart.forEach((element) => {
    total += element.price * element.amount;
  });
  total = parseFloat(total.toFixed(2));
  // eslint-disable-next-line react/prop-types
  useEffect(() => {
    dispatch(getProductsInCart());
  }, [dispatch, userId]);

  const handleGoToCheckout = () => {
    // checks if user has adress
    if (reduxUser.address) {
      if (productsInCart.length > 0) {
        // if it has one adress dispatch checkout
        dispatch(setAddress(userId, total, reduxUser.address));
        dispatch(goToCheckout(productsInCart));
      } else {
        swal.fire({
          text: 'You must add products to your cart in order to buy them!',
          icon: 'info',
          background: '#202020',
        });
      };
    } else {
      swal.fire({
        html: `it seems you don't have an adress, 
        <a href='/address'>Add one here</a>`,
        icon: 'info',
        background: '#202020',
      });
    };
  };

  return (
    <div className='cartTotal'>
      <p className='cartTotalProductTotal'>Products in cart: {productsTotal}</p>
      <p className='cartTotalText'>TOTAL: ${total}</p>
      {
        userId ? <button onClick={handleGoToCheckout}
          className='cartButtonToCheckout'>Go To Checkout
        </button> : <NavLink to='/profile'>
          <button className='cartButtonSignIn' >Sign in</button></NavLink>
      }
    </div>
  );
};

export default CartTotal;

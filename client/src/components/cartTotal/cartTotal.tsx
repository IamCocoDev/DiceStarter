import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {cartsReducer} from '../../app/reducers/cartReducer';
import {userInfo} from '../../app/reducers/registerReducer';
import {getProductsInCart} from '../../app/actions/cartActions/index';

const CartTotal = () => {
  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector(cartsReducer);
  const user = useAppSelector(userInfo); // esta bien esto benja?
  const userId = user.id;
  const total = (productsInCart.length &&
    productsInCart
        .reduce((acc:number, product) => acc + product.price * product.amount));
  // eslint-disable-next-line react/prop-types
  console.log('PRODUCTSINCART: ', productsInCart);
  console.log(total);
  useEffect(() => {
    dispatch(getProductsInCart(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <p>TOTAL: {total.name}</p>
      {
        userId ? <button>Go To Checkout</button> : <button>Sign in</button>
      }
    </div>
  );
};

export default CartTotal;

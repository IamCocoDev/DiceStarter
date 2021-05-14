import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {cartsReducer} from '../../app/reducers/cartReducer';
import CartProduct from '../cartProduct/cartProduct';
import {deleteAllCart, getProductsInCart} from '../../app/actions/cartActions';
import CartTotal from '../cartTotal/cartTotal';
import {userInfo} from '../../app/reducers/registerReducer';

const Cart = () => {
  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector(cartsReducer);
  const userInf = useAppSelector(userInfo);
  const userId = userInf.id;

  const handleDeleteCart = () => dispatch(deleteAllCart(userId));

  useEffect(() => {
    dispatch(getProductsInCart(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <div>
        {
          // eslint-disable-next-line react/jsx-key
          productsInCart.map((product) => <CartProduct product={product} />)
        }
        <button onClick={handleDeleteCart} >Eliminar Carrito</button>
      </div>
      <div>
        <CartTotal />
      </div>
    </div>
  );
};

export default Cart;

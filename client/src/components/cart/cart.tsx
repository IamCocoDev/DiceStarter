import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {cartsReducer} from '../../app/reducers/cartReducer';
import CartProduct from '../cartProduct/cartProduct';
import {deleteAllCart, getProductsInCart} from '../../app/actions/cartActions';
import CartTotal from '../cartTotal/cartTotal';
import {userInfo} from '../../app/reducers/registerReducer';
import './cart.css';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(cartsReducer);
  const productsInCart = [...cartProducts];
  const userInf = useAppSelector(userInfo);
  const userId = userInf.id;
  const [products, setProducts] = React.useState([]);

  const handleDeleteCart = () => dispatch(deleteAllCart(userId));

  const findDuplicates = (array) => {
    if (array.length !== 0) {
      const products = [array[0]];
      for (let i = 1; i < array.length; i++) {
        const product = products.find((p) => p.id === array[i].id);
        if (product === undefined) {
          products.push(array[i]);
        }
        if (product !== undefined) {
          product.amount += array[i].amount;
        };
      }
      setProducts(products);
    }
  };

  useEffect(() => {
    dispatch(getProductsInCart());
    findDuplicates(productsInCart);
  }, [productsInCart]);

  return (
    <div className='cartFlex'>
      <div className='cartFlexItems'>
        { products.length > 0 ?
          // eslint-disable-next-line react/jsx-key
          products.map((product) =>
            <CartProduct key={product.id} product={product} />):
            <div>No products in cart</div>
        }
      </div>
      <div className='cartFlexTotal'>
        <button onClick={handleDeleteCart} >Eliminar Carrito</button>
        <CartTotal />
      </div>
    </div>
  );
};

export default Cart;

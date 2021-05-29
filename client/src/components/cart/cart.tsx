import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {cartsReducer} from '../../app/reducers/cartReducer';
import CartProduct from '../cartProduct/cartProduct';
import {deleteAllCart, getProductsInCart} from '../../app/actions/cartActions';
import CartTotal from '../cartTotal/cartTotal';
import {userInfo} from '../../app/reducers/registerReducer';
import swal from 'sweetalert2';
import './cart.css';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(cartsReducer);
  const productsInCart = [...cartProducts];
  const userInf = useAppSelector(userInfo);
  const userId = userInf.id;
  const [products, setProducts] = React.useState([]);
  const handleDeleteCart = () => {
    if (productsInCart.length <= 0) {
      swal.fire({
        text: 'You already deleted all the products from this cart!',
        icon: 'info',
      });
    } else {
      swal.fire({
        title: 'Are you sure?',
        text: 'This will delete the whole cart!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
          .then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteAllCart(userId))
                  .then((r) => {
                    if (r !== 'error') {
                      dispatch(getProductsInCart(userId));
                      findDuplicates(productsInCart);
                      swal.fire({
                        text: 'Cart deleted successfully',
                        icon: 'info',
                      });
                    } else {
                      swal.fire({
                        text: 'Oops, something went wrong',
                        icon: 'error',
                      });
                    }
                  }).catch((err) => console.error(err));
            }
          });
    }
  };


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
    } else {
      setProducts([]);
    }
  };
  useEffect(() => {
    dispatch(getProductsInCart(userId));
    findDuplicates(productsInCart);
  }, []);

  useEffect(() => {
    findDuplicates(productsInCart);
  }, [cartProducts]);

  return (
    <div className='cartFlex'>
      <div className='cartFlexItems'>
        {products.length > 0 ?
          // eslint-disable-next-line react/jsx-key
          products.map((product) =>
            <CartProduct key={product.id} product={product}
              setProduct={setProducts} />) :
          <div>No products in cart</div>
        }
      </div>
      <div className='cartFlexTotal'>
        <CartTotal />
        <button className='cartDeleteButton'
          onClick={handleDeleteCart} >Delete Cart</button>
      </div>
    </div>
  );
};

export default Cart;

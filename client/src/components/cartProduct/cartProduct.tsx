
import React, {useState} from 'react';
// import Redirect from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  deleteProductFromCart,
  changeProductQuantity,
} from '../../app/actions/cartActions/index';
import {userInfo} from '../../app/reducers/registerReducer';
import './cartProduct.css';

const CartProduct = (props) => {
  // eslint-disable-next-line react/prop-types
  const {image, name, amount, price, id, stock} = props.product;
  const [productAmount, setProductAmount] = useState(amount);
  const userInf = useAppSelector(userInfo);
  const userId = userInf.id;
  const dispatch = useAppDispatch();
  const handleDeleteProduct = () => {
    dispatch(deleteProductFromCart(userId, id));
    alert('Product deleted successfully');
  };
  const handleChangeAmount = () => {
    const totalPrice = price * amount;
    dispatch(changeProductQuantity(userId, id, amount, totalPrice, stock));
  };
  const counterDecrease = () => setProductAmount(productAmount - 1);
  const counterIncrease = () => setProductAmount(productAmount + 1);

  return (
    <div className='cartProductGrid'>
      <img className='cartProductImage' src={image[0]} alt={name} />
      <div className='cartProductName'>{name}</div>
      <input
        className='cartProductAmout'
        value={amount}
        onChange={handleChangeAmount}
      />
      <div className='cartProductPrice'>{price * amount}</div>
      <div>
        { productAmount > 0 &&
        <button className='cartProductAmountDecrease' onClick={counterDecrease}>
        -
        </button>
        }
        {amount}
        { productAmount < stock &&
          <button className='cartProductAmountIncrease'
            onClick={counterIncrease}>
           +
          </button>
        }
      </div>
      <button className='cartProductDelete'
        onClick={handleDeleteProduct} ><i className='material-icons'>
          delete
        </i></button>
    </div>
  );
};

export default CartProduct;

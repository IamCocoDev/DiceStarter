import React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteProductFromCart,
  changeProductQuantity} from '../../app/actions/cartActions/index';
import {userInfo} from '../../app/reducers/registerReducer';
const CartProduct = (props) => {
  // eslint-disable-next-line react/prop-types
  const {img, name, amount, price, id, stock} = props.product;
  const userInf = useAppSelector(userInfo);
  const userId = userInf.id;
  const dispatch = useAppDispatch();
  const handleDeleteProduct = () => dispatch(deleteProductFromCart(userId, id));
  const handleChangeAmount = () => {
    const totalPrice = price * amount;
    dispatch(changeProductQuantity(userId, id, amount, totalPrice, stock));
  };

  return (
    <div>
      <img src={img} alt={name} />
      <div>{name}</div>
      <input
        value={amount}
        onChange={handleChangeAmount}
      />
      <div>{price * amount}</div>
      <button onClick={handleDeleteProduct} ></button>
    </div>
  );
};

export default CartProduct;

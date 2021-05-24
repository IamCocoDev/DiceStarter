import React from 'react';
import './productCard.css';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {userInfo} from '../../app/reducers/registerReducer';
import {addProductInCart} from '../../app/actions/cartActions/index';

function ProductCard(
    props:{
    name:string,
    price:string,
    image:string[],
    id:string,
    stock:number,
  }) {
  // const productToCart = useAppSelector(productDetail);
  const user = useAppSelector(userInfo);
  // const {id} = userInfo;
  const dispatch = useAppDispatch();
  const handleOnClick = () => {
    const duplicate = JSON.parse(localStorage
        .getItem('cart') || '[]').find((el) => el.id === props.id);
    if (duplicate) {
    } else {
      dispatch(addProductInCart({
        id: props.id,
        name: props.name,
        price: parseFloat(props.price),
        image: props.image,
        stock: props.stock,
        amount: 1,
      }, user.id));
    }
  };
  return (
        props.stock > 0 ?
        <div className='productCardAll'>
          <img className='productCardImage'
            src={props.image[0]} alt='Photo'/>
          <div className='verticalLine'></div>
          <div className='productInfo'>
            <div className='productNamePrice'>
              <h2 className='productCardName'>{props.name}</h2>
              <div className='productCardPrice'>$ {props.price}</div>
            </div>

            <div className='productCardButtons'>
              {
                user.role !== 'Admin' ?
                <button onClick={handleOnClick} className='productCardButton'>
                  Add to cart
                </button>:null
              }
              <NavLink className='productCardlink'
                to={`/product/${props.id}`}>
                <button className='productCardButton'>
                  More Info
                </button>
              </NavLink>
            </div>
          </div>
        </div> :
      <div className='productCardGrid'>
        <h1 className='productCardName'>{props.name}</h1>
        <p className='productCardPrice'>{props.price}</p>
        <img className='productCardImageSold' src={props.image[0]} alt='Photo'/>
        <h1 className='productCardSold'>Sold Out</h1>
      </div>
  );
}

export default ProductCard;

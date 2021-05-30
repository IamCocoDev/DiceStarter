import React from 'react';
import './productCard.css';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {userInfo} from '../../app/reducers/registerReducer';
import {addProductInCart} from '../../app/actions/cartActions/index';
import RatingStars from '../ratingStars/ratingStars';
import swal from 'sweetalert2';

function ProductCard(
    props:{
    name:string,
    price:string,
    image:string[],
    id:string,
    stock:number,
    rating:number,
    priceDiscount:string,
    discount: number,
    categories: string[],
  }) {
  // const productToCart = useAppSelector(productDetail);
  const user = useAppSelector(userInfo);
  // const {id} = userInfo;
  const dispatch = useAppDispatch();
  const handleOnClick = () => {
    const duplicate = JSON.parse(localStorage
        .getItem('cart') || '[]').find((el) => el.id === props.id);
    if (duplicate) {
      swal.fire({
        text: 'You already added this product to cart!',
        icon: 'info',
      });
    } else {
      dispatch(addProductInCart({
        id: props.id,
        name: props.name,
        price: parseFloat(props.price),
        image: props.image,
        stock: props.stock,
        amount: 1,
      }, user.id));
      swal.fire({
        text: 'Product added succesfully!',
        icon: 'success',
      });
    }
  };
  return (
    <div className='productCardAll'>
      <img className='productCardImage'
        src={props.image[0]} alt='Photo'/>
      <div className='verticalLine'></div>
      <div className='productInfo'>
        <div className='productNamePrice'>
          <h2 className='productCardName'>{props.name}</h2>
          <RatingStars rating={props.rating}/>
          {/* eslint-disable-next-line react/jsx-key */}
          {props.categories.map((c) => <span className='categories'>{c}</span>)}
          { props.priceDiscount || props.discount ?
          <div className='productCardDiscount'>
            <div className='productCardDiscountPrice'>
              ${props.price}
            </div>
            { props.priceDiscount ?
            <div>${props.priceDiscount}</div> :
            <div>
              ${parseFloat(props.price) -
              parseFloat((parseFloat(props.price) *
              props.discount/100).toFixed(2))}
            </div> }
          </div> :
            <div className='productCardPrice'>$ {props.price}</div>
          }
        </div>
        {props.stock === 0 ?
        <div className='productCardSOLDOUT'>SOLD OUT</div>: null}
        <div className='productCardButtons'>
          {
                user.role !== 'Admin' && props.stock > 0 ?
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
    </div>
  );
}

export default ProductCard;

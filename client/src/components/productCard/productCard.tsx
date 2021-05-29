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
          { props.priceDiscount ?
          <div className='productCardDiscount'>
            {props.priceDiscount}
            <div className='productCardDiscountPrice'>
              {/* aca la idea es mostrar el precio sin descuento tachado*/}
              {props.price}
            </div>
          </div> :
            <div className='productCardPrice'>$ {props.price}</div>
          }
          <RatingStars rating={props.rating}/>
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

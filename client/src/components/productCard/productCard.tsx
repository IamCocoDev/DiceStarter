import React from 'react';
import './productCard.css';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {userInfo} from '../../app/reducers/registerReducer';
import {addProductInCart} from '../../app/actions/cartActions/index';
import RatingStars from '../ratingStars/ratingStars';
import swal from 'sweetalert2';
import {addProductInWishlist} from '../../app/actions/wishlistActions';

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
  const handleOnCart = () => {
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
  const handleOnWishlist = () => {
    const duplicate = JSON.parse(localStorage
        .getItem('wishlist') || '[]').find((el) => el.id === props.id);
    if (duplicate) {
      swal.fire({
        text: 'You already added this product to your wishlist!',
        icon: 'info',
      });
    } else {
      dispatch(addProductInWishlist({
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
          {props.categories.map((c) => <span key={c}
            className='categories'>{c}</span>)}
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
                <div>
                  <button onClick={handleOnCart} className='productCardButton'>
                  Add to cart
                  </button>
                  <button onClick={handleOnWishlist}
                    className='productCardButton'>
                 Add to wishlist
                  </button>
                </div>:null
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

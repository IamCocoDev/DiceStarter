/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import './productCard.css';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {userInfo} from '../../app/reducers/registerReducer';
import {addProductInCart} from '../../app/actions/cartActions/index';
import RatingStars from '../ratingStars/ratingStars';
import swal from 'sweetalert2';
import {addProductInWishlist, deleteProductInWishlist}
  from '../../app/actions/wishlistActions';
import {wishlistsReducer} from '../../app/reducers/wishlistReducer';

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
  const wishlist = useAppSelector(wishlistsReducer);
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

  const [active, setActive] = useState(false);

  /*  useEffect(() => {
    if (JSON.parse(localStorage
        .getItem('wishlist' || '[]'))
        .filter((product) => product.name === props.name).length > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [active, props.name, localStorage]); */

  function toggle() {
    setActive(!active);
  }

  // useState seteado a active o inactive
  // dependiendo si el producto esta en la wishlist
  // hacer estilos para el boton dependiendo del estado
  // si el producto ya esta en la wishlist hay
  // que traerse el localstorage y filtrarlo para poder sacarlo
  // (hacer accion para sacarlo del estado de redux)


  const handleOnWishlist = () => {
    const duplicate = JSON.parse(localStorage
        .getItem('wishlist') || '[]').filter((p) => p.id === props.id);
    if (duplicate.length > 0) {
      dispatch(deleteProductInWishlist(props.id, user.id));
    } else {
      dispatch(addProductInWishlist({
        id: props.id,
        name: props.name,
        price: parseFloat(props.price),
        image: props.image,
        stock: props.stock,
        amount: 1,
      }, user.id));
    }
  };
  useEffect(() => {
    if (wishlist.find((el) => el.id === props.id)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, []);
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
                <div className='productCardUserButtons'>
                  <button onClick={() => {
                    handleOnWishlist(); toggle();
                  }}
                  className={`${active ? 'activeWishlist' :
                  'inactiveWishlist'} material-icons`}>
                      favorite
                  </button>
                  <button onClick={handleOnCart} className='productCardButton'>
                  Add to cart
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

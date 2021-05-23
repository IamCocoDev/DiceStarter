import React, {useEffect, useState} from 'react';
import './productDetail.css';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {productDetail} from '../../app/reducers/handleProductsReducer';
import ColorCircle from '../colorCircle/ColorCircle';
import {
  ProductRes,
} from '../../types';
import {getProductByIdAsync}
  from '../../app/actions/handleProductsActions/index';
import UserReviews from '../userReviews/userReviews';
import Carousel from '../carousel/carousel';
import {userInfo} from '../../app/reducers/registerReducer';
import {addProductInCart} from '../../app/actions/cartActions/index';

function ProductDetail(props:any ) {
  const User = useAppSelector(userInfo);
  const [input, setInput] = useState<ProductRes>({
    id: props.id,
    name: props.name,
    picture: props.picture,
    price: props.price,
    size: props.size,
    color: props.color,
    available: props.available,
    stock: props.stock,
    description: props.description,
    categories: props.categories,
  });
  const dispatch = useAppDispatch();
  const product = useAppSelector(productDetail);
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(getProductByIdAsync(id));
  }, []);
  const handleOnClick = () => dispatch(addProductInCart({
    id: product.id,
    name: product.name,
    price: parseFloat(product.price),
    image: product.picture[0],
    stock: product.stock,
    amount: 1,
  }, User.id));
  return (
    <div className='productDetailBackground'>
      {
        product === null &&
            <h1 className='ProductDetailLoadingHeader'>
              Loading...
            </h1>
      }
      { product !== null &&
      <div>
        <div className='ProductDetailGridAll'>
          <div className='carouselandinfo'>
            <Carousel pictures={product.picture}/>
            <div className='ProductDetailGrid'>
              <h2 className='ProductDetailName'>{product.name}</h2>
              <div className='productDetailinformation'>
                <div className='productDetailButton'>
                  <span className='ProductDetailPrice'>
                Price: $ {product.price}
                  </span>
                  {
                    User.role !== 'Admin' ?
                      <button className='productDetailAddToCart'
                        onClick={handleOnClick}
                      >
                    Add to Cart
                      </button>:null
                  }
                </div>
                <div className='productDetailInfo'>
                  <div className='ProductDetailColors'>
                    <span className='productDetailColorsTitle'>Color: </span>
                    {product.color.length?
                product.color.map((el:any) => <ColorCircle key={el} color={el}
                  onClick={() => {
                    const toChange =
                product.color.filter((color:any) => el !== color);
                    setInput({...input, color: toChange});
                  }}/>):null}</div>
                  <span className='ProductDetailStock'>
                  Stock: {product.stock}
                  </span>
                  <span className='ProductDetailSize'>
                  Size: {product.size}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='detailDescription'>
            <h3 className='productDetailDescritionTitle'>Description</h3>
            <p className='ProductDetailDescription'>{product.description}
            </p>
          </div>
        </div>
        <UserReviews id={id}/>
      </div>
      }
      {/*
        productStatus === 'failed' &&
        <div>
          <h1 className='ProductDetailErrorHeader'>
            Something went wrong
          </h1>
        </div>
      */}
    </div>
  );
}

export default ProductDetail;

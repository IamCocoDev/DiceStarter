import React, {useEffect, useState} from 'react';
import './productDetail.css';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {productDetail,
  productByIdStatus} from '../../app/reducers/handleProductsReducer';
import ColorCircle from '../colorCircle/ColorCircle';
import {
  ProductRes,
} from '../../types';
import {getProductByIdAsync}
  from '../../app/actions/handleProductsActions/index';
import UserReviews from '../userReviews/userReviews';
import Carousel from '../carousel/carousel';

function ProductDetail(props:any ) {
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
  const productStatus = useAppSelector(productByIdStatus);
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(getProductByIdAsync(id));
  }, []);
  return (
    <div className='productDetailBackground'>
      {
        productStatus === 'loading' &&
            <h1 className='ProductDetailLoadingHeader'>
              Loading...
            </h1>
      }
      { productStatus === 'idle' &&
      <div>
        <div className='ProductDetailGridAll'>
          <div className='ProductDetailGrid'>
            <h1 className='ProductDetailName'>{product.name}</h1>
            <div className='ProductDetailImage'>
              <Carousel pictures={product.picture}/>
            </div>
            <p className='ProductDetailPrice'>
            Price: {product.price}
            </p>
            <p className='ProductDetailStock'>
            Stock: {product.stock}
            </p>
            <p className='ProductDetailSize'>Size: {product.size}</p>
            <p className='ProductDetailColors'>
              {product.color.length?
              product.color.map((el:any) => <ColorCircle key={el} color={el}
                onClick={() => {
                  const toChange =
                product.color.filter((color:any) => el !== color);
                  setInput({...input, color: toChange});
                }}/>):null}</p>
            <p className='ProductDetailDescription'>{product.description}
            </p>
          </div>
        </div>
        <UserReviews id={id}/>
      </div>
      }
      {
        productStatus === 'failed' &&
        <div>
          <h1 className='ProductDetailErrorHeader'>
            Something went wrong
          </h1>
        </div>
      }
    </div>
  );
}

export default ProductDetail;

import React from 'react';
import {ProductRes} from '../../types';
/* import {Link} from 'react-router-dom'; */
import './productList.css';

function ProductList(props: ProductRes): JSX.Element {
  console.log(props.description);
  return (
    <div className= 'productListGrid'>
      <div className='productListName'>
        {props.name}
      </div>
      <div className='productListPrice'>
        {props.price}
      </div>
      {/* <div className='productListCategories'>
        <p contentEditable>
          {props.categories}</p>
      </div> */}
      <div className='productListDescription'>
        <p contentEditable>
          {props.description}</p>
      </div>
      <div contentEditable className='productListRating'>
        <p>{props.rating}</p>
      </div>
      <div className='productListStock'>
        <p contentEditable>{props.stock}</p>
      </div>
      {/* <div className='productListAvailable'>
        <p contentEditable>{props.available}
        </p>
      </div> */}
      <div className='productListSize'>
        <p contentEditable>{props.size}</p>
      </div>
      <div className='productListColors'>
        <p contentEditable>{props.color}</p>
      </div>
      {/*  <div className='productListImageUrl'>
        <p contentEditable>{props.picture}</p>
      </div> */}
    </div>
  );
}
export default ProductList;

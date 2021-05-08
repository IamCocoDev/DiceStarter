import React from 'react';
import {ProductRes} from '../../types';
import {Link} from 'react-router-dom';

function ProductList(props: ProductRes): JSX.Element {
  return (
    <div>
      <p contentEditable>{props.name}</p>
      <p contentEditable>{props.price}</p>
      <p contentEditable>{props.categories}</p>
      <p contentEditable>{props.description}</p>
      <p contentEditable>{props.rating}</p>
      <p contentEditable>{props.stock}</p>
      <p contentEditable>{props.available}</p>
      <p contentEditable>{props.size}</p>
      <p contentEditable>{props.colors}</p>
      <p contentEditable>{props.picture}</p>
      <Link className="productCardEdit" to={`/product/${props.id}`}>
        <button className="productCardEditButton" value="edit">
          Edit
        </button>
      </Link>
      <Link className="productCardDelete" to={`/home`}>
        <button className="productCardDeleteButton" value="delete">
          Delete
        </button>
      </Link>
    </div>
  );
}
export default ProductList;

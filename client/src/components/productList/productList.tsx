import React, {useState} from 'react';
import {ProductRes, listData} from '../../types';
import './productList.css';
import Select from 'react-select';

function ProductList(props: ProductRes): JSX.Element {
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
    rating: props.rating,
    categories: props.categories,
  });
  const handleNumberChange = (e: listData) => {
    let data: string | number | boolean = e.target.value;
    if (e.target.name === 'rating' || e.target.name === 'stock') {
      data = parseFloat(data);
    };
    setInput({...input, [e.target.name]: data});
  };
  const handleDataChange = (e: any) => setInput({
    ...input,
    [e.target.name]: e.target.value,
  });
  return (
    <div className="productListGrid">
      <input
        /* onChange={} */ placeholder={props.name}
        className="productListName"
      ></input>
      <input
        className="productListPrice"
        placeholder={props.price}
        value={input.price}
        type="text"
      ></input>
      <Select
        className="productListCategories"
        onChange={handleDataChange}
        value={input.categories}
        /* options={input.categories} */
      ></Select>
      <input
        placeholder={props.description}
        className="productListDescription"
      ></input>
      <input
        onChange={handleNumberChange}
        placeholder={props.rating}
        value={input.rating}
        className="productListRating"
      ></input>
      <input
        placeholder={props.stock}
        onChange={handleNumberChange}
        className="productListStock"
      ></input>
      <input
        /* placeholder={props.available} */
        className="productListAvailable"
      ></input>
      <input placeholder={props.size} className="productListSize"></input>
      {/* <input placeholder={props.color}
      className="productListColors"></input> */}
      <input
        placeholder={props.picture}
        className="productListImageUrl"
      ></input>
      <button className="productsListEditButton">Save Changes</button>
    </div>
  );
}
export default ProductList;

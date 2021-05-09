import React, {useState, useEffect} from 'react';
import {ProductRes, formInputData, formTextAreaData} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  changeProductInDBAsync, deleteProductByIdAsync}
  from '../../app/reducers/handleProductsSlice';
import {
  productCategories,
} from '../../app/reducers/handleProductsSlice';
import './productList.css';
import Select from 'react-select';

function ProductList(props: ProductRes): JSX.Element {
  const dispatch = useAppDispatch();
  const productCats = useAppSelector(productCategories);
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

  useEffect(() => {
    setInput(props);
  }, []);

  const handleNumberChange = (e: formInputData) => {
    let data: string | number | boolean = e.target.value;
    if (e.target.name === 'rating' || e.target.name === 'stock') {
      data = parseFloat(data);
    };
    setInput({...input, [e.target.name]: data});
  };

  const handleTextAreaChange = (e: formTextAreaData) => {
    setInput({...input, [e.target.name]: e.target.value});
  };

  const handleDataChange = (e: any) => setInput({
    ...input,
    [e.target.name]: e.target.value,
  });

  return (
    <div className="productListGrid">
      <input
        className="productListName"
        type="text"
        placeholder={'Name'}
        value={input.name}
        name="name"
        onChange={handleNumberChange}
      ></input>
      <input
        className="productListPrice"
        type="number"
        placeholder={'Price'}
        value={input.price}
        name="price"
        step="0.1"
        onChange={handleNumberChange}
      ></input>
      <Select
        isMulti
        name="categories"
        className="productListCategories"
        onChange={handleDataChange}
        options={productCats}
      ></Select>
      <textarea
        className="productListDescription"
        placeholder={'Description'}
        value={input.description}
        name="description"
        onChange={handleTextAreaChange}
      ></textarea>
      <input
        className="productListRating"
        type="number"
        placeholder={'Rating'}
        value={input.rating}
        name="rating"
        step="0.1"
        onChange={handleNumberChange}
      ></input>
      <input
        className="productListStock"
        type="number"
        placeholder={'Stock'}
        value={input.stock}
        name="stock"
        onChange={handleNumberChange}
      ></input>
      <select
        className="productListAvailable"
        /* placeholder={props.available} */
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <input
        className="productListSize"
        type="number"
        placeholder={'Size'}
        value={input.size}
        name="size"
        step="0.1"
        onChange={handleNumberChange}
      >
      </input>
      <div>
        {input.color.length ?
          input.color.map((el) => <p key={el}
            style={{'color': el}} >{el}</p>) :
          null}
        <input type="color" />
      </div>
      <input
        className="productListImageUrl"
        type="text"
        placeholder={'Image'}
        value={input.picture}
        name="picture"
        onChange={handleNumberChange}
      ></input>
      <button className="productsListEditButton" onClick={() => {
        dispatch(changeProductInDBAsync(input));
      }}>Save Changes</button>
      <button className="productsListDeleteButton" onClick={() => {
        dispatch(deleteProductByIdAsync(input.id));
      }}>
        Delete This Product
      </button>
    </div>
  );
}

export default ProductList;

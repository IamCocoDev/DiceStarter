import React, {useState, useEffect} from 'react';
import {
  ProductRes, formInputData,
} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  changeProductInDBAsync, deleteProductByIdAsync}
  from '../../app/actions/handleProductsActions/index';
import ColorCircle from '../colorCircle/ColorCircle';
import './productList.css';
import {userToken} from '../../app/reducers/registerReducer';

function ProductList(props: ProductRes): JSX.Element {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('');
  const [available, setAvailable] = useState('true');
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
    categories: [],
  });

  const token = useAppSelector(userToken);

  useEffect(() => {
    setInput(props);
    if (input.available) {
      setAvailable('true');
    } else {
      setAvailable('false');
    }
    setInput({...input, categories: props.categories});
  }, []);

  useEffect(() => {
  }, [input]);

  const handleNumberChange = (e: formInputData) => {
    let data: string | number | boolean = e.target.value;
    if (e.target.name === 'rating' || e.target.name === 'stock') {
      data = parseFloat(data);
    };
    setInput({...input, [e.target.name]: data});
  };

  const addColor = (color: string) => {
    const repColor = input.color.find((el: string) => el === color);
    if (!repColor) {
      const newcolor = [...input.color, color];
      setInput({...input, color: newcolor});
    }
  };

  useEffect(() => {
    if (available === 'true') {
      setInput({...input, available: true});
    } else if (available === 'false') {
      setInput({...input, available: false});
    }
  }, [available]);
  return (
    <div className="productListGrid">
      <input
        className="productsListName"
        type="text"
        placeholder={'Name'}
        value={input.name}
        name="name"
        onChange={handleNumberChange}
      ></input>
      <input
        className="productsListPrice"
        type="number"
        placeholder={'Price'}
        value={input.price}
        name="price"
        step="0.1"
        onChange={handleNumberChange}
      ></input>
      <input
        className="productsListStock"
        type="number"
        placeholder={'Stock'}
        value={input.stock}
        name="stock"
        onChange={handleNumberChange}
      ></input>
      <input
        className="productsListSize"
        type="text"
        placeholder={'Size'}
        value={input.size}
        name="size"
        step="0.1"
        onChange={handleNumberChange}
      >
      </input>
      <div className='productsListColors'>
        {input.color.length ?
          input.color.map((el) => <ColorCircle key={el} color={el}
            onClick={() => {
              const toChange = input.color.filter((color) => el !== color);
              setInput({...input, color: toChange});
            }}/>) : null}
        <input type="color"
          onChange={(e) => setColor(e.target.value)}
          name="color"
          value={color}
        />
        <input type="button"
          value="Add color"
          onClick={() => addColor(color)} />
      </div>
      <button className="productsListEditButton" onClick={() => {
        if (window.confirm(`Save changes to ${input.name}?`)) {
          dispatch(changeProductInDBAsync(input, token));
        }
      }}>Save Changes</button>
      <button className="productsListDeleteButton" onClick={() => {
        if (window.confirm(`Are you sure you want to delete ${input.name}?`)) {
          dispatch(deleteProductByIdAsync(input.id, token));
        }
      }}>
        Delete This Product
      </button>
    </div>
  );
}

export default ProductList;

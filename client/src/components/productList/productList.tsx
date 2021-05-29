import React, {useState, useEffect} from 'react';
import {formInputData} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  changeProductInDBAsync, deleteProductByIdAsync}
  from '../../app/actions/handleProductsActions/index';
import ColorCircle from '../colorCircle/ColorCircle';
import './productList.css';
import {userToken} from '../../app/reducers/registerReducer';
import swal from 'sweetalert2';

function ProductList(props:any): JSX.Element {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('');
  const [available, setAvailable] = useState('true');
  const [input, setInput] = useState({
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
    rating: props.rating,
    discount: props.discount,
    priceDiscount: props.priceDiscount,
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

  const handleDiscountChange = (e:any) => {
    setInput({...input, [e.target.name]: parseInt(e.target.value)});
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

  const handleOnSubmit = () => {
    if (input.discount < 99) {
      dispatch(changeProductInDBAsync(input, token));
    } else {
      swal.fire({
        text: `You can't add a 100% discount!`,
        icon: 'info',
      });
    }
  };

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
        placeholder={input.priceDiscount ? input.priceDiscount : input.price}
        value={input.priceDiscount ? input.priceDiscount : input.price}
        name="price"
        step="0.1"
        onChange={handleNumberChange}
      ></input>
      {
        <p className='productListDiscountLabel'>%
          <input
            className='productListDiscount'
            type='number'
            name='discount'
            onChange={handleDiscountChange}
            placeholder={props.discount || 0}
            min='0'
            max='99'
            step='1'
          />
        </p>
      }
      <input
        className="productListStock"
        type="number"
        placeholder={'Stock'}
        value={input.stock}
        name="stock"
        onChange={handleNumberChange}
      ></input>
      <input
        className="productListSize"
        type="text"
        placeholder={'Size'}
        value={input.size}
        name="size"
        onChange={handleNumberChange}
      >
      </input>
      <div className='productListColors'>
        <div> {
          input.color.length ?
          input.color.map((el) => <ColorCircle key={el} color={el}
            onClick={() => {
              const toChange = input.color.filter((color) => el !== color);
              setInput({...input, color: toChange});
            }}/>) : null}
        </div>
        <input
          type="color"
          onChange={(e) => setColor(e.target.value)}
          name="color"
          value={color}
        />
        <button className='productListColorsButton'
          onClick={() => addColor(color)}>Add color</button>
      </div>
      <button className="productListEditButton" onClick={handleOnSubmit}>
        <i className='material-icons'>save</i></button>
      <button className="productListDeleteButton" onClick={() => {
        if (window.confirm(`Are you sure you want to delete ${input.name}?`)) {
          dispatch(deleteProductByIdAsync(input.id, token));
        }
      }}>
        <i className='material-icons'>delete</i>
      </button>
    </div>
  );
}

export default ProductList;

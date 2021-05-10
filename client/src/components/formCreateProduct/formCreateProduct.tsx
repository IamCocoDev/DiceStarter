import React, {useState, useEffect} from 'react';
// import {useAppDispatch} from '../../app/hooks';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {sendFormAsync} from '../../app/reducers/formSlice';
import {
  getCategoriesAsync,
  productCategories,
} from '../../app/reducers/handleProductsSlice';
import './formCreateProduct.css';

import Select from 'react-select';
import {
  formData,
  formInputData,
  formTextAreaData,
  Inputs,
  errorsInput,
  Categories,
} from '../../types';
import ColorCircle from '../colorCircle/ColorCircle';

function deepEqualError(a: errorsInput) {
  return JSON.stringify(a) === JSON.stringify({
    name: '',
    price: '',
    categories: '',
    color: '',
    size: '',
    stock: '',
    rating: '',
    description: '',
    picture: '',
  });
};

function validate(input: Inputs) {
  const errors : errorsInput = {
    name: '',
    price: '',
    categories: '',
    color: '',
    size: '',
    stock: '',
    rating: '',
    description: '',
    picture: '',
  };
  if (!input.name) {
    errors.name = 'Name is required';
  }

  if (!input.price) {
    errors.price = 'Price is required';
  }

  if (!input.categories.length) {
    errors.categories = 'categories are required';
  };

  if (!input.color.length) {
    errors.color = 'colors are required';
  }

  if (input.size === '0') {
    errors.size = 'size is required';
  }

  if (!input.stock) {
    errors.stock = 'stock is required';
  }

  if (!input.rating) {
    errors.rating = 'rating is required';
  }

  if (!input.description) {
    errors.description = 'description is required';
  }

  if (!input.picture) {
    errors.picture = 'picture is required';
  }
  return errors;
};

const FormCreateProduct = () => {
  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, []);
  const dispatch = useAppDispatch();
  const productCats = useAppSelector(productCategories);
  const [color, setColor] = useState('');
  const [errors, setErrors] = useState<errorsInput>({
    name: '',
    price: '',
    categories: '',
    color: '',
    size: '',
    stock: '',
    rating: '',
    description: '',
    picture: '',
  });
  const [input, setInput] =
    useState<Inputs>({
      name: '',
      price: 0,
      categories: [],
      color: [],
      size: '0',
      stock: 0,
      rating: 0,
      description: '',
      picture: '',
      available: true,
    });
  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const handleSubmit = (e: formData) => {
    e.preventDefault();
    if (deepEqualError(errors)) {
      dispatch(sendFormAsync(input));
    } else {
      alert('Complete the requires spaces!');
    }
  };
  const handleChange = (e: formInputData) => {
    let data: string | number = e.target.value;
    if (e.target.name === 'rating' ||
    e.target.name === 'stock') {
      data = parseFloat(data);
    }
    setInput({...input, [e.target.name]: data});
  };

  const addColor = (color: string) => {
    const repColor = input.color.find((el: string) => el === color);
    if (!repColor) {
      const newcolor = [...input.color, color];
      setInput({...input, color: newcolor});
    }
  };
  const handleTextAreaChange = (e: formTextAreaData) => {
    setInput({...input, [e.target.name]: e.target.value});
  };
  const handleSelectChange = (e: any) : void => {
    const data = e.map((el: Categories) => {
      return el.value;
    });
    setInput({...input, categories: data});
  };
  return (
    <div className='formCreateProductGrid'>
      <form className='formCreateProductForm' onSubmit={handleSubmit}>
        <div className='formCreateProductUrlPicture'>
          <label className='formCreateProductLabel'
            htmlFor="">Product URL picture</label>
          <input
            className='formCreateProductInput'
            type="text"
            value={input.picture}
            name="picture"
            onChange={handleChange}
          />
          <p className='formCreateProductError'>{errors.picture}</p>
        </div>
        <div className='formCreateProductName'>
          <label className='formCreateProductLabel'
            htmlFor="">Product name</label>
          <input
            className='formCreateProductInput'
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          <p className='formCreateProductError'>{errors.name}</p>
        </div>
        <div className='formCreateProductPrice'>
          <label className='formCreateProductLabel'
            htmlFor="">Product price
          </label>
          <input
            className='formCreateProductInput'
            type="number"
            value={input.price}
            step="0.1"
            name = "price"
            min="0"
            onChange={handleChange}
          />
          <p className='formCreateProductError'>{errors.price}</p>
        </div>
        <div className='formCreateProductStock'>
          <label className='formCreateProductLabel'
            htmlFor="">Product stock
          </label>
          <input
            className='formCreateProductInput'
            type="number"
            value={input.stock}
            name = "stock"
            min="0"
            onChange={handleChange}
          />
          <p className='formCreateProductError'>{errors.stock}</p>
        </div>
        <div className='formCreateProductSize'>
          <label className='formCreateProductLabel'
            htmlFor="">Product size
          </label>
          <input
            className='formCreateProductInput'
            type="number"
            value={input.size}
            name = "size"
            min="0"
            onChange={handleChange}
          />
          <p className='formCreateProductError'>{errors.size}</p>
        </div>
        <div className='formCreateProductColor'>
          <label className='formCreateProductLabel'
            htmlFor="">Product color
          </label>
          <div className='formCreateProductColorBalls'>
            {input.color.length ?
              input.color.map((el) => <ColorCircle key={el} color={el}
                onClick={() => {
                  const toChange = input.color.filter((color) => el !== color);
                  setInput({...input, color: toChange});
                }}/>) :
            null}
          </div>
          <input
            className='formCreateProductInput'
            type="color"
            value={input.color}
            name = "color"
            onChange={(e)=> setColor(e.target.value)}
          />
          <input className='formCreateProductColorButton'
            type="button"
            value="add color"
            onClick={() => addColor(color)} />
          <p className='formCreateProductError'>{errors.color}</p>
        </div>
        <div className='formCreateProductDescription'>
          <label className='formCreateProductLabel'
            htmlFor="">Product description
          </label>
          <textarea className='formCreateProductDescriptionTextArea'
            value={input.description}
            name = "description"
            onChange={handleTextAreaChange}
          >
          </textarea>
          <p className='formCreateProductError'>{errors.description}</p>
        </div>
        <div className='formCreateProductRating'>
          <label className='formCreateProductLabel'
            htmlFor="">Product rating
          </label>
          <input
            className='formCreateProductInput'
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={input.rating}
            name = "rating"
            onChange={handleChange}
          />
          <p className='formCreateProductError'>{errors.rating}</p>
        </div>
        <div className='formCreateProductSelector'>
          <Select
            className='formCreateProductInput'
            isMulti
            name="categories"
            options={productCats}
            onChange={handleSelectChange}
          >
          </Select>
          <p className='formCreateProductError'>{errors.categories}</p>
        </div>
        <input
          className='formCreateProductButtonCreate'
          type="submit"
          value="Create"
        />
      </form>
    </div>
  );
};

export default FormCreateProduct;

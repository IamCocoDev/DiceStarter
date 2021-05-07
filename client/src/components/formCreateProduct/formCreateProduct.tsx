import React, {useState, useEffect} from 'react';
// import {useAppDispatch} from '../../app/hooks';
import {useAppDispatch} from '../../app/hooks';
import {sendFormAsync} from '../../app/reducers/formSlice';

import Select from 'react-select';
import {
  formData,
  formInputData,
  formTextAreaData,
  Inputs,
  Categories,
  errorsInput,
} from '../../types';

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
  const dispatch = useAppDispatch();
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

  const Cate: Categories[] =
    [{value: 'D&D 5e', label: 'D&D 5e'},
      {value: 'D&D 3.5', label: 'D&D 3.5'},
      {value: 'Pathfinder', label: 'Pathfinder'}];

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
    setInput({...input, categories: e});
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Product URL picture</label>
          <input
            type="text"
            value={input.picture}
            name="picture"
            onChange={handleChange}
          />
          <p>{errors.picture}</p>
        </div>
        <div>
          <label htmlFor="">Product name</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          <p>{errors.name}</p>
        </div>
        <div>
          <label
            htmlFor="">Product price
          </label>
          <input
            type="number"
            value={input.price}
            step="0.1"
            name = "price"
            min="0"
            onChange={handleChange}
          />
          <p>{errors.price}</p>
        </div>
        <div>
          <label
            htmlFor="">Product stock
          </label>
          <input
            type="number"
            value={input.stock}
            name = "stock"
            min="0"
            onChange={handleChange}
          />
          <p>{errors.stock}</p>
        </div>
        <div>
          <label
            htmlFor="">Product size
          </label>
          <input
            type="number"
            value={input.size}
            name = "size"
            min="0"
            onChange={handleChange}
          />
          <p>{errors.size}</p>
        </div>
        <div>
          <label
            htmlFor="">Product color
          </label>
          {input.color.length ?
            input.color.map((el) => <p key={el}
              style={{'color': el}} >{el}</p>) :
            null}
          <input
            type="color"
            value={input.color}
            name = "color"
            onChange={(e)=> setColor(e.target.value)}
          />
          <input type="button"
            value="add color"
            onClick={() => addColor(color)} />
        </div>
        <p>{errors.color}</p>
        <div>
          <label
            htmlFor="">Product description
          </label>
          <textarea
            value={input.description}
            name = "description"
            onChange={handleTextAreaChange}
          >
          </textarea>
          <p>{errors.description}</p>
        </div>
        <div>
          <label
            htmlFor="">Product rating
          </label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={input.rating}
            name = "rating"
            onChange={handleChange}
          />
          <p>{errors.rating}</p>
        </div>
        <div>
          <Select
            isMulti
            name="categories"
            options={Cate}
            className="formCreateProductSelector"
            onChange={handleSelectChange}
          >
          </Select>
          <p>{errors.categories}</p>
        </div>
        <input
          type="submit"
          value="Create"
        />
      </form>
      <button onClick={() => {
        setInput({
          name: 'Nuevo',
          price: 5,
          categories: [{value: 'D&D 5e', label: 'D&D 5e'}],
          color: ['#030303'],
          size: '200',
          stock: 200,
          rating: 4,
          description: 'Dasdkjalsdjlaskd',
          picture: 'Dalsdkjalksdjl',
          available: true,
        });
      }}>Set new product</button>
    </div>
  );
};

export default FormCreateProduct;

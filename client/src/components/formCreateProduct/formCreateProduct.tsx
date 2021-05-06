import React, {useState, useEffect} from 'react';
// import {useAppDispatch} from '../../app/hooks';
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
    colors: '',
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
    colors: '',
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
  }

  if (!input.colors.length) {
    errors.colors = 'colors are required';
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
  // const dispatch = useAppDispatch();
  const [color, setColor] = useState('');
  const [errors, setErrors] = useState<errorsInput>({
    name: '',
    price: '',
    categories: '',
    colors: '',
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
      colors: [],
      size: '0',
      stock: 0,
      rating: 0,
      description: '',
      picture: '',
    });
  useEffect(() => {
    console.log(input);
    setErrors(validate(input));
  }, [input]);

  const Cate: Categories[] =
    [{value: 'D&D 5e', label: 'D&D 5e'},
      {value: 'D&D 3.5', label: 'D&D 3.5'},
      {value: 'Pathfinder', label: 'Pathfinder'}];
  const handleSubmit = (e: formData) => {
    e.preventDefault();
    console.log(errors);
    if (deepEqualError(errors)) {
      alert('1111');
    } else {
      alert('Comple the requires spaces!');
    }
  };
  const handleChange = (e: formInputData) => {
    let data: string | number = e.target.value;
    if (e.target.name === 'rating' ||
    e.target.name === 'stock' ||
    e.target.name === 'price') {
      data = parseFloat(data);
    }
    setInput({...input, [e.target.name]: data});
  };

  const addColor = (color: string) => {
    const repColor = input.colors.find((el: string) => el === color);
    if (!repColor) {
      const newcolor = [...input.colors, color];
      setInput({...input, colors: newcolor});
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
          {input.colors.length ?
            input.colors.map((el) => <p key={el}
              style={{'color': el}} >{el}</p>) :
            null}
          <input
            type="color"
            value={input.colors}
            name = "colors"
            onChange={(e)=> setColor(e.target.value)}
          />
          <input type="button"
            value="add color"
            onClick={() => addColor(color)} />
        </div>
        <p>{errors.colors}</p>
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
    </div>
  );
};

export default FormCreateProduct;

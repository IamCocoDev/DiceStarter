import React, {useState, useEffect} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {saveForm} from '../../app/reducers/formSlice';
import Select from 'react-select';
import {
  formData,
  formInputData,
  formTextAreaData,
  Inputs,
  Categories,
  errorsInput,
} from '../../types';

export function validate(input: Inputs) {
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
    errors.name = 'name is required';
  }

  if (!input.price) {
    errors.price = 'price is required';
  }
  return errors;
};

const FormCreateProduct = () => {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('');
  // const [errors, setErrors] = useState();
  const [input, setInput] =
    useState<Inputs>({
      name: '',
      price: 0,
      categories: [],
      colors: [],
      size: '',
      stock: 0,
      rating: 0,
      description: '',
      picture: '',
    });
  useEffect(() => {
    console.log(input);
  }, [input]);


  const Cate: Categories[] =
    [{value: 'D&D 5e', label: 'D&D 5e'},
      {value: 'D&D 3.5', label: 'D&D 3.5'},
      {value: 'Pathfinder', label: 'Pathfinder'}];
  const handleSubmit = (e: formData) => {
    e.preventDefault();
    dispatch(saveForm(input));
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
        </div>
        <div>
          <label htmlFor="">Product name</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
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
        </div>
        <div>
          <label
            htmlFor="">Product color
          </label>
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

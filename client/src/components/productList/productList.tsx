import React, {useState, useEffect} from 'react';
import {
  ProductRes, formInputData, formTextAreaData,
  Categories,
} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  changeProductInDBAsync, deleteProductByIdAsync}
  from '../../app/reducers/handleProductsSlice';
import {
  productCategories,
} from '../../app/reducers/handleProductsSlice';
import ColorCircle from '../colorCircle/ColorCircle';
import './productList.css';
import Select from 'react-select';

function ProductList(props: ProductRes): JSX.Element {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('');
  const [available, setAvailable] = useState('true');
  const productCats = useAppSelector(productCategories);
  const [categories, setCategories] = useState<Categories[]>();
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
    categories: [],
  });

  useEffect(() => {
    setInput(props);
    if (input.available) {
      setAvailable('true');
    } else {
      setAvailable('false');
    }
    const myCategories = props.categories.map((el) => {
      return {
        value: el.id,
        label: el.name,
      };
    });
    // const inputCategories = props.categories.map((el) => el.id);
    setInput({...input, categories: props.categories});
    setCategories(myCategories);
  }, []);

  const handleSelectChange = (e: any) : void => {
    setCategories(e);
    const data = e.map((el: Categories) => {
      return el.value;
    });
    setInput({...input, categories: data});
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

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
        options={productCats}
        value={categories}
        onChange={handleSelectChange}
        defaultValue={categories}
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
      <div className="productListAvailable" >
        <select name=""
          value={available}
          onChange={(e) => setAvailable(e.target.value)}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <input
        className="productListSize"
        type="text"
        placeholder={'Size'}
        value={input.size}
        name="size"
        step="0.1"
        onChange={handleNumberChange}
      >
      </input>
      <div className='productListColors'>
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
      <input
        className="productListImageUrl"
        type="text"
        placeholder={'Image'}
        value={input.picture}
        name="picture"
        onChange={handleNumberChange}
      ></input>
      <button className="productsListEditButton" onClick={() => {
        if (window.confirm(`Save changes to ${input.name}?`)) {
          dispatch(changeProductInDBAsync(input));
        }
      }}>Save Changes</button>
      <button className="productsListDeleteButton" onClick={() => {
        if (window.confirm(`Are you sure you want to delete ${input.name}?`)) {
          dispatch(deleteProductByIdAsync(input.id));
        }
      }}>
        Delete This Product
      </button>
    </div>
  );
}

export default ProductList;

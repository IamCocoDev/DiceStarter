import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {sendFormAsync} from '../../app/actions/formActions/index';
import {
  getCategoriesAsync,
} from '../../app/actions/handleProductsActions/index';
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
import {productCategories} from '../../app/reducers/handleProductsReducer';
import {userInfo, userToken} from '../../app/reducers/registerReducer';
import swal from 'sweetalert';
import {storage} from '../../firebase';


function deepEqualError(a: errorsInput) {
  return JSON.stringify(a) === JSON.stringify({
    name: '',
    price: '',
    categories: '',
    color: '',
    size: '',
    stock: '',
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
    errors.categories = 'Categories are required';
  };

  if (!input.color.length) {
    errors.color = 'Colors are required';
  }

  if (input.size === '0') {
    errors.size = 'Size is required';
  }

  if (!input.stock) {
    errors.stock = 'Stock is required';
  }

  if (!input.description) {
    errors.description = 'Description is required';
  }

  if (!input.picture.length) {
    errors.picture = 'Picture is required';
  }
  return errors;
};

const FormCreateProduct = () => {
  const dispatch = useAppDispatch();
  const [redirect, setRedirect] = useState(false);
  const user = useAppSelector(userInfo);
  const token = useAppSelector(userToken);
  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [redirect]);
  const productCats = useAppSelector(productCategories);
  const [color, setColor] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState<errorsInput>({
    name: '',
    price: '',
    categories: '',
    color: '',
    size: '',
    stock: '',
    description: '',
    picture: '',
  });
  const [input, setInput] =
    useState<Inputs>({
      name: '',
      price: '0',
      categories: [],
      color: [],
      size: '0',
      stock: 0,
      description: '',
      picture: [],
      available: true,
    });
  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const handleSubmit = (e: formData) => {
    e.preventDefault();
    if (deepEqualError(errors)) {
      swal({
        title: 'Succesfully created!',
        icon: 'success',
      });
      dispatch(sendFormAsync(input, token));
      setInput({
        name: '',
        price: '0',
        categories: [],
        color: [],
        size: '0',
        stock: 0,
        description: '',
        picture: [],
        available: true,
      });
      setRedirect(true);
    } else {
      swal({
        text: 'Complete the required spaces!',
        icon: 'info',
      });
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
  const handlePictureChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handlePictureUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
              .ref('images')
              .child(image.name)
              .getDownloadURL()
              .then((u) => {
                console.log(u);
                setInput({...input, picture: [...input.picture, u]});
              });
        },
    );
  };

  return (
    user.role === 'Admin' ?
    <div className='formCreateProductGrid'>
      {
        redirect === true && <Redirect to={`/home`}></Redirect>
      }
      <form className='formCreateProductForm' onSubmit={handleSubmit}>
        <div className='formCreateProductUrlPicture'>
          <input type="file" onChange={handlePictureChange} required />
          <button onClick={handlePictureUpload}>Upload</button>
          <p className='formCreateProductError'>{errors.picture}</p>
        </div>
        <div className='formCreateProductName'>
          <label className='formCreateProductLabel'
            htmlFor="">Name</label>
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
            htmlFor="">Price
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
            htmlFor="">Stock
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
            htmlFor="">Size
          </label>
          <input
            className='formCreateProductInput'
            type="text"
            value={input.size}
            name = "size"
            onChange={handleChange}
          />
          <p className='formCreateProductError'>{errors.size}</p>
        </div>
        <div className='formCreateProductColor'>
          <label className='formCreateProductLabel'
            htmlFor="">Color
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
            className='formCreateProductColorSelector'
            type="color"
            value={input.color}
            name = "color"
            onChange={(e)=> setColor(e.target.value)}
          />
          <input className='formCreateProductColorButton'
            type="button"
            value="Add Color"
            onClick={() => addColor(color)} />
          <p className='formCreateProductError'>{errors.color}</p>
        </div>
        <div className='formCreateProductDescription'>
          <label className='formCreateProductLabel'
            htmlFor="">Description
          </label>
          <textarea className='formCreateProductDescriptionTextArea'
            value={input.description}
            name = "description"
            onChange={handleTextAreaChange}
          >
          </textarea>
          <p className='formCreateProductError'>{errors.description}</p>
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
    </div> :
    <div>401 Not Authorized</div>
  );
};

export default FormCreateProduct;

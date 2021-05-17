import React, {useState} from 'react';

import {useAppDispatch} from '../../app/hooks';
import {addCategoryAsync} from '../../app/actions/handleProductsActions/index';
import {formData} from '../../types';
import './formCategoryCreation.css';

const FormCategoryCreation = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const handleSubmit = (e: formData) => {
    e.preventDefault();
    dispatch(addCategoryAsync(input));
  };
  return (
    <div className='formCategoryCreationFlex'>
      <form className='formCategoryCreationGrid' onSubmit={handleSubmit}>
        <input className='formCategoryCreationName' placeholder='Category Name'
          type="text" onChange={(e) => setInput(e.target.value)} />
        <input className='formCategoryCreationSubmit'
          type="submit" />
      </form>
    </div>
  );
};

export default FormCategoryCreation;

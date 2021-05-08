import React, {useState} from 'react';

import {useAppDispatch} from '../../app/hooks';
import {addCategoryAsync} from '../../app/reducers/handleProductsSlice';
import {formData} from '../../types';

const FormCategoryCreation = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const handleSubmit = (e: formData) => {
    e.preventDefault();
    dispatch(addCategoryAsync(input));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setInput(e.target.value)} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default FormCategoryCreation;

import React, {useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addCategoryAsync} from '../../app/actions/handleProductsActions/index';
import {formData} from '../../types';
import {userInfo, userToken} from '../../app/reducers/registerReducer';
import './formCategoryCreation.css';
import swal from 'sweetalert';

const FormCategoryCreation = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userInfo);
  const token = useAppSelector(userToken);
  const [input, setInput] = useState('');
  const handleSubmit = (e: formData) => {
    e.preventDefault();
    // flag prevents doing wrong requests
    let flag = true;
    if (input === '') {
      flag = false;
      return swal({
        text: 'Insert a category name!',
        icon: 'info',
      });
    }
    flag === true && dispatch(addCategoryAsync(input, token));
  };
  return (
    user.role === 'Admin' ?
    <div className='formCategoryCreationFlex'>
      <form className='formCategoryCreationGrid' onSubmit={handleSubmit}>
        <input className='formCategoryCreationName' placeholder='Category Name'
          type="text" onChange={(e) => setInput(e.target.value)} />
        <input className='formCategoryCreationSubmit'
          type="submit" />
      </form>
    </div> :
    <div>401 Not Authorized</div>
  );
};

export default FormCategoryCreation;

/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {userToken} from '../../../app/reducers/registerReducer';
import {putCategory, deleteCategory} from
  '../../../app/actions/handleProductsActions';
import './categoriesList.css';

const CategoriesList = (props) => {
  const [input, setInput] = useState(props.name);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const handleClick = (e) => {
    e.preventDefault();
    const newcategory = {
      name: input,
    };
    console.log(token);
    dispatch(putCategory(props.name, newcategory, token));
  };
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteCategory(props.name, token));
  };
  return (
    <div className='categoriesListAll'>
      <input className='categoriesListName' type="text" value={input}
        onChange={(e) => setInput(e.target.value)} />
      <button className='categoriesListSave' onClick={handleClick}>
        <i className='material-icons'>save</i>
      </button>
      <button className='categoriesListDelete' onClick={handleDelete}>
        <i className='material-icons'>delete</i>
      </button>
    </div>
  );
};

export default CategoriesList;

/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {userToken} from '../../../app/reducers/registerReducer';
import {putCategory, deleteCategory} from
  '../../../app/actions/handleProductsActions';
import './categoriesList.css';
import swal from 'sweetalert2';

const CategoriesList = (props) => {
  const [input, setInput] = useState(props.name);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const handleClick = (e) => {
    e.preventDefault();
    swal.fire({
      text: 'Category updated!',
      icon: 'success',
      background: '#202020',
    });
    const newcategory = {
      name: input,
    };
    dispatch(putCategory(props.name, newcategory, token));
  };
  const handleDelete = (e) => {
    e.preventDefault();
    swal.fire({
      title: 'Delete Category?',
      text: 'Are you sure you want to delete this Category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#74009D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      background: '#202020',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(props.name, token));
        swal.fire({
          text: 'Category deleted!',
          icon: 'info',
          background: '#202020',
        });
      }
    }).catch((err) => console.error(err));
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

import React, {useEffect, useState} from 'react';
import {formInputData} from '../../types';
import './searchBar.css';
import {useAppDispatch} from '../../app/hooks';
import {getProductsAsync} from '../../app/actions/handleProductsActions';

function searchBar(props: {filter? : string, sort?: string}): JSX.Element {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');

  const handleChange = (e: formInputData) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    dispatch(getProductsAsync({name: input, page: 1,
      filter: props.filter, sort: props.sort}));
  }, [input]);
  return (
    <form className='searchBarFlex'>
      <input type="text" placeholder='Busca tu juego favorito'
        onChange={handleChange}
        value={input}
        className="searchBarText" />
      <button className='searchBarButton'>
        <i className='material-icons'>search</i>
      </button>
    </form>
  );
}

export default searchBar;

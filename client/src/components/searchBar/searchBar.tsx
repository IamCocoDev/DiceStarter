import React, {useState} from 'react';
import './searchBar.css';
import {useAppDispatch} from '../../app/hooks';
import {getProductsAsync} from '../../app/reducers/handleProductsSlice';

type formData = React.FormEvent<HTMLElement>;

function searchBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');

  const handleSubmit = (e: formData) => {
    e.preventDefault();
    console.log(input);
    dispatch(getProductsAsync());
  };

  return (
    <form className='searchBarFlex' onSubmit={handleSubmit}>
      <input type="text" placeholder='Busca tu juego favorito'
        onChange={(e) => setInput(e.target.value)}
        className="searchBarText" />
      <button className='searchBarButton'>
        <i className='material-icons'>search</i>
      </button>
    </form>
  );
}

export default searchBar;

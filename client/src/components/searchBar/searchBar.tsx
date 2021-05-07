import React, {useState, useEffect} from 'react';
import {productsAsing, formData, formInputData} from '../../types';
import './searchBar.css';

const products : Array<productsAsing> = [{
  id: 1,
  name: 'Vampiro la mascarada Edición 20 aniversario',
  price: '$1800',
  image: 'https://juegosmesaparados.com/wp-content/plugins/aawp/public/image.php?url=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTEzeCt2aEFuNUwuanBn',
},
{
  id: 2,
  name: 'Dragon Quest',
  price: '$40',
  image: 'https://juegosmesaparados.com/wp-content/plugins/aawp/public/image.php?url=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFFWDVXMWFvQUwuanBn',
},
{
  id: 3,
  name: 'Knights Fight',
  price: '$60',
  image: 'https://juegosmesaparados.com/wp-content/plugins/aawp/public/image.php?url=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFFWDVXMWFvQUwuanBn',
},
{
  id: 4,
  name: 'La Mascarada',
  price: '$1500',
  image: 'https://juegosmesaparados.com/wp-content/plugins/aawp/public/image.php?url=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTEzeCt2aEFuNUwuanBn',
},
{
  id: 5,
  name: 'Hellora juego de rol',
  price: '$300',
  image: 'https://juegosmesaparados.com/wp-content/plugins/aawp/public/image.php?url=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTEzeCt2aEFuNUwuanBn',
},
{
  id: 6,
  name: 'El mago de Fuego',
  price: '$530',
  image: 'https://juegosmesaparados.com/wp-content/plugins/aawp/public/image.php?url=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTEzeCt2aEFuNUwuanBn',
}];

const filter = (search: string, list: productsAsing[] = products) => {
  const result = list.filter((el: productsAsing) =>
    el.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
  return result;
};

function searchBar(): JSX.Element {
  const [input, setInput] = useState('');
  const [listProduct, setListProduct] = useState(products);

  useEffect(() => {
    console.log(listProduct);
  }, [listProduct]);

  const handleChange = (e: formInputData) => {
    setInput(e.target.value);
    setListProduct(filter(e.target.value));
  };

  const handleSubmit = (e: formData) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <form className='searchBarFlex' onSubmit={handleSubmit}>
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

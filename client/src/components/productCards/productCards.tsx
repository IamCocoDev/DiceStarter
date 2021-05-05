import React from 'react';
import './productCards.css';
import ProductCard from '../productCard/productCard';


type productsAsing = {id:number, name: string, price: string, image:string}

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


function ProductCards() {
  return (
    <div className='productCardsFlex'>
      {
        products.map((product, index) => (
          <div key={index}>
            <ProductCard
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          </div>
        ))
      }
    </div>
  );
}
export default ProductCards;

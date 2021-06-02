import React, {useEffect, useState} from 'react';
import './highlightedProducts.css';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {productHighlights} from '../../../app/reducers/handleProductsReducer';
import {getBestProducts} from
  '../../../app/actions/handleProductsActions/index';
import HighlightedProduct from '../highlightedProduct/highlightedProduct';

const HighlightedProducts = () => {
  const [firstItem, setFirstItem] = useState(0);
  // const [middleItem, setMiddeleItem] = useState(2);
  const [lastItem, setLastItem] = useState(3);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBestProducts());
  }, []);
  const bestProducts = useAppSelector(productHighlights);
  const highlights = bestProducts?.slice(firstItem, lastItem);
  // input ruleta carrusel: ([1, 2, 3])
  // output ruleta carrusel: ([3, 2, 1])
  const changeFirstItem = () => {
    if (firstItem === 0) {
      setFirstItem(2);
      setLastItem(5);
    } else {
      setFirstItem(firstItem - 1);
      setLastItem(lastItem - 1);
    }
  };
  const changeLastItem = () => {
    if (lastItem === 5) {
      setFirstItem(0);
      setLastItem(3);
    } else {
      setLastItem(lastItem + 1);
      setFirstItem(firstItem + 1);
    }
  };
  return (
    highlights !== undefined &&
    <div className='HighlightedProductsGeneral'>
      <div className='HighlightedProductsAll'>
        <button onClick={changeFirstItem}
          className='material-icons HighlightedProductsButtonBackward'>
          chevron_left
        </button>
        {
          highlights !== undefined && highlights.map((p, i) => (
            <HighlightedProduct key={i}
              id={p.id}
              name={p.name}
              rating={p.rating}
              picture={p.picture}
              price={parseFloat(p.price).toFixed(2)}
              priceDiscount={p.priceDiscount ?
                parseFloat(p.priceDiscount).toFixed(2) : null}
            />
          ))
        }
        <button onClick={changeLastItem}
          className='material-icons HighlightedProductsButtonForward'>
        chevron_right
        </button>
      </div>

    </div>
  );
};

export default HighlightedProducts;

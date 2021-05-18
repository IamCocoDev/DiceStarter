import React, {useEffect, useState} from 'react';

import './productsList.css';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  productsList,
  totalPages,
  productCategories,
} from '../../app/reducers/handleProductsReducer';
import ProductList from '../productList/productList';
import {Categories, SearchInput} from '../../types';
import Select from 'react-select';
import {getCategoriesAsync, getProductsAsync} from
  '../../app/actions/handleProductsActions';
const sortType: Array<Categories> = [{
  value: '',
  label: 'None',
}, {
  value: 'A-Z',
  label: 'A-Z',
}, {
  value: 'Z-A',
  label: 'Z-A',
},
{
  value: 'maxPrice',
  label: 'maxPrice',
},
{
  value: 'minPrice',
  label: 'minPrice',
},
{
  value: 'maxRating',
  label: 'maxRating',
},
{
  value: 'minRating',
  label: 'minRating',
},
];
// 10 product properties without counting id
function ProductsList() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductsAsync({name: filters.name,
      page: filters.page, filter: filters.filter, sort: filters.sort}));
    dispatch(getCategoriesAsync());
  }, []);
  const adminProducts = useAppSelector(productsList);
  const pagesTotal = useAppSelector(totalPages);
  const categories = useAppSelector(productCategories);
  const categoriesCopy = [...categories];
  categoriesCopy.unshift({value: '', label: 'None'});

  const [filters, setFilters] = useState<SearchInput>({
    name: '',
    page: 1,
    filter: '',
    sort: '',
  });

  const onClickPage = (step: number) => {
    dispatch(getProductsAsync({
      name: filters.name,
      page: filters.page + step,
      filter: filters.filter,
      sort: filters.sort,
    }));
    setFilters({...filters, page: filters.page + step});
  };

  return (
    <div className='productsListBackground'>
      <div className='selectDiv'>
        <Select
          className='select'
          options={sortType}
          placeholder='Choose your order...'
          onChange={(e) => {
            setFilters({...filters, sort: e?.label});
            dispatch(getProductsAsync({name: filters.name,
              page: filters.page, filter: filters.filter, sort: e?.label}));
          }}
        ></Select>
        <Select
          className='select'
          options={categoriesCopy}
          placeholder='Choose your sort...'
          onChange={(e) => {
            setFilters({...filters, filter: e?.value});
            dispatch(getProductsAsync({name: filters.name,
              page: filters.page, filter: e?.value, sort: filters.sort}));
          }}
        ></Select>
      </div>
      <div className="productsListGrid">
        <h1 className='productsListName'>Name</h1>
        <h1 className='productsListPrice'>Price</h1>
        <h1 className='productsListCategories'>Categories</h1>
        <h1 className='productsListDescription'>Description</h1>
        <h1 className='productsListStock'>Stock</h1>
        <h1 className='productsListSize'>Size</h1>
        <h1 className='productsListColors'>Colors</h1>
        <h1 className='productsListImageUrl'>Image Url</h1>
      </div>
      <div>
        { adminProducts !== null &&
        adminProducts.map((listProduct) => (
          <ProductList
            key={listProduct.id}
            categories={listProduct.categories}
            name={listProduct.name}
            price={listProduct.price}
            id={listProduct.id}
            picture={listProduct.picture}
            description={listProduct.description}
            color={listProduct.color}
            available={listProduct.available}
            stock={listProduct.stock}
            size={listProduct.size}
          />
        ))}
      </div>
      <div style={{'display': 'flex', 'justifyContent': 'center'}}>
        {filters.page > 1 ?
        <button style={{'border': '2px solid black'}}
          onClick={() => onClickPage(-1)}>
          Previous</button> : null}
        {pagesTotal > filters.page ?
        <button style={{'border': '2px solid black'}}
          onClick={() => onClickPage(1)}>
          Next</button> : null}
      </div>
    </div>
  );
}

export default ProductsList;

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
import {userInfo} from '../../app/reducers/registerReducer';
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
  const user = useAppSelector(userInfo);
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
    user.role === 'Admin' ?
    <div className='productsListBackground'>
      <div className='selectDiv'>
        <Select
          className='select'
          options={sortType}
          placeholder='Choose your order...'
          onChange={(e) => {
            setFilters({...filters, sort: e.label});
            dispatch(getProductsAsync({name: filters.name,
              page: filters.page, filter: filters.filter, sort: e.label}));
          }}
        ></Select>
        <Select
          className='select'
          options={categoriesCopy}
          placeholder='Choose your sort...'
          onChange={(e) => {
            setFilters({...filters, filter: e.value});
            dispatch(getProductsAsync({name: filters.name,
              page: filters.page, filter: e.value, sort: filters.sort}));
          }}
        ></Select>
      </div>
      <div className="productsListGrid">
        <div className='productsListLabels'>
          <span className='productsListName'>Name</span>
          <span className='productsListPrice'>Price</span>
          <span className='productsListCategories'>Categories</span>
          <span className='productsListDescription'>Description</span>
          <span className='productsListStock'>Stock</span>
          <span className='productsListSize'>Size</span>
          <span className='productsListColors'>Colors</span>
          <span className='productsListImageUrl'>Image Url</span>
        </div>
        <div className='productsListProducts'>
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
      </div>
      <div style={{'display': 'flex', 'justifyContent': 'center'}}>
        {filters.page > 1 ?
        <button className='productsPages' style={{'border': '2px solid black'}}
          onClick={() => onClickPage(-1)}>
          Previous</button> : null}
        {pagesTotal > filters.page ?
        <button className='productsPages' style={{'border': '2px solid black'}}
          onClick={() => onClickPage(1)}>
          Next</button> : null}
      </div>
    </div> :
    <div>401 Not Authorized</div>
  );
}

export default ProductsList;

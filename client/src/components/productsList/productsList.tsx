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
import SearchBar from '../searchBar/searchBar';
import {getCategoriesAsync, getProductsAsync} from
  '../../app/actions/handleProductsActions';
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

  const sortType: Array<Categories> = [{
    value: 1,
    label: 'A-Z',
  }, {
    value: 2,
    label: 'Z-A',
  },
  {
    value: 3,
    label: 'maxPrice',
  },
  {
    value: 4,
    label: 'minPrice',
  },
  {
    value: 5,
    label: 'maxRating',
  },
  {
    value: 6,
    label: 'minRating',
  },
  ];

  return (
    <div>
      <div className='searchBarDiv'>
        <SearchBar />
      </div>
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
          options={categories}
          placeholder='Choose your sort...'
          onChange={(e) => {
            console.log(categories);
            setFilters({...filters, filter: e?.label});
            dispatch(getProductsAsync({name: filters.name,
              page: filters.page, filter: e?.label, sort: filters.sort}));
          }}
        ></Select>
      </div>
      <div className="productsListGrid">
        <h1 className='productsListName'>Name</h1>
        <h1 className='productsListPrice'>Price</h1>
        <h1 className='productsListCategories'>Categories</h1>
        <h1 className='productsListDescription'>Description</h1>
        <h1 className='productsListRating'>Rating</h1>
        <h1 className='productsListStock'>Stock</h1>
        <h1 className='productsListAvailable'>Available</h1>
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
            rating={listProduct.rating}
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

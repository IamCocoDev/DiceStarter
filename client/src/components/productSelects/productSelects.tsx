import React, {useState, useEffect} from 'react';
import './productSelects.css';
import Select from 'react-select';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {productCategories,
  getCategoriesAsync,
  getProductsAsync} from '../../app/reducers/handleProductsSlice';
import {Categories} from '../../types';

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

const FilterSelect = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const dispatch = useAppDispatch();
  const categories = useAppSelector(productCategories);
  console.log(sort);
  const handleFilterSelectChange = (e: any) => {
    setFilter(e.label);
    dispatch(getProductsAsync({name: '', page: 1, filter: filter, sort: sort}));
  };
  const handleSortSelectChange = (e: any) => {
    setSort(e.label);
    dispatch(getProductsAsync({page: 1, name: '', filter: filter, sort: sort}));
  };
  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, []);
  return (
    <div>{
      <Select
        options={categories}
        onChange={handleFilterSelectChange}
      >
      </Select>
    }
    {
      <Select
        options={sortType}
        onChange={handleSortSelectChange}
      >
      </Select>
    }
    </div>
  );
};
export default FilterSelect;

import React, {useState, useEffect} from 'react';
import './productSelects.css';
import Select from 'react-select';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  getCategoriesAsync,
  getProductsAsync} from '../../app/actions/handleProductsActions';
import {Categories} from '../../types';
import {productCategories} from '../../app/reducers/handleProductsReducer';

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
  const handleFilterSelectChange = (e: any) => setFilter(e.label);
  const handleSortSelectChange = (e: any) => setSort(e.label);
  useEffect(() => {
    dispatch(getCategoriesAsync());
    dispatch(getProductsAsync({page: 1, name: '', filter: filter, sort: sort}));
  }, [sort, filter]);
  return (
    <div className='productSelectsGrid'>{
      <Select className='productSelectsCateogires'
        options={categories}
        onChange={handleFilterSelectChange}
        placeholder='Choose Your Category...'
      >
      </Select>
    }
    {
      <Select className='productSelectsSortType'
        options={sortType}
        onChange={handleSortSelectChange}
        placeholder='Choose Your Sort...'
      >
      </Select>
    }
    </div>
  );
};
export default FilterSelect;

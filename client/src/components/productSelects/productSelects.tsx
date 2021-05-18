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
  value: 'None',
  label: 'None',
},
{
  value: 'A-Z',
  label: 'A-Z',
}, {
  value: 'A-Z',
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

const FilterSelect = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const dispatch = useAppDispatch();
  const categories = useAppSelector(productCategories);
  const categoriesCopy = [...categories];
  categoriesCopy.unshift({value: '', label: 'None'});
  console.log(categoriesCopy);
  console.log(sortType);
  const handleFilterSelectChange = (e: any) => setFilter(e.value);
  const handleSortSelectChange = (e: any) => setSort(e.value);
  useEffect(() => {
    console.log(filter);
    dispatch(getCategoriesAsync());
    dispatch(getProductsAsync({page: 1, name: '', filter: filter, sort: sort}));
  }, [sort, filter]);
  return (
    <div className='productSelectsGrid'>{
      <Select className='productSelectsCateogires'
        options={categoriesCopy}
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

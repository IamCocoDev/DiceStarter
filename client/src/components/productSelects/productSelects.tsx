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
  id: 0,
},
{
  value: 'A-Z',
  label: 'A-Z',
  id: 0,
}, {
  value: 'Z-Z',
  label: 'Z-A',
  id: 0,
},
{
  value: 'maxPrice',
  label: 'maxPrice',
  id: 0,
},
{
  value: 'minPrice',
  label: 'minPrice',
  id: 0,
},
{
  value: 'maxRating',
  label: 'maxRating',
  id: 0,
},
{
  value: 'minRating',
  label: 'minRating',
  id: 0,
},
];

const style = {
  container: (provided, state) => ({
    ...provided,
    outline: 'none',
    backgroundColor: '#101010',
    color: 'white',
  }),
  control: (provided, state) => ({
    ...provided,
    border: state.isSelected ? 'none' : 'white',
    boxShadow: 'none',
    backgroundColor: '#101010',
    color: 'white',
  }),
  ValueContainer: () => ({
    backgroundColor: '#101010',
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#74009D': '#101010',
    cursor: state.isFocused ? 'pointer': 'default',
    color: 'white',
  }),
  IndicatorsContainer: (provided, state) => ({
    ...provided,
    backgroundColor: '#101010',
    cursor: state.isFocused ? 'pointer': 'default',
    color: 'white',
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: '#101010',
    color: 'white',
  }),
};

const FilterSelect = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const dispatch = useAppDispatch();
  const categories = useAppSelector(productCategories);
  const categoriesCopy = [...categories];
  categoriesCopy.unshift({value: '', label: 'None'});
  const handleFilterSelectChange = (e: any) => setFilter(e.value);
  const handleSortSelectChange = (e: any) => setSort(e.value);
  useEffect(() => {
    if (filter.length > 0 || sort.length > 0) {
      dispatch(getProductsAsync({page: 1, name: '',
        filter: filter, sort: sort}));
    }
    dispatch(getCategoriesAsync());
  }, [sort, filter]);
  return (
    <div className='productSelectsGrid'>
      <Select className='productSelectsCateogires'
        styles={style}
        options={categoriesCopy}
        onChange={handleFilterSelectChange}
        placeholder='Choose Your Category...'
      />
      <Select className='productSelectsSortType'
        styles={style}
        options={sortType}
        onChange={handleSortSelectChange}
        placeholder='Choose Your Sort...'
      />
    </div>
  );
};
export default FilterSelect;

import React, {useState, useEffect} from 'react';
import './filterSelect.css';
import Select from 'react-select';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {productCategories,
  getCategoriesAsync,
  getProductsAsync} from '../../app/reducers/handleProductsSlice';

const FilterSelect = () => {
  const [filter, setFilter] = useState('');
  const dispatch = useAppDispatch();
  const categories = useAppSelector(productCategories);
  console.log(categories);
  const handleSelectChange = (e: any) => {
    setFilter(e.label);
    dispatch(getProductsAsync({name: '', page: 1, filter: filter}));
  };
  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, []);
  return (
    <div>{
      <Select
        options={categories}
        onChange={handleSelectChange}
      >
      </Select>
    }
    </div>
  );
};
export default FilterSelect;

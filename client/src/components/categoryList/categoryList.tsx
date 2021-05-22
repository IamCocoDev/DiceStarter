import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  productCategories,
} from '../../app/reducers/handleProductsReducer';
import {
  getCategoriesAsync,
} from '../../app/actions/handleProductsActions/index';
import CategoriesList from '../categoriesList/categoriesList';

const CategoryList = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useAppDispatch();
  const productCats = useAppSelector(productCategories);
  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, []);
  return (
    <div>
      {productCats.length ?
              productCats.map((el) =>
                <CategoriesList key={el.value} name={el.label} />) :
              null}
    </div>
  );
};

export default CategoryList;

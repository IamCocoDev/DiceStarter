import React, {useEffect} from 'react';
import ProductCards from '../productCards/productCards';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {totalPages,
  queryFilter,
  queryName,
  querySort,
  productsList,
} from '../../../app/reducers/handleProductsReducer';
import ProductsSelect from '../productSelects/productSelects';
import Paginate from '../paginate/paginate';
import {getProductsAsync} from '../../../app/actions/handleProductsActions';
import './home.css';
import {getCheckoutTicket} from '../../../app/actions/cartActions/index';
import {userInfo} from '../../../app/reducers/registerReducer';
import {useLocation} from 'react-router-dom';
import HighlightedProducts from '../highlightedProducts/highlightedProducts';
import {getProductsInWishlist} from '../../../app/actions/wishlistActions';
import LoadingScreen from '../../DummyComponents/loadingScreen/loadingScreen';

function Home(props: any) {
  const searchName = useAppSelector(queryName);
  const searchFilter = useAppSelector(queryFilter);
  const searchSort = useAppSelector(querySort);
  const pagesTotal = useAppSelector(totalPages);
  const products = useAppSelector(productsList);
  const User = useAppSelector(userInfo);
  const dispatch = useAppDispatch();
  const status = new URLSearchParams(useLocation().search).get('status');
  const foundQueryNumber = props.location.search.indexOf('=');
  let page = parseInt(props.location.search.slice(foundQueryNumber +1));
  console.log(User);
  useEffect(() => {
    if (!page) page = 1;
    if (page === NaN) page = 1;
    dispatch(getProductsAsync({
      name: searchName,
      page: page,
      filter: searchFilter,
      sort: searchSort,
    }));
  }, [page]);
  useEffect(() => {
    dispatch(getProductsInWishlist(User.id));
    const checkout = props.location.search;
    if (checkout.includes('status')) {
      dispatch(getCheckoutTicket(User.firstName,
          User.lastName, User.email, status));
    }
    window.scrollTo(0, 0);
  }, []);
  return (
    products !== null ?
    <div className='homeBackground'>
      <div className='homeProductCarousel'><HighlightedProducts /></div>
      <ProductsSelect />
      <div className='homeGood'>
        <ProductCards></ProductCards>
        <Paginate page={page} pagesTotal={pagesTotal}/>
      </div>
    </div> :
    <div className='homeLoadingScreen'>
      <LoadingScreen />
    </div>
  );
}

export default Home;

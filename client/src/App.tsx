import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../src/components/home/home';
import Landing from './components/landing/landing';
import NavBar from '../src/components/navBar/navBar';
import ProductDetail from '../src/components/productDetail/productDetail';
import formCreateProduct
  from '../src/components/formCreateProduct/formCreateProduct';
import ProductsList from '../src/components/productsList/productsList';
import './App.css';
import About from './components/about/about';
import CreateButtonRouter
  from '../src/components/createButtonRouter/createButtonRouter';
import listButtonRouter from './components/listButtonRouter/listButtonRouter';
import FormCategoryCreation
  from '../src/components/formCategoryCreation/formCategoryCreation';
import Profile
  from './components/profile/profile';
import FormRegisterForm from './components/formRegisterUser/formRegisterForm';
import Cart from './components/cart/cart';
import {userInfo} from './app/reducers/registerReducer';
import {useAppSelector} from './app/hooks';
// eslint-disable-next-line no-unused-vars
import UserList from './components/usersList/usersList';
import CategoryList from './components/categoryList/categoryList';
import searchBar from './components/searchBar/searchBar';
import OrderList from './components/orderList/orderList';
import FormAddress from './components/formAddress/formAddress';
import ReviewsList from './components/reviewsList/reviewsList';
import ProfileView from './components/profileView/profileView';
import UserOrders from './components/userOrders/userOrders';
import OrderInfoComp from './components/orderInfoComp/orderInfoComp';
import ResetPasswordEmail from
  './components/resetPasswordEmail/resetPasswordEmail';
import ResetNewPassword from './components/resetNewPassword/resetNewPassword';
import Footer from './components/footer/footer';
import Wishlist from './components/wishlist/wishlist';
import Rules from './components/rules/rules';

function App() {
  const user = useAppSelector(userInfo);
  return (
    user?.status !== 'Banned' ?
    <div>
      <Route exact path={['/']} component={Landing}/>
      {user.role === 'Admin' ?
      <Route path={['/home',
        '/product',
        '/create',
        '/create/product',
        '/list',
        '/login',
        '/register',
        '/list/productlist',
        '/create/category',
        '/cart',
        '/list/userlist',
        '/address',
        '/about',
        '/profile',
        '/wishlist',
        '/rules',
      ]} component={NavBar}/> :
      <Route path={['/home',
        '/login',
        '/register',
        '/cart',
        '/address',
        '/product',
        '/profile',
        '/list',
        '/about',
        '/user',
        '/wishlist',
        '/rules',
      ]} component={NavBar}/>
      }
      <Route exact path='/list/productcategory'
        component={CategoryList}/>
      {/* <Route exact path={['/login', '/profile']} component={Login}/> */}
      <Route exact path ={['/home', '/list/productlist']}
        component={searchBar} />
      <Route exact path='/user/:email/recoverpassword'
        component={ResetNewPassword} />
      <Route exact path='/user/recoverpassword'
        component={ResetPasswordEmail} />
      <Route exact path='/list/order/info' component={OrderInfoComp} />
      <Route exact path='/list/orderUser' component={UserOrders} />
      <Route exact path='/list/order' component={OrderList} />
      <Route exact path='/list/productlist' component={ProductsList}/>
      <Route exact path='/register' component={FormRegisterForm}/>
      <Route exact path='/about' component={About}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/product/:id' component={ProductDetail}/>
      <Route exact path='/list' component={listButtonRouter}/>
      <Route exact path='/create/product' component={formCreateProduct}/>
      <Route exact path='/create/category'
        component={FormCategoryCreation}/>
      <Route exact path='/create' component={CreateButtonRouter}/>
      <Route exact path='/profile/:id' component={ProfileView}/>
      <Route exact path='/profile' component={Profile}/>
      <Route path='/cart' component={Cart}/>
      <Route exact path='/list/userlist' component={UserList}/>
      <Route exact path='/address' component={FormAddress}/>
      <Route exact path='/list/reviews' component={ReviewsList}/>
      <Route path='/wishlist' component={Wishlist}/>
      <Route exact path='/rules' component={Rules}/>
      <Route path='/' component={Footer} />
    </div> :
    <div>Your account is Banned from this site</div>
  );
}

export default App;

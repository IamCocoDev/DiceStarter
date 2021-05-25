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
// import Login from './components/login/login';
import Cart from './components/cart/cart';
import {userInfo} from './app/reducers/registerReducer';
import {useAppSelector} from './app/hooks';
// eslint-disable-next-line no-unused-vars
import UserList from './components/usersList/usersList';
import CategoryList from './components/categoryList/categoryList';
import searchBar from './components/searchBar/searchBar';

function App() {
  const user = useAppSelector(userInfo);
  return (
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
        '/profile']} component={NavBar}/> :
      <Route path={['/home',
        '/login',
        '/register',
        '/cart',
        '/product',
        '/profile',
      ]} component={NavBar}/>
      }
      <Route exact path='/list/productcategory'
        component={CategoryList}/>
      {/* <Route exact path={['/login', '/profile']} component={Login}/> */}
      <Route exact path ={['/home', '/list/productlist']}
        component={searchBar}/>
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
      <Route exact path='/profile' component={Profile} />
      <Route path='/cart' component={Cart}/>
      <Route exact path='/list/userlist' component={UserList}/>
    </div>
  );
}

export default App;

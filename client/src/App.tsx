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
import AdministratorHome
  from './components/administratorHome/administratorHome';
import FormRegisterForm from './components/formRegisterUser/formRegisterForm';
import Login from './components/login/login';
import Cart from './components/cart/cart';
import {userInfo} from './app/reducers/registerReducer';
import {useAppSelector} from './app/hooks';
import UserList from './components/usersList/usersList';

function App() {
  const user = useAppSelector(userInfo);
  return (
    <div>
      <Route exact path={['/']} component={Landing}></Route>
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
        '/admin/home',
        '/cart',
        '/list/userlist']} component={NavBar}></Route> :
      <Route path={['/home',
        '/login',
        '/register',
        '/cart',
        '/product',
        '/admin/home',
      ]} component={NavBar}></Route>
      }
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/list/productlist' component={ProductsList}></Route>
      <Route exact path='/register' component={FormRegisterForm}></Route>
      <Route exact path='/about' component={About}></Route>
      <Route exact path='/home' component={Home}></Route>
      <Route exact path='/product/:id' component={ProductDetail}></Route>
      <Route exact path='/list' component={listButtonRouter}></Route>
      <Route exact path='/create/product' component={formCreateProduct}></Route>
      <Route exact path='/create/category'
        component={FormCategoryCreation}></Route>
      <Route exact path='/create' component={CreateButtonRouter}></Route>
      <Route exact path='/admin/home' component={AdministratorHome} ></Route>
      <Route path='/cart' component={Cart}></Route>
      <Route exact path='/list/userlist' component={UserList}></Route>
    </div>
  );
}

export default App;

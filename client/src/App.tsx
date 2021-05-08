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

function App() {
  return (
    <div className="">
      <Route path={['/home',
        '/product',
        '/create',
        '/create/product',
        '/list/productlist',
        '/list']} component={NavBar}></Route>
      <Route exact path='/list/productlist' component={ProductsList}></Route>
      <Route exact path='/' component={Landing}></Route>
      <Route exact path='/about' component={About}></Route>
      <Route exact path='/home' component={Home}></Route>
      <Route exact path='/product/:id' component={ProductDetail}></Route>
      <Route exact path='/list' component={listButtonRouter}></Route>
      <Route exact path='/create/product' component={formCreateProduct}></Route>
      <Route exact path='/create' component={CreateButtonRouter}></Route>
    </div>
  );
}

export default App;

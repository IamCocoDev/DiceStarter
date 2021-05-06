import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../src/components/home/home';
import Landing from './components/landing/landing';
import NavBar from '../src/components/navBar/navBar';
import ProductDetail from '../src/components/productDetail/productDetail';
import formCreateProduct
  from '../src/components/formCreateProduct/formCreateProduct';
import ProductList from '../src/components/productList/productList';

import './App.css';
import About from './components/about/about';

function App() {
  return (
    <div className="">
      <Route path={['/home', '/product', '/create']} component={NavBar}></Route>
      <Route exact path='/list' component={ProductList}></Route>
      <Route exact path='/' component={Landing}></Route>
      <Route exact path='/about' component={About}></Route>
      <Route exact path='/home' component={Home}></Route>
      <Route exact path='/product/:id' component={ProductDetail}></Route>
      <Route exact path='/create' component={formCreateProduct}></Route>
    </div>
  );
}

export default App;

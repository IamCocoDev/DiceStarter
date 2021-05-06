import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../src/components/home/home';
import Landing from './components/landing/landing';
import NavBar from '../src/components/NavBar/NavBar';
import ProductDetail from '../src/components/productDetail/productDetail';


import './App.css';
import About from './components/about/about';

function App() {
  return (
    <div className="">
      <Route exact path={['/home']} component={NavBar}></Route>
      <Route exact path='/' component={Landing}></Route>
      <Route exact path='/about' component={About}></Route>
      <Route exact path='/home' component={Home}></Route>.
      <Route exact path='/product/:id' component={ProductDetail}></Route>
    </div>
  );
}

export default App;

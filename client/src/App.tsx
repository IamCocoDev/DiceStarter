import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../src/components/home/home';
import Landing from './components/landing/landing';
import NavBar from './components/NavBar/NavBar';

import './App.css';

function App() {
  return (
    <div className="">
      <Route path='/home' component={NavBar}></Route>
      <Route exact path='/' component={Landing}></Route>
      <Route exact path='/home' component={Home}></Route>
    </div>
  );
}

export default App;

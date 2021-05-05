import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../src/components/home/home';
import Landing from './components/landing/landing';

import './App.css';

function App() {
  return (
    <div className="">
      <Route exact path='/' component={Landing}></Route>
      <Route path='/home' component={Home}></Route>
      <Home />
    </div>
  );
}

export default App;

import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../src/components/home/home';
import Landing from './components/landing/landing';
import NavBar from '../src/components/NavBar/NavBar';

import './App.css';

function App() {
  return (
    <div className="">
      <Route exact path='/' component={Landing}></Route>
      <Route path='/home' component={Home}></Route>
      <Route path={['/home']} component={NavBar}></Route>
    </div>
  );
}

export default App;

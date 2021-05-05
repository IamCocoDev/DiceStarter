import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../src/components/home/home';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route path='/home' component={Home}></Route>
    </div>
  );
}

export default App;

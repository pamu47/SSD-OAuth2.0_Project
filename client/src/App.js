import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage'
import Auth from './components/Auth'
import Functions from './components/FunctionsPage'

import './App.css';

function App() {
  return (
    <Router>
    <div className="container" style={{ marginTop: '20px' }}>
    <ul class="nav navbar-dark bg-dark justify-content-center">
  <li class="nav-item">
    <h3 style={{padding:10,color:'white',fontWeight:'bold',fontFamily:'Ubuntu'}}>SSD Assignment 02 - Drive Uploader With oAuth2.0</h3>
  </li>
 
</ul>
    </div>
    <Route path="/" exact component={Homepage}/>
    <Route path="/auth" component={Auth}/>
    <Route path="/functions" component={Functions}/>
  </Router>
  );
}

export default App;

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
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/abc">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active" href="/abc">Home <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link" href="/abc">Features</a>
            <a class="nav-item nav-link" href="/abc">Pricing</a>
            <a class="nav-item nav-link disabled" href="/abc" tabindex="-1" aria-disabled="true">Disabled</a>
          </div>
        </div>
      </nav>
    </div>
    <Route path="/" exact component={Homepage}/>
    <Route path="/auth" component={Auth}/>
    <Route path="/functions" component={Functions}/>
  </Router>
  );
}

export default App;

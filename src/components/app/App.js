import React, { Component } from 'react';
import logo from '../../logo.svg';
import Converter from '../converter/index'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Currency Converter</h1>
          <img src={logo} className="App-logo" alt="logo" height='220'/>
           <br />
           <Converter />
        </header>
      </div>
    );
  }
}

export default App;

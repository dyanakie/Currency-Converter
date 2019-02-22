import React, { Component } from 'react';
import logo from '../../logo.svg';
import Converter from '../converter/index'
import { Route, NavLink, Switch } from "react-router-dom";
import Historic from '../historic-data/index'
import HistoricAll from '../historic-data-all/index'
import store from '../../store/index'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Currency Converter</h1>
          <p style={{ fontSize: '15px' }}>made by dyanakiev</p>
          <img src={logo} className="App-logo" alt="logo" height='220'/>
          <p style={{fontSize: '15px'}}>The App connects to currencylayer.com to get current exchange rates.</p>

          <div style={{ display: 'inline'}}>
            <NavLink to='/' style={{ marginRight: '50px', color: '#B22222'}}>Converter</NavLink>
            <NavLink to='/historic' style={{ marginRight: '50px', color: '#B22222' }}>Historic</NavLink>
          </div>
       
           <br />
          <Route exact path="/" component={Converter} />
          <Route exact path="/historic" component={Historic} />
          <Route exact path="/historic/all" component={HistoricAll} />
        </header>
      </div>
    );
  }
}

export default App;

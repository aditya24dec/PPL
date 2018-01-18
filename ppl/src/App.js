import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

class App extends Component {
  render() {
    return (

      <div>
     	<Content />
        <Footer />
      </div>

    );
  }
}

export default App;

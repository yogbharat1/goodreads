import React, { Component } from 'react';

import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import './App.scss';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
        <Index />
        </div>
      </React.Fragment>
    );
  }
}

export default App;

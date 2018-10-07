import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import DisMap from './components/DisMap'
// import FourSquare from './api/FourSquare'

class App extends Component { 
  
  render () {

    return (
      <main>
        <div id="map">
        {/*<h1 className="heading"> Our Favorite Rides and Restaurants at Magic Kingdom, Disney World </h1>*/}
         <DisMap  />
      </div>
      </main>
    );
  }
}
export default App
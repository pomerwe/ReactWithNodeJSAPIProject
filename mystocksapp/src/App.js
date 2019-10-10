import React from 'react';
import Header from './components/Header/Header';
import './App.css';
import Body from './components/Body/Body'

class App extends React.Component {
  render(){
    return(
      <div className="App">
        <Body />
        <Header />
        
      </div>
    )
  }
}

export default App


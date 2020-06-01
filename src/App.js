import React from 'react';
import MyNavbar from './components/MyNavbar';
import Home from './components/HomeComponent';
import Rules from './components/RulesComponent';
import Game from './components/GameComponent';

function App() {
  return (
    <div className="App">
      <MyNavbar id="mynavbar"/>
      <Home />
      <Rules />
      <Game />
    </div>
  );
}

export default App;

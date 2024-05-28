// src/App.js
import React from 'react';
import Navbar from './components/navbar';
import Calendar from './components/Calendar';



const App = () => {
  return (
    <div>
      <Navbar />
      <Calendar weeks={3} />
    </div>
  );
}; 

export default App;

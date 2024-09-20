import React, { useEffect } from 'react';
import Header from '../components/Header.js'
import Converter from '../components/Converter.js'

function Main_page() {
  
  return (
    <div className="App">
      <Header />
      <Converter />
    </div>
  );
}

export default Main_page;
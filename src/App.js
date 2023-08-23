
import MyGlobe from './components/MyGlobe';
import React from 'react';
import Filter from './components/Filter';
import Table from './components/Table';
import Timeline from './components/Timeline';

import './App.css';
function App() {
  
  const { useState, useEffect } = React;
  const [acquirers, setAcquirers] = useState([]);
  const [acquired, setAcquired] = useState([]);
  const [acquisitions, setAcquisitions] = useState([]);
  
  useEffect(() => {
    fetch('http://api.arthurr.co.uk/acquisitions').then(res => res.json()).then(data => {
      setAcquirers(data['acquirers']);
      setAcquired(data['acquired']);
      setAcquisitions(data['acquisitions']);
    }
  )}, []);

  return (
      
  <div className="flex">
      <MyGlobe
        acquiredData={acquired}
        acquisitionsData={acquisitions}
       />
  </div>
      
    
  );
}

export default App;

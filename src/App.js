
import MyGlobe from './components/MyGlobe';
import React from 'react';
import axios from './lib/fetcher'
import { SizeMe } from 'react-sizeme';
import Button from './components/Button'
import Select from './components/Select'

import './App.css';
function App() {

  const { useState, useEffect } = React;
  const [acquirer, setAcquirer] = useState();
  const [acquisitions, setAcquisitions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [globeKey, setGlobeKey] = useState(0)
  const [acqInfo, setAcqInfo] = useState();

  const handleCompanyChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCompany(selectedValue);

    axios.get(`companies/${selectedValue}/acquisitions`).then(response => {
      setAcquirer(response.data['company']);
      setAcquisitions(response.data['acquisitions']);
      setGlobeKey(prevKey => prevKey + 1);
    }
    )
    console.log('Selected Company:', selectedValue);
  };


  useEffect(() => {
    axios.get(`companies/21/acquisitions`).then(response => {
      setAcquirer(response.data['company']);
      setAcquisitions(response.data['acquisitions']);
    }
    )
  }, []);

  return (<div className='flex flex-row'>
    <div className="bg-black flex-1">

      <SizeMe>
        {({ size }) => (
          <>
            <MyGlobe
              key={globeKey}
              acquirerData={acquirer}
              acquisitionsData={acquisitions}
              size={size}
              sharedState={acqInfo}
              setSharedState={setAcqInfo}
            />
          </>
        )}
      </SizeMe>
    </div>
    
    <div className="flex flex-none w-1/3 md:1-1/4 bg-black border-l-2 border-bborange px-1">
      <div className="">
        <p className='text-bborange p-5'>
            <h1 className='text-xl font-bold'>https://arthur-ma.vercel.app</h1>
          </p>
        <div className="grid grid-cols-2 my-5">
          <Select>
            <option value="Technology">{"> "} Technology</option>
          </Select>
          <select defaultValue={"Apple"} onChange={handleCompanyChange} id="ticket" class="px-3 appearance-none rounded-none bg-bborange text-gray-700 font-bold border-2 border-black py-5 w-full text-center align-middle content-center">
            <option value="21">{"> "} Microsoft</option>
            <option value="15">{"> "} Google</option>
            <option value="17">{"> "} IBM</option>
            <option value="16">{"> "} HP</option>
            <option value="4">{"> "} Apple</option>
            <option value="2">{"> "} Amazon</option>
            <option value="14">{"> "} Facebook</option>
            <option value="33">{"> "} Twitter</option>
            <option value="12">{"> "} eBay</option>
            <option value="1">{"> "} Adobe</option>
          </select>
          <Select>
            <option>{"> "} Filter </option>
          </Select>
          <Select />
        </div>

        <div class="grid grid-cols-3">
          <Button>
            Table View
          </Button>
          <Button>
            Similar Companies
          </Button>
          <Button>
            Similar Actions
          </Button>
          <Button />
          <Button />
          <Button />
          <Button />
          <Button />
          <Button />
          <Button />
          <Button />
          <Button />
        </div>

        {acquirer &&
          <p className='text-bborange p-5'>
            <h1 className='text-2xl font-bold'>Acquirer: {acquirer.name}</h1>
            Displaying all deals in the last 10 years by {acquirer.name}.
          </p>
        }
        {
          acqInfo &&
          <div className='text-bborange p-5'>
            {acquirer.name + acqInfo.purchased_company.name + acqInfo.news_title}
          </div>
        }

      </div>
    </div>
  </div>

  );
}

export default App;

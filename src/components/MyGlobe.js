import React, { useState, useEffect } from 'react';
import { SizeMe } from 'react-sizeme';
import Globe from 'react-globe.gl';

function MyGlobe(props) {
  const {
    width,
    acquiredData,
    acquisitionsData,
  } = props;

  const [acquirers, setAcquirers] = useState([]);
  const [acquired, setAcquired] = useState([]);
  const [acquisitions, setAcquisitions] = useState([]);

  const randomColor = () => {
    // return either "red", "grey", or "orange"
    const colors = ["red", "grey", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const dealValue = (input) => {
    // deal value is a string, if it's a parsable number return that if not return 1
    if (parseInt(input)) {
      return parseInt(input);
    }
    return 0.8;
    
  }

  useEffect(() => {
    // Assuming the acquiredData and acquisitionsData are passed as props
    if (!acquiredData || !acquisitionsData) return;
    setAcquirers(acquiredData);
    setAcquired(acquiredData);
    setAcquisitions(acquisitionsData);
    console.log(acquisitionsData)
  }, [acquiredData, acquisitionsData]);

  return (
    <SizeMe>
      {({ size }) => (
        <>
          <Globe
            width={width || size.width}
            globeImageUrl="/earth-night.jpg"
            backgroundImageUrl="/night-sky.png"
            pointsData={acquired}
            pointLat={d => d.latitude}
            pointLng={d => d.longitude}
            pointAltitude={0}
            pointColor={() => randomColor()}
            pointRadius={d => dealValue(d.deal_value)}
            arcsData={acquisitions}
            arcLabel={d => `${d.news_title ? d.news_title : d.purchasing_company.name + "acquired" + d.purchased_company.name}`}
            arcStartLat={d => d.purchasing_company.latitude}
            arcStartLng={d => d.purchasing_company.longitude}
            arcEndLat={d => d.purchased_company.latitude}
            arcEndLng={d => d.purchased_company.longitude}
            arcStroke={0.5}
            arcColor={() => 'red'}
            arcDashAnimateTime={5000}
            arcDashGap={0.3}
            arcDashInitialGap={() => Math.random() * 0.5}
            // arcsTransitionDuration={0}
            
            // ringsData={acquisitions}
            // ringLat={d => d.purchased_company.latitude}
            // ringLng={d => d.purchased_company.longitude}
            // ringColor={() => 'red'}
            // ringMaxRadius={d => dealValue(d.deal_value) * 5}
            // ringPropagationSpeed={0.1}
            // ringTransitionDuration={0}
            // ringRepeatPeriod={0}
            
            
          />
        </>
      )}
    </SizeMe>
  );
}

export default MyGlobe;
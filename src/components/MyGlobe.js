import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

function MyGlobe(props) {
  const {
    width,
    acquisitionsData,
    acquirerData,
    size,
    sharedState,
    setSharedState,
  } = props;


  const [acquirer, setAcquirer] = useState([]);
  const [acquisitions, setAcquisitions] = useState([]);

  const globe = useRef();

  const randomColor = () => {
    // return either 'red', 'green', 'orange', or 'grey'
    const colors = ['#ff433d', '#0068ff', '#fb8b1e', 'grey'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const dealValue = (input) => {
    if (input[0] === '$') {
      // it is in form $500,000,000 with an unknown number of commas
      // remove the $ and commas
      input = input.slice(1).replace(/,/g, '');
      input = parseInt(input);
      return input / 5000000000;
    }
    return 1;

  }

  useEffect(() => {
    if (!acquirerData || !acquisitionsData) return;

    if (globe.current) {
      globe.current.pointOfView({ lat: acquirerData.latitude * 0.8, lng: acquirerData.longitude * 0.7, altitude: 2.5 });
    }
    // set current data to none, wait 2 seconds
    setAcquirer(acquirerData);
    setAcquisitions(acquisitionsData);



    // print how manby acquisitions

    // remove all points from the globe
    // globe.current.pointOfView({ altitude: 3.5 });


  }, [acquirerData, acquisitionsData]);

  const handlePointClick = (point) => {
    setSharedState(point);
  }

  return (

    <Globe
      ref={globe}
      width={width || size.width}
      globeImageUrl="/earth-night.jpg"
      backgroundImageUrl="/night-sky.png"
      pointsData={acquisitions}
      pointLat={d => d.purchased_company.latitude}
      pointLng={d => d.purchased_company.longitude}
      pointAltitude={() => Math.random() / 1000}
      pointsMerge={false}
      pointColor={() => randomColor()}
      pointLabel={d => `${d.purchased_company.name} acquired by ${acquirer.name}`}
      pointRadius={d => parseInt(dealValue(d.deal_value))}
      // onPointClick={d => handlePointClick(d)}


      arcsData={acquisitions}
      arcLabel={d => `${d.news_title ? d.news_title : acquirer.name + "acquired" + d.purchased_company.name}`}
      arcStartLat={d => acquirer.latitude}
      arcStartLng={d => acquirer.longitude}
      arcEndLat={d => d.purchased_company.latitude}
      arcEndLng={d => d.purchased_company.longitude}
      arcDashAnimateTime={5000}
      arcDashGap={0.3}
      arcDashInitialGap={() => Math.random()}
      arcStroke={0.2}
      arcColor={d => '#ff433d'}
      // onArcClick={d => handlePointClick(d)}

    // customLayerData={acquisitions}
    // customThreeObject={""}



    // ringsData={[acquirer]}
    // ringLat={d => d.latitude}
    // ringLng={d => d.longitude}
    // ringColor={() => 'green'}
    // ringRadius={d => 10}
    // ringMaxRadius={d => 4}


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
  );
}

export default MyGlobe;
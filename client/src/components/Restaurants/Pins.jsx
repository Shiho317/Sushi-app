import React from 'react'
import { MdLocationPin } from 'react-icons/md';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from 'react-map-gl';
import Card from './Card';

const Pins = ({data, opens, handleMakerClick, isCurrent, setIsCurrent, isCurrentView}) => {
  const long = data.coordinates.longitude;
  const lat = data.coordinates.latitude;
  const id = data.id;

  return (
    <>
      <Marker
        latitude={lat}
        longitude={long}
        offsetLeft={-3.5 * isCurrentView.zoom}
        offsetTop={-7 * isCurrentView.zoom}>
        <MdLocationPin 
          style={{fontSize: '2rem', color: 'red'}}
          onClick={() => handleMakerClick(id, lat, long)}/>
      </Marker>
      {id === isCurrent && (
        <Card data={data} opens={opens} id={id} lat={lat} long={long} setIsCurrent={setIsCurrent}/>
      )}
    </>
  )
}

export default Pins
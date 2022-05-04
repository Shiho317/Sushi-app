import React, { useCallback, useState } from 'react'
import './Restaurants.style.css'
import { useQuery, gql } from '@apollo/client'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from 'react-map-gl';
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import Pins from './Pins';
import loadingImg from '../../images/sushi-loading.gif';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const RESTAURANTS_DATA = gql`
  query RestasurantData {
    restaurants {
      id
      name
      image_url
      url
      is_closed
      review_count
      rating
      coordinates {
        longitude
        latitude
      }
      price
      location {
        display_address
      }
      display_phone
      categories {
        title
      }
    }
    opens {
      id
    }
  }
`

const Restaurants = () => {

  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const [ isCurrentView, setCurrentView ] = useState({
    latitude: 49.24966,
    longitude: -123.11934,
    zoom: 10
  })

  const [ isCurrent, setIsCurrent ] = useState(null);

  const handleMakerClick = useCallback((id, lat, long) => {
    setIsCurrent(id);
    setCurrentView({...isCurrentView, latitude: lat, longitude: long})
  },[setIsCurrent, isCurrentView])

  const { loading, error, data } = useQuery(RESTAURANTS_DATA)
  
  
  if(loading) return (
    <div className='loading'>
      <img src={loadingImg} alt='loading-img'/>
    </div>
  )

  if(error) return <p>Something went wrong.</p>

  return (
    <div className='map-wrapper'>
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          ...isCurrentView
        }}
        style={{width: '100%', height: '100%'}}
        mapStyle="mapbox://styles/mapbox/streets-v9">
        {data.restaurants.map(restaurant => (
          <Pins 
            key={restaurant.id} 
            data={restaurant} 
            opens={data.opens} 
            handleMakerClick={handleMakerClick} 
            isCurrent={isCurrent} 
            setIsCurrent={setIsCurrent} 
            isCurrentView={isCurrentView}/>
        ))}
      </Map>
    </div>
  )
}

export default Restaurants
import React from 'react'
import { Popup } from 'react-map-gl';
import { AiFillStar } from 'react-icons/ai';

const Card = ({data, id, lat, long, setIsCurrent}) => {

  const address = data.location.display_address.join();

  return (
    <Popup
        key={id}
        latitude={lat}
        longitude={long}
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        closeButton={true}
        closeOnClick={false}
        onClose={() => setIsCurrent(null)}>
      <Card>
        <div className='image-wrap'>
          <img src={data.image_url} alt='restaurant-img'/>
        </div>
        <div className='restaurant-details'>
          <h3>{data.name}</h3>
          <div className='restaurant-reviews'>
            <AiFillStar/>
            <p>{data.rating}</p>
            <p>({data.review_count})</p>
            <p className='price-rage'>{data.price}</p>
          </div>
          <div className='restaurant-open'>
            {data.is_closed ? (
              <p className='isClosed'>Closed</p>
            ) : (
              <p className='isOpen'>Open</p>
            )}
          </div>
          <div className='restaurant-address'>
            <p>Address:</p>
            <p>{address}</p>
          </div>
        </div>
      </Card>
    </Popup>
  )
}

export default Card
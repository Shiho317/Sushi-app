import React, { useState } from 'react'
import { Popup } from 'react-map-gl';
import { AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import './Card.style.css'

const Card = ({data, opens, id, lat, long, setIsCurrent}) => {

  const address = data.location.display_address.join();

  const currentOpenId = opens.map(open => {
    return open.id
  });

  const addToFavourite = () => {

  }

  const [ isFavourite, setIsFavourite ] = useState(false);

  return (
    <Popup
        key={id}
        latitude={lat}
        longitude={long}
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        closeButton={true}
        closeOnClick={false}
        onClose={() => setIsCurrent(null)}>
      <div className='card'>
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
            {currentOpenId.includes(data.id) ? (
              <p className='isOpen'>Open</p>
            ) : (
              <p className='isClosed'>Closed</p>
            )}
            {data.is_closed && (
              <p>(permanently)</p>
            )}
          </div>
          <div className='restaurant-address'>
            <p>{address}</p>
          </div>
          <div className='favorite' onClick={() => addToFavourite()}>
            {isFavourite ?
              <AiFillHeart/>
              : <AiOutlineHeart/> }
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default Card
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Popup } from 'react-map-gl';
import { AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import './Card.style.css'
import { AppContext } from '../../App';

const Card = ({data, opens, id, lat, long, setIsCurrent}) => {

  const { loggedIn, userObj, } = useContext(AppContext);
  const currentUser = JSON.parse(userObj);

  const address = data.location.display_address.join();

  const currentOpenId = opens.map(open => {
    return open.id
  });

  const [ favouritesList, setFavouritesList ] = useState([]);
  const myFavourite = favouritesList.filter(list => list.email === currentUser.email);

  const isFavourite = myFavourite.map(item => {
    return item.id
  }).includes(data.id)

  const addToFavourite = async(e) => {
    e.preventDefault();
    const categoriesArr = data.categories.map(category => {
      return category.title
    })

    const newFavourite = {
      email: currentUser.email,
      id: data.id,
      image: data.image_url,
      name: data.name,
      rate: data.rating,
      price: data.price,
      url: data.url,
      address,
      categories: categoriesArr
    }
    if(loggedIn){
      try {
        const res = await axios.post('http://localhost:8888/api/favourites/add', newFavourite);
        setFavouritesList([...favouritesList, res.data])
      } catch (error) {
        console.log(error)
      }
    }else{
      alert('Please login.')
    }
  }

  const removeFromFavourite = async(e) => {
    e.preventDefault();

    const removeItem = {
      email: currentUser.email,
      id: data.id
    }
    try {
      const res = await axios.post('http://localhost:8888/api/favourites/delete', removeItem);
      const filtered = favouritesList.filter(list => list.id !== res.data.id)
      setFavouritesList(filtered)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getMyFavourites = async() => {
      try {
        const allFavourites = await axios.get('http://localhost:8888/api/favourites')
        setFavouritesList(allFavourites.data)
        console.log(allFavourites.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMyFavourites();
  },[setFavouritesList])

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
          {loggedIn && isFavourite ? (
            <div className='unfavourite' onClick={removeFromFavourite}>
              <AiFillHeart/>
            </div>
          ) : (
            <div className='favourite' onClick={addToFavourite}>
              <AiOutlineHeart/>
            </div>
            )}
        </div>
      </div>
    </Popup>
  )
}

export default Card
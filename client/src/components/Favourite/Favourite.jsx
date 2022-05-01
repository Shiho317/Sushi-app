import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Item from './Item'
import { GiHeartburn } from 'react-icons/gi'
import './Favourite.style.css'

const Favourite = () => {

  const [ myFavs, setMyFavs ] = useState([]);

  useEffect(() => {
    const getMyFavourites = async() => {
      try {
        const allFavourites = await axios.get('http://localhost:8888/api/favourites')
        setMyFavs(allFavourites.data);
      } catch (error) {
        console.log(error)
      }
    }
    getMyFavourites();
  },[])

  return (
    <div className='suki-wrapper'>
      <div className='header-title'>
        <h1>Your SUKI SUSHI</h1>
        <GiHeartburn/>
      </div>
      {myFavs.map(myFav => (
        <Item item={myFav} key={myFav._id}/>
      ))}
    </div>
  )
}

export default Favourite
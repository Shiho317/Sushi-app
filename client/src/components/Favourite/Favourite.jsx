import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Item from './Item'
import { GiHeartburn } from 'react-icons/gi'
import './Favourite.style.css'
import { AppContext } from '../../App'

const Favourite = () => {

  const { userObj } = useContext(AppContext)
  const currentUser = JSON.parse(userObj);

  const [ myFavs, setMyFavs ] = useState([]);

  useEffect(() => {
    const getMyFavourites = async() => {
      try {
        const allFavourites = await axios.get('/api/favourites', currentUser.email)
        console.log(allFavourites)
        setMyFavs(allFavourites.data);
      } catch (error) {
        console.log(error)
      }
    }
    getMyFavourites();
  },[currentUser.email])

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
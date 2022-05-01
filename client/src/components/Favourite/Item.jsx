import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import './Item.style.css'

const Item = ({item}) => {
  return (
    <div className='item-wrapper'>
      <div className='item-img'>
        <img src={item.image} alt='suki-img'/>
      </div>
      <div className='item-details'>
        <h2>{item.name}</h2>
        <div className='rate-price'>
          <AiFillStar/>
          <p className='rate'>{item.rate}</p>
          <p className='price'>{item.price}</p>
        </div>
        <div className='category-wrap'>
          {item.categories.map((category, index) => (
            <p key={index} className='item-category'>{category}</p>
          ))}
        </div>
        <div className='item-address'>
          <p>{item.address}</p>
        </div>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <button className='details-btn'>
          Details
          </button>
        </a>
      </div>
    </div>
  )
}

export default Item
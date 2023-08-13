import React from 'react'
import "./CategoryCards.scss"
import { Link } from 'react-router-dom'
function CategoryCards({item}) {
  return (
    <Link to="/gigs?cat=design">
   <div className="categoryCards">
    <img src={item.img} alt=''/>
    <span className='desc'>{item.desc}</span>
    <span className='title'>{item.title}</span>
   </div>
   </Link>
  )
}

export default CategoryCards

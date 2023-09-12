import React from 'react'
import Tv from '../../assets/tv.svg'
import './header.css'

const Header = () => {
  return (
    <div>
         <div className='header'>
            <img src={Tv} alt="tv-icon" />
            <h1>MovieBox</h1>
        </div>
    </div>
  )
}

export default Header
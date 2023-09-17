import React from 'react'
import Tv from '../../assets/tv.svg'
import './header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
         <div className='header'>
          <Link to='/'><img src={Tv} alt="tv-icon"/>
</Link>
            <h1 className='header-text'>MovieBox</h1>
        </div>
    </div>
  )
}

export default Header
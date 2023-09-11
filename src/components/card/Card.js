import React from 'react'

const Card = ({Poster, Title, ReleaseDate, handleClick}) => {
  return (
    <div className='card-container'>
        <img src={Poster} alt="poster-pics" />
        <p>{Title}</p>
        <p>{ReleaseDate}</p>
    </div>
  )
}

export default Card;
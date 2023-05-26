import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './TopRatedMovies.css'

function TopRatedMovies({ topRatedMovies }) {
    
  return (
    <div className='top-rated-container'>
        <h3>Top Rated Movies</h3>
        <div className="top-rated-cards-wrapper">
           {topRatedMovies?.map((movie)=> (
            <MovieCard 
            key={movie.id}
            movie={movie}
            width="240px"
            height="130px"
            radius="8px"
            cardStyles="top-rated-card"
            imgUrl={movie.backdrop_path}
            movieId={movie?.id}
          />
           )).slice(0, 9)} 
        </div>.
    </div>
  )
}

export default TopRatedMovies
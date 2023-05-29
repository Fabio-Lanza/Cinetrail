import { useEffect, useState } from "react";
import axios from "axios";
import "./PopularMovies.css";
import MovieCard from '../MovieCard/MovieCard'

function PopularMovies({ baseUrl, apiKey }) {
  const [popularMovie, setPopularMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    axios
      .get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${currentPage}`)
      .then((res) => {
        setPopularMovie(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  return (
    <div className="popular-container">
      <h3 className="popular-title">Popular Movies</h3>
      <div className="popular-cards-wrapper">
        {popularMovie.map((movie) => (  
            <MovieCard 
            key={movie.id}
             movie={movie}
             width="230px"
             height="350px"
             radius="16px"
             cardStyles="popular-card"
             imgUrl={movie.poster_path}
             movieId={movie?.id}/>
        ))}
      </div>
      {/* --- Mobile */}
      <div className="popular-movies-mobile">
      {popularMovie.map((movie) => (  
            <MovieCard 
            key={movie.id}
             movie={movie}
             width="185px"
             height="250px"
             radius="16px"
             cardStyles="popular-card"
             imgUrl={movie.poster_path}
             moveId={movie?.id}/>
        ))}
      </div>
      
      <div className="page-numbers">
        Next Page
        {pageNumbers.map((number) => (
          <p key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </p>
        ))}
      </div>
    </div>
    
  );
}

export default PopularMovies;

import React from "react";
import "./MovieCard.css";
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings';

function MovieCard({
  movie,
  width,
  height,
  radius,
  cardStyles,
  imgUrl,
  movieId,
}) {

  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  const imageStyle = {
    backgroundImage: `url(${imageBaseUrl}/${imgUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width,
    height,
    position: "relative",
    borderRadius: radius,
    boxShadow:
      cardStyles === "popular-card"
        ? "1px 1px 10px rgba(118, 118, 118, 1)"
        : null,
  };

  const hyperRef = `/movieDetails/${movieId}`;


  return (
    <Link to={hyperRef} className={cardStyles}>
    <div style={imageStyle}>
      <div className="movie-info-top">
      <StarRatings
            rating={movie?.vote_average / 2}
            starRatedColor="red"
            numberOfStars={5}
            starDimension="19px"
            starSpacing="1px"
          />
      </div>
      <div className="movie-info-bottom">
        <p>{movie.title}</p>
        <p><span>Rating: </span>{movie.vote_average / 2}</p>
      </div>
    </div>
    {cardStyles === "top-rated-card" ? <p className="top-rated-title">{movie.title}</p> : null}
    </Link>
  );
}

export default MovieCard;

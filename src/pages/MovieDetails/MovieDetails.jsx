import React, { useState, useEffect, useContext } from "react";
import "./MovieDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { ThemeContext } from "../../Context/ThemeContext";
import Genres from "../../components/Genres/Genres";
import { MdReviews } from "react-icons/md";
import Review from "../../components/Review/Review";
import Rating from "../../components/Rating/Rating";

function MovieDetails({ baseUrl, apiKey }) {
  const { moveid } = useParams();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [videoLink, setVideoLink] = useState("");
  const [movie, setMovie] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewNumber, setReviewNumber] = useState(3);
  const [totalReviews, setTotalReviews] = useState(1);

  useEffect(() => {
    // --Movies
    axios
      .get(`${baseUrl}/movie/${moveid}?api_key=${apiKey}`)
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // --get Videos
    axios
      .get(`${baseUrl}/movie/${moveid}/videos?api_key=${apiKey}`)
      .then((res) => {
        // console.log(res.data);
        const youtubeLink = res.data.results.filter(
          (item) => item.site === "YouTube" && item.type === "Trailer"
        );
        setVideoLink(youtubeLink[0]?.key);
      });

    // --Reviews
    axios
      .get(`${baseUrl}/movie/${moveid}/reviews?api_key=${apiKey}`)
      .then((res) => {
        console.log(res.data.results);
        setTotalReviews(res.data.total_results);
        setReviews(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [moveid]);

  return (
    <>
      <div className="movie-details-container">
        {videoLink ? (
          <div className="trailer-container">
            <ReactPlayer
              className="trailer-player"
              url={`https://www.youtube.com/watch?v=${videoLink}`}
              width="100%"
              height="800px"
            />
          </div>
        ) : (
          <div
            className="trailer-container-blank"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p>No Trailer Released</p>
          </div>
        )}
      </div>

      <div className="movie-container-bottom">
        <div className="title-container">
          <h1>{movie?.title}</h1>
        </div>
        <div className="movie-info-container">
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            className="details-poster"
          />

          <div className="movie-info">
            <h2>{movie.tagline}</h2>
            <h2>{movie.overview}</h2>
            <h4>
              Status: <span>{movie.status}</span>
            </h4>
            <h4>
              RunTime: <span>{movie.runtime}</span>
            </h4>
            <h4>
              Budget: <span>{movie.budget}</span>
            </h4>

            {/* <Genres
              apiKey={apiKey}
              baseUrl={baseUrl}
              genreIds={movie?.genres}
            /> */}

            <Rating movieRating={movie?.vote_average} />
          </div>
        </div>
        {/* </div> */}

        {/* ----Reviews */}
        <div className="review-container">
          <h1 className="reviews-title">Reviews</h1>
          {reviews.slice(0, reviewNumber).map((item) => {
            return <Review key={item.id} review={item} />;
          })}

          {reviewNumber >= totalReviews ? (
            <p className="review-number" onClick={() => setReviewNumber(3)}>
              <em>End of reviews.Collapse</em>
            </p>
          ) : (
            <p
              className="review-number"
              onClick={() => setReviewNumber(reviewNumber + 3)}
            >
              <em>Read more reviews.Collapse</em>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieDetails;

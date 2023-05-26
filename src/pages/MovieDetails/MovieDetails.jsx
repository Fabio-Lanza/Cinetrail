import React, { useState, useEffect, useContext } from "react";
import "./MovieDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { ThemeContext } from "../../Context/ThemeContext";

function MovieDetails({ baseUrl, apiKey }) {
  const { moveid } = useParams();
  const [videoLink, setVideoLink] = useState("");
  const [movie, setMovie] = useState([]);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [totalReview, setTotalReview] = useState(0)


  useEffect(() => {
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
        console.log(res.data);
        const youtubeLink = res.data.results.filter((item) => {
          item.site === "YouTube" && item.type === "Trailer";
          setVideoLink(youtubeLink[0]?.key);
        });
      });

      axios
      .get(`${baseUrl}/movie/${moveid}/reviews?api_key=${apiKey}`)
      .then((res) => {
        console.log(res.data);
        
      });


  }, []);


  return (
    <>
      <div
        className={
          darkMode ? "header-container" : "header-container header-light"
        }
      >
        {videoLink ? 
          <div className="trailer-container">
            <ReactPlayer
              className="trailer-player"
              url={`https://www.youtube.com/watch?v=${videoLink}`}
            />
          </div>
         : 
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
        }
      </div>
      <div
        className={
          darkMode ? "header-container" : "header-container header-light"
        }
      >
        <div className="title-container">
          <h1>{movie.title}</h1>
        </div>
        <div className="movie-info-container">
          <img src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          className='details_poster' />

        <div className="movie-info">
          <h2>{movie.tagline}</h2>
          <h2>{movie.overview}</h2>
        </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;

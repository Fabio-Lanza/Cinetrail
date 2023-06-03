import React, { useEffect, useState } from "react";
import "./Slider.css";
import axios from "axios";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Genres from "../Genres/Genres";
import Rating from "../Rating/Rating";

function SliderBanner({ apiKey, baseUrl }) {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const baseImgUrl = import.meta.env.VITE_IMAGE_URL;
   

  useEffect(() => {
    axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`).then((res) => {
      setUpcomingMovies(res.data.results);
    });
  }, []);

  const sliderStyle = {
    backgroundImage: `url(${baseImgUrl}${upcomingMovies[index]?.backdrop_path})`,
    height: "60vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat:"no-repeat",
  };


  const handleRight = () => {
    setIndex(index + 1);
    if (index === upcomingMovies.length - 1) {
      setIndex(0);
    }
  };

  const handleLeft = () => {
    setIndex(index - 1);
    if (index === 0) {
      setIndex(upcomingMovies.length - 1);
    }
  };

  return (
      <div style={sliderStyle}>
       <div className="slider-overlay">
        <MdKeyboardDoubleArrowLeft className="left-arrow" onClick={handleLeft} />
        <MdKeyboardDoubleArrowRight className="right-arrow" onClick={handleRight} />

        <div className="slider-info">
          <h1>{upcomingMovies[index]?.title}</h1>
          <p className="slider-description">
            {upcomingMovies[index]?.overview.slice(0, 130)}
          </p>
          <p>Release Date: {upcomingMovies[index]?.release_date}</p>
          
          <Genres
            apiKey={apiKey}
            baseUrl={baseUrl}
            genreIds={upcomingMovies[index]?.genre_ids}
          />

          <Rating
            movieRating={upcomingMovies[index]?.vote_average}
          />
        </div>
      </div>
    </div>
  );
}

export default SliderBanner;

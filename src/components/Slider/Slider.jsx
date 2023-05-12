import React, { useEffect, useState } from "react";
import "./Slider.css";
import axios from "axios";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

function Slider({ apiKey, baseUrl }) {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const baseImgUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
    .then((res) => {
      setUpcomingMovies(res.data.results);
    });
  }, []);

  const sliderStyle = {
    backgroundImage: `url(${baseImgUrl}${upcomingMovies[index]?.backdrop_path})`,
    height: "60vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleRight = ()=> {
      setIndex(index + 1)
      if(index === upcomingMovies.length -1){
          setIndex(0)
        }
  }

  const handleLeft = ()=> {
      setIndex(index - 1)
      if(index === 0){
          setIndex(upcomingMovies.length - 1)
        }
  }


  return (
    <div style={sliderStyle}>
      <MdKeyboardArrowLeft className="left-arrow" onClick={handleLeft}/>
      <MdKeyboardArrowRight className="right-arrow" onClick={handleRight}/>

      <div className="slider-info">
        <h1>{upcomingMovies[index]?.title}</h1>
        <p className="slider-description">
        {upcomingMovies[index]?.overview.slice(130)}
        </p>
        <p>Release Date: {upcomingMovies[index]?.release_date}</p>
      </div>
    </div>
  );
}

export default Slider;

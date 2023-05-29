import React, {useEffect, useContext} from 'react'
import './HomePage.css'
import Slider from '../../components/Slider/Slider'
import axios from 'axios'
import PopularMovies from './../../components/PopularMovies/PopularMovies';
import TopRatedMovies from '../../components/TopRatedMovies/TopRatedMovies';
import { useState } from 'react';
import { ThemeContext } from "../../Context/ThemeContext";


function HomePage({ apiKey, baseUrl }) {
const [topRatedMovies, setTopRatedMovies] = useState([])
const {darkMode,setDarkMode} = useContext(ThemeContext)


  useEffect(()=> {

    //top-Rated
    axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}`)
    .then((res) => {
      setTopRatedMovies(res.data.results)
    })
    .catch((error) => {
      console.log(error)
    });

  }, [])

  
  return ( 
      <div className={darkMode ? "homepage-container" : "homepage-container home-light"}>  
        <Slider apiKey={apiKey} baseUrl={baseUrl}/>

        <div className='movies-wrapper'>
          <PopularMovies apiKey={apiKey} baseUrl={baseUrl}/>
          <TopRatedMovies 
          topRatedMovies={topRatedMovies} 
          className='topRated-mobile'/>
        </div>
    </div>
  )
}

export default HomePage
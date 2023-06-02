import './SearchResult.css'
import { useNavigate} from "react-router-dom";
import {useState} from 'react'
import noImage from '../../assets/noImage.png'

function SearchResults({movie,setQuery}) {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

    
    const handleNavigation=()=>{ 
        setQuery('')
        navigate(`/movieDetails/${movie.id}`)
      }

  return (
      <div className="search-results-item" onClick={handleNavigation} >
        <img className="result-img" src={imageError ? noImage :`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
           onError={() => setImageError(true)}/>
        <p>{movie.title}</p> 
    </div>
  )
}

export default SearchResults
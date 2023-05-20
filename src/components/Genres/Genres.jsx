import {useEffect, useState} from 'react'
import axios from 'axios'
import './Genres.css'

function Genres({ baseUrl, apiKey, genreIds }) {

    const [allGenres, setAllGenres] = useState([])

    useEffect(()=> {
      axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)
      .then((res)=> setAllGenres(res.data.genres))
    })


  return (
    <div className='genre-container'>
      <p>Genres:</p>
      {genreIds?.map((id, index)=> {
        for(let i = 0; i < allGenres.length; i++){
          if(allGenres[i].id === id){
            return (
              <span key={id}>
              {index === genreIds.length - 1
                  ? `${allGenres[i].name}`
                  : `${allGenres[i].name},`}
              </span>
            )
          }
        }
      })}
    </div>
  )
}

export default Genres
import React from 'react'
import StarRatings from 'react-star-ratings'

function Rating({ movieRating }) {
  return (
    <div>
         <StarRatings
              rating={movieRating}
              starRatedColor="red"
              numberOfStars={5}
              starDimension="19px"
              starSpacing="1px"
            />
    </div>
  )
}

export default Rating
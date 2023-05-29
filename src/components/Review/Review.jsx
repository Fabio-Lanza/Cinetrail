import React, { useState, useEffect, useContext } from "react";
import "./Review.css";
import avatar from "../../assets/avatar.jpg";
import { ThemeContext } from "../../Context/ThemeContext";

function Review({ review }) {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [seeMore, setSeeMore] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div key={review?.id} className="review">
      <div className="avatar-container">
        <img
          className="avatar"
          src={
            imageError
              ? avatar
              : `https://image.tmdb.org/t/p/w500/${review?.author_details.author_path}`
          }
          onError={() => setImageError(true)}
        />
        <p>{review?.author}</p>
      </div>

      {!seeMore ? (
        <p className={darkMode ? "content" : "content content-light"}>
          {review?.content.slice(0, 300)}...
          <span onClick={() => setSeeMore(true)} className="read-more">
            Read More
          </span>{" "}
        </p>
      ) : (
        <p className={darkMode ? "content" : "content content-light"}>
          {review?.content}...
          <span onClick={() => setSeeMore(false)} className="read-less">
            Read Less
          </span>{" "}
        </p>
      )}
    </div>
  );
}

export default Review;

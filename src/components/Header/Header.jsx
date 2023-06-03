import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { ThemeContext } from "../../Context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import MovieLogo from "../../assets/MovieLogo.png";
import axios from "axios";
import SearchResults from "../SearchResults/SearchResults";
import { UserDataContext } from "../../Context/UserDataContext";


function Header({ baseUrl, apiKey }) {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user, token, setToken } = useContext(UserDataContext);
  const [profileOptions,setProfileOptions]=useState(false)


  const handleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  const handleLogout=()=>{
    localStorage.clear()
    setToken('')
    navigate('/') 
 } 
  

  useEffect(() => {
    if (query.trim().length > 0) {
      axios
        .get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
        .then((res) => {
          setSearchResults(res.data.results);
        })
        .catch((err) => console.log(err));
    }
  }, [query]);

  return (
    <header
      className={
        darkMode ? "header-container" : "header-container header-light"
      }
    >
      <Link to="/" className="logo">
        <img src={MovieLogo} alt="" />
      </Link>

      <div className="search-container">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Movies..."
          className={`search-input ${query && "input-active"} ${
            !query && !darkMode && "input-light"
          }`}
        />

        {query.trim() !== "" && (
          <div className="search-results-container">
            {searchResults.map((movie) => {
              return (
                <SearchResults
                  setQuery={setQuery}
                  key={movie.id}
                  movie={movie}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="header-buttons-container">
        {darkMode ? (
          <div className="theme-button-container">
            <MdOutlineLightMode className="theme-icon " onClick={handleTheme} />
            <MdOutlineDarkMode
              className="theme-icon theme-icon-active"
              onClick={handleTheme}
            />
          </div>
        ) : (
          <div className="theme-button-container">
            <MdOutlineLightMode
              className="theme-icon theme-icon-active"
              onClick={handleTheme}
            />
            <MdOutlineDarkMode className="theme-icon " onClick={handleTheme} />
          </div>
        )}
      </div>

      {token ? (
        <div
          className={
            darkMode ? "profile-container" : "profile-container profile-light"
          }
        >
          <img
            src={user.image_url}
            className="profile-img"
            onClick={() => setProfileOptions(!profileOptions)}
          />
          <p>
            Welcome <span>{user.username}</span>
          </p>

          {profileOptions ? (
            <div className="profile-options">
              <Link to="/myfavorites">My Favorites</Link>
              <p className="logout" onClick={handleLogout}>
                Logout
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <button
            className="create-account-btn"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

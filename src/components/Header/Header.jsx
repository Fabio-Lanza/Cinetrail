import "./Header.css";
import { Link } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { ThemeContext } from "../../Context/ThemeContext";
import { useContext } from "react";
import MovieLogo from '../../assets/MovieLogo.png'

function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleTheme = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', JSON.stringify(!darkMode))
  }

  return (
    <header className={`header-container ${!darkMode && "header-light"}`}>
      <Link to="/" className="logo">
        <img src={MovieLogo} alt="" />
      </Link>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Movies..."
          className="search-input"
        />
      </div>
      <div className="header-buttons-container">
        {darkMode ? (
        <div className="theme-button-container">
          <MdOutlineLightMode className="theme-icon " onClick={handleTheme}/>
          <MdOutlineDarkMode className="theme-icon theme-icon-active" onClick={handleTheme} />
        </div>
        ) : (
            <div className="theme-button-container">
            <MdOutlineLightMode className="theme-icon theme-icon-active" onClick={handleTheme}/>
            <MdOutlineDarkMode className="theme-icon " onClick={handleTheme} />
          </div>
        )}

        <button className="create-account-btn">Create Account</button>
      </div>
    </header>
  );
}

export default Header;

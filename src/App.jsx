import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeContextProvider from "./Context/ThemeContext";
import HomePage from "./pages/HomePage/HomePage";
import MovieDetails from "./pages/MovieDetails/MovieDetails";



function App() {

  const apiKey = import.meta.env.VITE_API_KEY; 
  const baseUrl = import.meta.env.VITE_BASE_URL; 
  // const apiKey = '477f5f5debaf48768ed55d725362b931'; 
  // const baseUrl = 'https://api.themoviedb.org/3'; 
  

  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Header apiKey={apiKey} baseUrl={baseUrl}/>
        <Routes>
          <Route path="/" element={<HomePage apiKey={apiKey} baseUrl={baseUrl}/>} />
          <Route path="/movieDetails/:moveid" element={<MovieDetails apiKey={apiKey} baseUrl={baseUrl}/>}/>        
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;

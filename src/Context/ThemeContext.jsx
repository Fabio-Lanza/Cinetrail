import { createContext, useState, useEffect } from "react";  

export const ThemeContext = createContext()


export default function ThemeContextProvider({ children }){

const [darkMode, setDarkMode] = useState(true)


useEffect(()=> {
 const theme = localStorage.getItem('darkMode')
 if(theme){
    setDarkMode(JSON.parse(theme))
 }
  }, [])

  

const value = {darkMode, setDarkMode}

return(
    <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
)
}
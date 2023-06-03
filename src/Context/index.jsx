import ThemeContextProvider from "./ThemeContext";
import UserDataContextProvider from "./UserDataContext";

export default function CombinedContextProvider({ children }) {
  return (
    <ThemeContextProvider>
      <UserDataContextProvider>
        {children}
        </UserDataContextProvider>
    </ThemeContextProvider>
  );
}

import  { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create the ThemeContext with default values
export const ThemeContext = createContext({
  toggleTheme: () => {},
});

// Define MUI light and dark themes
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#dc004e",
          },
          background: {
            default: "#f5f5f5",
            paper: "#ffffff",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#90caf9",
          },
          secondary: {
            main: "#f48fb1",
          },
          background: {
            default: "#121212",
            paper: "#1d1d1d",
          },
        }),
  },
});

export const ThemeProvider = ({ children }) => {
  // Function to get the initial theme
  const getInitialTheme = () => {
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        return storedTheme;
      } else {
        // Prefer dark theme initially
        return "dark";
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return "dark";
    }
  };

  const [theme, setTheme] = useState(getInitialTheme());

  // Function to toggle between themes
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      return newTheme;
    });
  }, []);

  // Update the `dark` class on the <html> element and store the theme in localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Store the theme in localStorage
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error setting theme in localStorage:", error);
    }
  }, [theme]);

  // Memoize MUI theme to prevent unnecessary recalculations
  const muiTheme = useMemo(() => createTheme(getDesignTokens(theme)), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

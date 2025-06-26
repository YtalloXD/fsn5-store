import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#dee9ff",
      secondary: "#80f1fb",
      terciary: "#195b59",
    },
    secondary: {
      main: "#051212",
      secondary: "#BFBFBF",
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h1: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      h2: {
        fontSize: "1.5rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.25rem",
        fontWeight: 600,
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);

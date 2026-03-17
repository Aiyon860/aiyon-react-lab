import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
);

import React, { useState } from "react";
import "./App.css";
import Provancewether from "./Components/ProvanceWether";
import Header from "./Components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ToggleModeContext from "./Contexts//ToggleMode";

function App() {
  const [ConMode, setConMode] = useState();
  const font = createTheme({
    typography: {
      fontFamily: "'opensans', sans-serif",
    },
    palette: {
      mode: ConMode ? "dark" : "light",
    },
  });
  const [selectedCity, setSelectedCity] = useState({
    name: "Sana'a",
    lat: 15.36,
    lon: 44.19,
  });

  return (
    <div
      className={`App min-h-screen ${
        ConMode
          ? "bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600"
          : "bg-gradient-to-r from-purpleLight via-purpleDark to-purpleDeep"
      }`}
    >
      <ToggleModeContext.Provider value={{ ConMode, setConMode }}>
        <ThemeProvider theme={font}>
          <Header
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
          <Provancewether selectedCity={selectedCity} />
        </ThemeProvider>
      </ToggleModeContext.Provider>
    </div>
  );
}

export default App;

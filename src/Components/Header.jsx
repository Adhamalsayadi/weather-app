import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment/min/moment-with-locales";
import { useContext } from "react";
import ToggleModeContext from "../Contexts/ToggleMode";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Switch from "@mui/material/Switch";
import SearchIcon from "@mui/icons-material/Search";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,

  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "80%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
    display: "flex",
  },
}));
const AmberSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "white",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#fcd34d",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const cities = [
  { name: "Sana'a", lat: 15.36, lon: 44.19 },
  { name: "Al Qaeem", lat: 31.4, lon: 39.8 },
  { name: "Amman ", lat: 31.95, lon: 35.93 },
  { name: "Munich ", lat: 48.13, lon: 11.58 },
];
export default function Header({ selectedCity, setSelectedCity }) {
  const { t, i18n } = useTranslation();
  const [Weatherlanguage, setLanguage] = useState("ar");
  useEffect(() => {
    if (Weatherlanguage === "ar") {
      moment.locale("ar");

      i18n.changeLanguage("ar");
    } else if (Weatherlanguage === "en") {
      i18n.changeLanguage("en");
      moment.locale("en");
    }

    moment().format("MMMM Do YYYY, h:mm:ss a");
  }, [Weatherlanguage, i18n]);
  const { ConMode, setConMode } = useContext(ToggleModeContext);

  return (
    <AppBar
      position="static"
      className="!shadow-none !h-2 !px-5 "
      color="transparent"
    >
      <Toolbar
        sx={{
          minHeight: 100,
          display: "flex",
          justifyContent: "space-between",
          px: 5,
        }}
        className={`!flex !justify-center !mx-20 rounded-md ${
          ConMode
            ? "bg-gradient-to-r from-purpleLight via-purpleDark to-purpleDeep"
            : "text-white bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600" // Light mode: your original gradient
        }`}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          className=" !font-bold ml-72  !p-4"
        >
          {t("title")}
        </Typography>
        <div className="relative w-48">
          <select
            value={selectedCity.name}
            onChange={(e) => {
              const city = cities.find((c) => c.name === e.target.value);
              setSelectedCity(city);
            }}
            className="w-full bg-blue-400 text-white rounded-full p-2 pl-3 pr-3 appearance-none"
          >
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <SearchIcon className="text-white" />
          </div>
        </div>
        <AmberSwitch
          defaultChecked
          value={ConMode}
          onClick={() => {
            setConMode(!ConMode);
          }}
        />
        <ToggleButtonGroup
          color="primary"
          value={Weatherlanguage}
          exclusive
          onChange={(e, newLang) => {
            if (newLang) setLanguage(newLang);
          }}
          aria-label="Platform"
        >
          <ToggleButton value="ar" className="!text-white min-h-2">
            {Weatherlanguage === "en" ? "Arabic" : "عربي"}
          </ToggleButton>
          <ToggleButton value="en" className="!text-white min-h-2">
            {Weatherlanguage === "en" ? "English" : "انجليزية"}
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
}

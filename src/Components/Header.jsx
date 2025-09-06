import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment/min/moment-with-locales";
import ToggleModeContext from "../Contexts/ToggleMode";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Switch from "@mui/material/Switch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";

const AmberSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "white",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#fcd34d",
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (Weatherlanguage === "ar") {
      moment.locale("ar");
      i18n.changeLanguage("ar");
    } else {
      i18n.changeLanguage("en");
      moment.locale("en");
    }
  }, [Weatherlanguage, i18n]);

  const { ConMode, setConMode } = useContext(ToggleModeContext);

  const drawerContent = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t("title")}
      </Typography>
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
      <Box sx={{ mt: 2 }}>
        <AmberSwitch
          defaultChecked
          value={ConMode}
          onClick={() => setConMode(!ConMode)}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <ToggleButtonGroup
          color="primary"
          value={Weatherlanguage}
          exclusive
          onChange={(e, newLang) => newLang && setLanguage(newLang)}
          aria-label="Language"
        >
          <ToggleButton value="ar">
            {Weatherlanguage === "en" ? "Arabic" : "عربي"}
          </ToggleButton>
          <ToggleButton value="en">
            {Weatherlanguage === "en" ? "English" : "انجليزية"}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar
          sx={{
            minHeight: 100,
            display: "flex",
            justifyContent: "space-between",
            px: 5,
          }}
          className={`rounded-md ${
            ConMode
              ? "bg-gradient-to-r from-purpleLight via-purpleDark to-purpleDeep"
              : "text-white bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600"
          }`}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="!font-bold"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {t("title")}
          </Typography>

          {/* Hamburger menu for small screens */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Full header items for medium+ screens */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
            <select
              value={selectedCity.name}
              onChange={(e) => {
                const city = cities.find((c) => c.name === e.target.value);
                setSelectedCity(city);
              }}
              className="bg-blue-400 text-white rounded-full p-2 pl-3 pr-3 appearance-none"
            >
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <AmberSwitch
              defaultChecked
              value={ConMode}
              onClick={() => setConMode(!ConMode)}
            />
            <ToggleButtonGroup
              color="primary"
              value={Weatherlanguage}
              exclusive
              onChange={(e, newLang) => newLang && setLanguage(newLang)}
              aria-label="Language"
            >
              <ToggleButton value="ar">
                {Weatherlanguage === "en" ? "Arabic" : "عربي"}
              </ToggleButton>
              <ToggleButton value="en">
                {Weatherlanguage === "en" ? "English" : "انجليزية"}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import CloudIcon from "@mui/icons-material/Cloud";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
moment.locale("ar");

export default function Provancewether({ selectedCity }) {
  const [temp, settemp] = useState({
    temp: null,
    temp_max: null,
    temp_min: null,
    des: "",
    icon: null,
  });
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!selectedCity) return;

    i18n.changeLanguage("ar");

    const source = axios.CancelToken.source();

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=522210de1640f706b311dbea48f44d73`,
        { cancelToken: source.token }
      )
      .then((response) => {
        const tempres = Math.round(response.data.main.temp - 272.15);
        const temp_max = Math.round(response.data.main.temp_max - 272.15);
        const temp_min = Math.round(response.data.main.temp_min - 272.15);
        const des = response.data.weather[0].description;
        const ic = response.data.weather[0].icon;

        settemp({
          temp: tempres,
          temp_max: temp_max,
          temp_min: temp_min,
          des: des,
          icon: `https://openweathermap.org/img/wn/${ic}@2x.png`,
        });
      })
      .catch((error) => console.log(error));

    return () => source.cancel();
  }, [i18n, selectedCity]);

  return (
    <Container maxWidth="sm" className="mt-24 mx-auto">
      <div
        dir="rtl"
        className="bg-gradient-to-r from-purpleLight to-purpleDark text-white p-6 rounded-3xl shadow-lg flex flex-col justify-between"
      >
        {/* Name & Date */}
        <div className="mb-4 text-center sm:text-right">
          <h2 className="font-bold text-xl sm:text-2xl mb-1">
            {t("city")}: {selectedCity?.name}
          </h2>
          <h5 className="text-sm sm:text-base">
            {moment().format("MMMM Do YYYY, h:mm:ss a")}
          </h5>
        </div>

        <hr className="border-2 border-white mb-4 w-full" />

        {/* Temperature & Icon */}
        <div className="flex flex-col sm:flex-row justify-around items-center gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center">
              <h1 className="text-4xl sm:text-5xl font-bold">{temp.temp}</h1>
              {temp.icon && (
                <img
                  src={temp.icon}
                  alt=""
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
              )}
            </div>
            <h5 className="text-center sm:text-left my-1">{temp.des}</h5>

            <div className="flex justify-center sm:justify-start gap-2 font-bold text-sm sm:text-base">
              <span>
                {t("temp_max")}: {temp.temp_max}
              </span>
              <span>|</span>
              <span>
                {t("temp_min")}: {temp.temp_min}
              </span>
            </div>
          </div>

          <CloudIcon
            className="mt-2 sm:mt-0"
            style={{
              fontSize:
                window.innerWidth > 1536
                  ? "10rem"
                  : window.innerWidth > 1280
                  ? "20rem"
                  : window.innerWidth > 1024
                  ? "15rem"
                  : window.innerWidth > 768
                  ? "12rem"
                  : "8rem",
            }}
          />
        </div>
      </div>
    </Container>
  );
}

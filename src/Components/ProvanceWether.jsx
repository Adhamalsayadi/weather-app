import React from "react";
import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";

import CloudIcon from "@mui/icons-material/Cloud";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import { useEffect, useState } from "react";
// import ToggleModeContext from "../Contexts//ToggleMode";
// import { useContext } from "react";
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

    const source = axios.CancelToken.source(); // create cancel token

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

    return () => source.cancel(); // cancel previous request on unmount
  }, [i18n, selectedCity]); // <-- now depends on selectedCity

  return (
    <Container
      maxWidth="lg"
      className="mt-24 text-center !w-[500px] !h-[300px] !rounded-4xl"
    >
      {/* main div  */}
      <div className=" bg-gradient-to-r from-purpleLight via-purpleDark to-purpleDeep !h-full w-full text-white p-2 rounded-sm ">
        {/* content  */}
        <div dir="rtl" className="w-full  ">
          {/* name and date  */}
          <div
            className="flex items-end justify-start    h-full mt-4  "
            dir="rtl"
          >
            <h2 className="mx-2 mt-4 mb-2 font-bold text-2xl">
              {" "}
              {t("city")}: {selectedCity?.name}
            </h2>
            <h5 className="mx-4 mt-4 mb-2 text-[15px]">
              {moment().format("MMMM Do YYYY, h:mm:ss a")}
            </h5>
          </div>
          {/* end name and date  */}

          <hr className="text-white  border-2 !w-full" />
          {/* temp and icons  */}
          <div className="flex justify-around  w-full ">
            <div>
              <div className="flex justify-center items-center mt-1.5">
                <h1 className="text-white  text-5xl ml-3  ">{temp.temp}</h1>
                <img src={temp.icon} alt="" />
              </div>
              <h5 className="text-right my-1.5">{temp.des}</h5>
              {/* min and max  */}
              <div className="flex itemes-end justify-end  h-9 w-56 font-bold ">
                <h5 className="!text-right">
                  {t("temp_max")}: {temp.temp_max}
                </h5>
                <h5 className="px-4 ">|</h5>
                <h5>
                  {t("temp_min")}: {temp.temp_min}
                </h5>
              </div>
            </div>
            {/* end temp and icons  */}
            <CloudIcon className="!text-9xl mb-2" />
          </div>
        </div>
        {/* end content  */}
      </div>
    </Container>
  );
}

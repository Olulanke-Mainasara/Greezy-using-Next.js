import gettingCurrentConditions from "@/utils/getCurrentConditions";
import React, { useEffect, useState } from "react";

const CityResult = ({ result }) => {
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,pressure_msl,visibility,windspeed_80m,winddirection_80m&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&windspeed_unit=ms&timezone=auto`
      );
      const jsonData = await rawData.json();
      const usedInfo = jsonData.current_weather;
      setCityData(usedInfo);
    };

    fetchData();
  }, [result.latitude, result.longitude]);

  if (!cityData) {
    return null;
  }

  return (
    <article className="flex flex-col justify-around w-full p-5 mx-auto text-white border shadow-2xl h-52 sm:aspect-square rounded-3xl xl:w-52">
      <h1 className="text-base">
        {Object.keys(result).length == 5
          ? result.name + ", " + result.state + ", " + result.country
          : result.name + ", " + result.country}
      </h1>
      <h1 className="text-6xl text-center">{cityData.temperature + "°C"}</h1>
      <h1 className="text-base text-right">
        {gettingCurrentConditions(cityData.weathercode)}
      </h1>
    </article>
  );
};

export default CityResult;
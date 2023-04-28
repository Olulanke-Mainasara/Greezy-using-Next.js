import React, { useState } from "react";
import Head from "next/head";
import Nav from "@/components/Nav";
import DayForecast from "@/components/DayForecast";
import { FaSearch } from "react-icons/fa";
import CityResult from "@/components/CityResult";

const Cities = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const operation = {
          method: "GET",
          headers: { "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY },
          contentType: "application/json",
        };

        const rawData = await fetch(
          "https://api.api-ninjas.com/v1/geocoding?city=" + e.target.value,
          operation
        );
        const jsonData = await rawData.json();

        setSearchResults(jsonData);
      } catch (error) {
        console.log(error.message);
      }
    }
  };


  return (
    <>
      <Head>
        <title>Cities | Greezy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#262626]">
        <div className="flex flex-col w-full min-h-[100dvh] xl:h-screen gap-12 p-4 xl:flex-row xl:gap-8">
          <Nav />
          <section className="flex flex-col p-4 pb-5 space-y-10 grow background rounded-3xl md:p-8 h-fit xl:h-auto">
            <div className="flex items-center w-full gap-4">
              <h1 className="text-4xl text-center text-white xl:text-7xl">
                Cities
              </h1>

              <form
                className="flex items-center w-full h-10 gap-2 pl-2 border rounded-lg"
              >
                <FaSearch color="#fff" />
                <input
                  type="search"
                  className="w-full h-full text-white bg-transparent outline-none"
                  placeholder="Search for a city"
                  onKeyDown={handleKeyPress}
                ></input>
              </form>
            </div>

            <div className="grid grid-cols-1 gap-10 xl:gap-y-14 md:grid-cols-3">
              {searchResults.map((result) => (
                <CityResult key={Math.random() * 10000} result={result} />
              ))}
            </div>
          </section>
          <DayForecast />
        </div>
      </main>
    </>
  );
};

export default Cities;
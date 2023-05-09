import Head from "next/head";

import LocationNeeded from "@/components/Feedback/LocationNeeded";
import MapInfo from "@/components/Map";
import Nav from "@/components/Nav";
import React, { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useLocalStorage } from "react-use";

const Map = () => {
  const [askUser, setAskUser] = useState(null);
  const [confirmed, setConfirmed] = useLocalStorage("confirmed");
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (confirmed !== "true") {
      setAskUser(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePinpoint = () => {
    setConfirmed("false");
    const timeout = setTimeout(() => setConfirmed("true"), 500);
    setTimeoutId(timeout);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleLocationClick = () => {
    setConfirmed("true");
    setAskUser(false);
  };

  const handleActive = () => {
    setAskUser(false);
  };

  return (
    <>
      <Head>
        <title>Map | Greezy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center w-screen h-[100dvh] gap-8 bg-[#262626] xl:p-4 pb-[58px] xl:pb-4">
        <Nav />
        <section className="relative z-10 h-full overflow-hidden border xl:rounded-3xl grow">
          <MapInfo confirmed={confirmed} />
        </section>
        <button
          className="absolute z-20 px-8 py-2 text-white duration-300 bg-black rounded-lg rounded-tl-none rounded-br-none top-3 right-3 xl:right-4 xl:top-4 hover:bg-black hover:text-white"
          onClick={handlePinpoint}
        >
          <FaLocationArrow />
        </button>
      </main>

      {askUser && (
        <LocationNeeded
          handleActive={handleActive}
          handleLocationClick={handleLocationClick}
        />
      )}
    </>
  );
};

export default Map;

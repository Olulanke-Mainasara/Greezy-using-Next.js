import Head from "next/head";

import MapInfo from "@/components/Map";
import Nav from "@/components/Nav";
import React from "react";

const Map = () => {
  return (
    <>
      <Head>
        <title>Map | Greezy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center w-screen h-screen gap-8 bg-[#262626] p-4">
        <Nav />
        <div className="h-full overflow-hidden grow">
          <MapInfo />
        </div>
      </main>
    </>
  );
};

export default Map;

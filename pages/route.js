import Head from "next/head";

import Nav from "@/components/Nav";
import RouteResult from "@/components/Route/RouteResult";
import { useState } from "react";
import Loading from "react-loading";

import getRoute from "./api/getRoute";

const Route = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [startChoice, setStartChoice] = useState("Your location");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [mode, setMode] = useState("driving-car");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //   if (startChoice === "Your location") {
      //     navigator.geolocation.getCurrentPosition((position) => {
      //         setOrigin(position)
      //     })
      //   } else {

      //   }

      const options = {
        origin: origin,
        destination: destination,
        mode: mode,
      };

      const data = await getRoute(options);
      console.log(data);
      setRoutes(data);

      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <Head>
        <title>Route | Greezy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center w-screen min-h-[100dvh] xl:h-screen gap-8 bg-[#262626] p-4 pb-[86px] xl:pb-4">
        <Nav />
        <section className="flex flex-col h-full p-4 pb-5 space-y-10 border grow background rounded-3xl md:p-8">
          <div className="flex flex-col items-center w-full gap-6 xl:gap-4 xl:flex-row">
            <h1 className="text-4xl text-center text-white xl:text-7xl">
              Route
            </h1>

            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col items-center w-full gap-6 md:flex-row"
            >
              <select
                required
                className="w-full h-10 pl-2 text-white bg-transparent border rounded-lg outline-none"
                onChange={(e) => setStartChoice(e.target.value)}
              >
                <option value={"Your location"}>Your location</option>
                <option value={"custom"}>Set location</option>
              </select>

              <input
                type="text"
                className={`w-full h-10 pl-2 text-white bg-transparent border rounded-lg outline-none ${
                  startChoice === "Your location" ? "hidden" : ""
                }`}
                placeholder="Starting location"
                required
                onChange={(e) => setOrigin(e.target.value)}
              ></input>

              <input
                type="text"
                className="w-full h-10 pl-2 text-white bg-transparent border rounded-lg outline-none"
                placeholder="Destination"
                required
                onChange={(e) => setDestination(e.target.value)}
              ></input>

              <select
                required
                className="w-full h-10 pl-2 text-white bg-transparent border rounded-lg outline-none"
                onChange={(e) => setMode(e.target.value)}
              >
                <option value={"driving-car"}>Driving</option>
                <option value={"cycling-regular"}>Cycling</option>
                <option value={"foot-walking"}>Walking</option>
              </select>

              <button
                className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
                type="submit"
              >
                Start
              </button>
            </form>
          </div>

          {loading == false && error == false && routes.length == 0 ? (
            <div className="flex items-center justify-center p-8 pt-4 grow">
              <h1 className="text-3xl text-white xl:text-5xl">
                No set route...
              </h1>
            </div>
          ) : error == true && routes.length == 0 ? (
            <div className="flex items-center justify-center p-8 pt-4 grow">
              <h1 className="text-3xl text-white xl:text-5xl">
                Error setting route
              </h1>
            </div>
          ) : loading == false && routes.length > 0 ? (
            <div className="grid grid-cols-1 pl-4 overflow-scroll">
              {routes.map((route) => (
                <RouteResult key={Math.random() * 10000} route={route} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center p-8 pt-4 grow">
              <h1 className="flex items-center justify-center gap-2 text-3xl text-white xl:text-5xl">
                Setting route
                <Loading
                  type="spinningBubbles"
                  color="#fff"
                  height={50}
                  width={50}
                />
              </h1>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Route;

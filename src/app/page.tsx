"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAstronomyData, getForecastData } from "@/data/api";
import { IAstronomy, ICurrentLocation, ILocation } from "@/interfaces";
import Image from "next/image";

export default function Home() {
  const [astronomy, setAstronomy] = useState<IAstronomy>();
  const [currentForecast, setCurrentForecast] = useState<ICurrentLocation>();
  const [loading, setLoading] = useState<boolean>();
  const [location, setLocation] = useState<ILocation>();
  const [position, setPosition] = useState<GeolocationPosition>();

  const handleGetCurrentPosition = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition(pos);
          setLoading(false);
        },
        () => {
          toast.error(
            "Could you allow the location on the browser? A reminder that this is a weather tool!",
            {
              duration: 10000,
              position: "top-right",
              id: "err",
              icon: "📍",
            }
          );
          setLoading(false);
        }
      );
    }
  };

  const handleGetAstronomy = async () => {
    const latitude = position?.coords.latitude as number;
    const longitude = position?.coords.longitude as number;
    const response = await getAstronomyData({ latitude, longitude });
    setAstronomy(response.astronomy.astro);
    setLocation(response.location);
  };

  const handleGetForecast = async () => {
    const latitude = position?.coords.latitude as number;
    const longitude = position?.coords.longitude as number;
    const response = await getForecastData({ latitude, longitude });
    setCurrentForecast(response.current);
  };

  useEffect(() => {
    if (position) {
      handleGetAstronomy();
      handleGetForecast();
    }
  }, [position]);

  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        permissionStatus.onchange = () => {
          if (permissionStatus.state === "granted") handleGetCurrentPosition();
        };
      });

    if (!position) handleGetCurrentPosition();
  }, []);

  if (!position && loading)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 ">
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <div className="flex items-end">
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
            <p className="relative dark:drop-shadow-[0_0_0.3rem_#000] text-white text-5xl">
              WEATHER
            </p>
            <p className="relative dark:drop-shadow-[0_0_0.3rem_#000] text-white text-xl">
              FORECAST
            </p>
          </div>
        </div>
      </main>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <div className="flex items-end">
          <p className="relative dark:drop-shadow-[0_0_0.3rem_#000] text-white text-5xl">
            WEATHER
          </p>
          <p className="relative dark:drop-shadow-[0_0_0.3rem_#000] text-white text-xl">
            FORECAST
          </p>
        </div>
      </div>

      <div>
        {location && (
          <p>
            {location.name} - {location.region} - {location.country}
          </p>
        )}
        {currentForecast && (
          <div className="flex mt-4">
            <div className="flex items-center mr-[40px]">
              <Image
                src={`https:${currentForecast.condition.icon}`}
                alt={currentForecast.condition.text}
                className="object-contain"
                width={64}
                height={64}
              />
              <p>{currentForecast.temp_c}°C</p>
            </div>
            <div>
              <p>Wind: {currentForecast.wind_kph}Km/h</p>
              <p>Humidity: {currentForecast.humidity}%</p>
            </div>
          </div>
        )}
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="#"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Astronomy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Moon Phase: {astronomy?.moon_phase}
          </p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Moon illumination level: {astronomy?.moon_illumination}
          </p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Moonrise: {astronomy?.moonrise}
          </p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Moonset: {astronomy?.moonset}
          </p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Sunset: {astronomy?.sunset}
          </p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Sunrise: {astronomy?.sunrise}
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div></div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <span>Powered by</span>
          <a href="https://www.weatherapi.com/" title="Free Weather API">
            <Image
              src="https://cdn.weatherapi.com/v4/images/weatherapi_logo.png"
              alt="Weather data by WeatherAPI.com"
              className="dark:invert"
              width={100}
              height={100}
            />
          </a>
        </div>
      </div>
    </main>
  );
}

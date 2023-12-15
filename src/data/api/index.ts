import { IResponseAstronomy } from "@/interfaces";
import axios from "axios";

export const getAstronomyData = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<IResponseAstronomy> => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/astronomy.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=no&lang=
          `,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return {} as IResponseAstronomy;
  }
};

export const getForecastData = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latitude},${longitude}&days=1&aqi=no&alerts=no

          `,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {}
};

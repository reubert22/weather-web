import { IResponseAstronomy, IResponseForecast } from "@/interfaces";
import { apiClient } from "./client";

export const getAstronomyData = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<IResponseAstronomy> => {
  try {
    const response = await apiClient.get(
      `astronomy.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=no&lang=`
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
}): Promise<IResponseForecast> => {
  try {
    const response = await apiClient.get(
      `forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`
    );

    return response.data;
  } catch (error) {
    return {} as IResponseForecast;
  }
};

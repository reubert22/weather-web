import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://api.weatherapi.com/v1/",
  headers: { Accept: "application/json" },
});

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getAstronomyDataResponseMock,
  getForecastDataResponseMock,
} from "../__mocks__/index";
import { getAstronomyData, getForecastData } from "../index";
import { apiClient } from "../client";

describe("Api", () => {
  it("returns data when getAstronomyData is called", (done) => {
    var mock = new MockAdapter(apiClient);
    const data = getAstronomyDataResponseMock;
    mock
      .onGet(
        `astronomy.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${getAstronomyDataResponseMock.location.lat},${getAstronomyDataResponseMock.location.lon}&aqi=no&lang=`
      )
      .reply(200, data);

    getAstronomyData({
      latitude: getAstronomyDataResponseMock.location.lat,
      longitude: getAstronomyDataResponseMock.location.lon,
    }).then((response) => {
      expect(response).toEqual(data);
      done();
    });
  });

  it("returns data when getForecastData is called", (done) => {
    var mock = new MockAdapter(apiClient);
    const data = getForecastDataResponseMock;
    mock
      .onGet(
        `forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${getForecastDataResponseMock.location.lat},${getForecastDataResponseMock.location.lon}&days=1&aqi=no&alerts=no`
      )
      .reply(200, data);

    getForecastData({
      latitude: getForecastDataResponseMock.location.lat,
      longitude: getForecastDataResponseMock.location.lon,
    }).then((response) => {
      expect(response).toEqual(data);
      done();
    });
  });
});

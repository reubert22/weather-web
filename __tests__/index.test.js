import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
import "@testing-library/jest-dom";

global.navigator.permissions = {
  query: jest.fn().mockImplementation(() =>
    Promise.resolve({
      name: "geolocation",
      state: "granted",
      onchange: jest.fn(),
    })
  ),
};

describe("Home", () => {
  it("renders homepage unchanged", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it("renders a heading", () => {
    render(<Home />);

    const getWeatherText = screen.getByText("WEATHER");
    const getForecastText = screen.getByText("FORECAST");

    expect(getWeatherText).toBeInTheDocument();
    expect(getForecastText).toBeInTheDocument();
  });
});

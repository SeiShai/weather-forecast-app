// API helper functions for fetching weather data
// TODO: Implement API calls to your backend routes

import { WeatherData, ForecastData } from "@/types/weather";

/**
 * Fetch current weather for a city
 * TODO: Implement this function to call /api/weather
 */
export async function fetchWeather(city: string): Promise<WeatherData> {
  // Your code here
  throw new Error("Not implemented yet");
}

/**
 * Fetch 5-day forecast for a city
 * TODO: Implement this function to call /api/forecast
 */
export async function fetchForecast(city: string): Promise<ForecastData> {
  // Your code here
  throw new Error("Not implemented yet");
}

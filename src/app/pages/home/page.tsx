"use client";

import { useState } from "react";
import { WeatherData, ForecastData } from "../../../types/weather";

export default function HomePage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Fetch current weather
      const weatherRes = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`
      );
      if (!weatherRes.ok) throw new Error("City not found");
      const weatherData: WeatherData = await weatherRes.json();

      // Fetch forecast
      const forecastRes = await fetch(
        `/api/forecast?city=${encodeURIComponent(city)}`
      );
      if (!forecastRes.ok) throw new Error("Forecast not available");
      const forecastData: ForecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Get today's hourly forecast (next 24 hours, 3-hour intervals)
  const todayForecast = forecast?.list.slice(2, 9) || [];

  // Get 7-day forecast (one entry per day at noon)
  const weekForecast =
    forecast?.list
      .filter((item, index) => {
        const time = item.dt_txt.split(" ")[1];
        return time === "12:00:00" && index < 40; // Get noon forecasts
      })
      .slice(0, 7) || [];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Search Bar - Full Width */}
      <div className="backdrop-blur-xl bg-white/10 border-b border-white/20 p-4 sticky top-0 z-10">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city . . . "
              className="flex-1 px-6 py-4 backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 text-lg font-medium"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-bold disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              {loading ? "⏳" : "🔍 Search"}
            </button>
          </div>
          {error && (
            <p className="text-red-300 text-center mt-3 font-semibold">
              ❌ {error}
            </p>
          )}
        </form>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        {weather && forecast ? (
          <div className="max-w-7xl mx-auto h-full">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* LEFT COLUMN - 2/3 width - FLEX COLUMN */}
              <div className="lg:col-span-2 flex flex-col gap-6 h-full overflow-y-auto">
                {/* Current Weather Card */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl flex-shrink-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Current Weather
                  </h2>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {weather.name}, {weather.sys.country}
                      </h3>
                      <p className="text-white/80 capitalize text-lg">
                        {weather.weather[0].description}
                      </p>
                    </div>
                    <div className="text-center">
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                        alt={weather.weather[0].description}
                        className="w-32 h-32"
                      />
                      <p className="text-6xl font-black text-white">
                        {Math.round(weather.main.temp)}°C
                      </p>
                      <p className="text-white/70 text-sm mt-1">
                        Feels like {Math.round(weather.main.feels_like)}°C
                      </p>
                    </div>
                  </div>
                </div>

                {/* Today's Hourly Forecast */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl flex-shrink-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Today's Forecast
                  </h2>

                  <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                    {todayForecast.map((item, index) => {
                      const time = new Date(item.dt * 1000).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      );
                      return (
                        <div
                          key={index}
                          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-3 text-center hover:bg-white/20 transition-all"
                        >
                          <p className="text-white/70 text-xs font-semibold mb-1">
                            {time}
                          </p>
                          <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt="weather"
                            className="w-12 h-12 mx-auto"
                          />
                          <p className="text-white font-bold text-lg">
                            {Math.round(item.main.temp)}°
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Air Conditions - FLEX-1 to take remaining space */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl flex-1 min-h-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Air Conditions
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Feels Like */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-orange-400/20 to-red-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">
                        🌡️ Feels Like
                      </p>
                      <p className="text-white text-2xl font-bold">
                        {Math.round(weather.main.feels_like)}°C
                      </p>
                    </div>

                    {/* Humidity */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-blue-400/20 to-cyan-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">💧 Humidity</p>
                      <p className="text-white text-2xl font-bold">
                        {weather.main.humidity}%
                      </p>
                    </div>

                    {/* Wind Speed */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-green-400/20 to-emerald-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">💨 Wind</p>
                      <p className="text-white text-2xl font-bold">
                        {Math.round(weather.wind.speed)} m/s
                      </p>
                    </div>

                    {/* Pressure */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-purple-400/20 to-pink-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">📊 Pressure</p>
                      <p className="text-white text-2xl font-bold">
                        {weather.main.pressure} hPa
                      </p>
                    </div>

                    {/* High/Low */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">🌡️ High/Low</p>
                      <p className="text-white text-2xl font-bold">
                        {Math.round(weather.main.temp_max)}° /{" "}
                        {Math.round(weather.main.temp_min)}°
                      </p>
                    </div>

                    {/* Clouds */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-gray-400/20 to-slate-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">☁️ Clouds</p>
                      <p className="text-white text-2xl font-bold">
                        {weather.clouds.all}%
                      </p>
                    </div>

                    {/* Sunrise */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-amber-400/20 to-yellow-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">🌅 Sunrise</p>
                      <p className="text-white text-lg font-bold">
                        {new Date(
                          weather.sys.sunrise * 1000
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {/* Sunset */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-indigo-400/20 to-purple-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">🌇 Sunset</p>
                      <p className="text-white text-lg font-bold">
                        {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - 1/3 width */}
              <div className="lg:col-span-1 h-full">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-white mb-4 flex-shrink-0">
                    7-Day Forecast
                  </h2>

                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {weekForecast.map((item, index) => {
                      const date = new Date(item.dt * 1000);
                      const dayName = date.toLocaleDateString("en-US", {
                        weekday: "short",
                      });
                      const monthDay = date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });

                      return (
                        <div
                          key={index}
                          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all flex-shrink-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-bold">{dayName}</p>
                              <p className="text-white/60 text-xs">
                                {monthDay}
                              </p>
                            </div>
                            <img
                              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                              alt="weather"
                              className="w-12 h-12"
                            />
                            <div className="text-right">
                              <p className="text-white font-bold text-xl">
                                {Math.round(item.main.temp)}°C
                              </p>
                              <p className="text-white/60 text-xs capitalize">
                                {item.weather[0].description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-8xl mb-6 animate-bounce-slow">🔍</div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Search for a City
              </h2>
              <p className="text-white/70 text-lg">
                Enter a city name in the search bar above to see the weather
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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

  // Get today's hourly forecast
  const todayForecast = forecast?.list.slice(2, 9) || []

  // Get 7-day forecast (one entry per day at noon)
  const weekForecast =
    forecast?.list
      .filter((item, index) => {
        const time = item.dt_txt.split(" ")[1];
        return time === "12:00:00" && index < 40;
      })
      .slice(0, 7) || [];

  // Helper function to format time (falls back to user's locale if city timezone not available)
    const formatCityTime = (timestamp: number) => {
      if (!weather) return "";
  
      // display the time in the browser's local timezone based on the UTC timestamp.
      const date = new Date(timestamp * 1000);
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      return date.toLocaleTimeString("en-US", options);
    };

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
              placeholder="Search for a city... (e.g., London, Tokyo, New York)"
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
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        {weather && forecast ? (
          <div className="max-w-7xl mx-auto">
            {/* Two Column Layout  */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT COLUMN - 2/3 width on desktop */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Current Weather Card */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Current Weather
                  </h2>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
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
                        className="w-24 h-24 sm:w-32 sm:h-32 mx-auto"
                      />
                      <p className="text-5xl sm:text-6xl font-black text-white">
                        {Math.round(weather.main.temp)}°C
                      </p>
                      <p className="text-white/70 text-sm mt-1">
                        Feels like {Math.round(weather.main.feels_like)}°C
                      </p>
                    </div>
                  </div>
                </div>

                {/* Today's Hourly Forecast */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Today's Forecast
                  </h2>

                  <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-3">
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
                            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
                          />
                          <p className="text-white font-bold text-base sm:text-lg">
                            {Math.round(item.main.temp)}°
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Air Conditions */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Air Conditions
                  </h2>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {/* Feels Like */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-orange-400/20 to-red-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">
                        🌡️ Feels Like
                      </p>
                      <p className="text-white text-xl sm:text-2xl font-bold">
                        {Math.round(weather.main.feels_like)}°C
                      </p>
                    </div>

                    {/* Humidity */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-blue-400/20 to-cyan-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">💧 Humidity</p>
                      <p className="text-white text-xl sm:text-2xl font-bold">
                        {weather.main.humidity}%
                      </p>
                    </div>

                    {/* Wind Speed */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-green-400/20 to-emerald-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">💨 Wind</p>
                      <p className="text-white text-xl sm:text-2xl font-bold">
                        {Math.round(weather.wind.speed)} m/s
                      </p>
                    </div>

                    {/* Pressure */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-purple-400/20 to-pink-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">📊 Pressure</p>
                      <p className="text-white text-xl sm:text-2xl font-bold">
                        {weather.main.pressure} hPa
                      </p>
                    </div>

                    {/* High/Low */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">🌡️ High/Low</p>
                      <p className="text-white text-xl sm:text-2xl font-bold">
                        {Math.round(weather.main.temp_max)}° /{" "}
                        {Math.round(weather.main.temp_min)}°
                      </p>
                    </div>

                    {/* Clouds */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-gray-400/20 to-slate-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">☁️ Clouds</p>
                      <p className="text-white text-xl sm:text-2xl font-bold">
                        {weather.clouds.all}%
                      </p>
                    </div>

                    {/* Sunrise - FIXED */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-amber-400/20 to-yellow-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">🌅 Sunrise</p>
                      <p className="text-white text-base sm:text-lg font-bold">
                        {formatCityTime(weather.sys.sunrise)}
                      </p>
                    </div>

                    {/* Sunset - FIXED */}
                    <div className="backdrop-blur-md bg-gradient-to-br from-indigo-400/20 to-purple-400/20 border border-white/20 rounded-2xl p-4">
                      <p className="text-white/70 text-sm mb-1">🌇 Sunset</p>
                      <p className="text-white text-base sm:text-lg font-bold">
                        {formatCityTime(weather.sys.sunset)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - 1/3 width on desktop, full width on mobile */}
              <div className="lg:col-span-1">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl lg:sticky lg:top-6">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    7-Day Forecast
                  </h2>

                  <div className="space-y-3">
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
                          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all"
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
            <div className="text-center px-4">
              <div className="text-6xl sm:text-8xl mb-6 animate-bounce-slow">
                🔍
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Search for a City
              </h2>
              <p className="text-white/70 text-base sm:text-lg">
                Enter a city name in the search bar above to see the weather
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

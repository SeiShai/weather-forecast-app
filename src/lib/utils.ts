// Utility functions for your weather app

/**
 * Convert Kelvin to Celsius
 */
export function kelvinToCelsius(kelvin: number): number {
  return Math.round(kelvin - 273.15);
}

/**
 * Convert Celsius to Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

/**
 * Format date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Get weather icon URL from OpenWeatherMap
 */
export function getWeatherIcon(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// TODO: Add more utility functions as needed

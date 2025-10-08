import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/weather?city=London
 *
 * Fetches current weather data from OpenWeatherMap API
 *
 * TODO: Implement the API call to OpenWeatherMap
 * - Get the city from query parameters
 * - Get API key from environment variables
 * - Make request to OpenWeatherMap
 * - Return the weather data
 */
export async function GET(request: NextRequest) {
  // TODO: Your implementation here

  return NextResponse.json({ error: "Not implemented yet" }, { status: 501 });
}

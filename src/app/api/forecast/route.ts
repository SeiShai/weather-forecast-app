import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/forecast?city=London
 *
 * Fetches 5-day forecast data from OpenWeatherMap API
 *
 * TODO: Implement the API call to OpenWeatherMap
 * - Get the city from query parameters
 * - Get API key from environment variables
 * - Make request to OpenWeatherMap forecast endpoint
 * - Return the forecast data
 */
export async function GET(request: NextRequest) {
  // TODO: Your implementation here

  return NextResponse.json({ error: "Not implemented yet" }, { status: 501 });
}

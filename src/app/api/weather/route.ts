import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get city from query parameters
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get("city");

    // Validate city
    if (!city) {
      return NextResponse.json(
        { error: "City parameter is required" },
        { status: 400 }
      );
    }

    // Get API key from environment
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Call OpenWeatherMap API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "City not found" },
          { status: 404 }
        );
      }
      throw new Error("Failed to fetch weather data");
    }

    // Return the data
    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
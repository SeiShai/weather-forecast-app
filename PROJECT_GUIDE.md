# 🌦️ Weather Forecast App - Project Structure Guide

## 📁 Directory Overview

```
src/
├── app/                      # Next.js App Router (Pages & Routes)
│   ├── page.tsx             # Home page (/) - START HERE!
│   ├── layout.tsx           # Root layout wrapper
│   ├── globals.css          # Global styles
│   └── api/                 # Backend API Routes
│       ├── weather/
│       │   └── route.ts     # GET /api/weather?city=London
│       └── forecast/
│           └── route.ts     # GET /api/forecast?city=London
│
├── components/              # Reusable React Components
│   ├── ui/                  # Generic UI components
│   │   ├── Button.tsx       # Reusable button
│   │   ├── Card.tsx         # Container card
│   │   └── Input.tsx        # Input field
│   ├── weather/             # Weather-specific components
│   │   ├── WeatherCard.tsx  # Display weather info
│   │   └── SearchBar.tsx    # City search input
│   └── layout/              # Layout components
│       ├── Header.tsx       # App header
│       └── Footer.tsx       # App footer
│
├── lib/                     # Utility & Helper Functions
│   ├── api.ts              # API helper functions
│   └── utils.ts            # Utility functions
│
└── types/                   # TypeScript Type Definitions
    └── weather.ts          # Weather data types
```

## 🚀 Getting Started - Learning Path

### Step 1: Setup Environment Variables

Your `.env.local` file is already set up with:

- `OPENWEATHER_API_KEY` - Your OpenWeatherMap API key
- `NEXT_PUBLIC_APP_URL` - Your app URL

### Step 2: Implement API Routes (Backend)

**Start with:** `src/app/api/weather/route.ts`

Learn to:

- Get query parameters from the URL
- Access environment variables
- Make external API calls to OpenWeatherMap
- Return JSON responses
- Handle errors

**OpenWeatherMap API Endpoints:**

- Current Weather: `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric`
- 5-Day Forecast: `https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric`

### Step 3: Build Frontend (Home Page)

**Start with:** `src/app/page.tsx`

Learn to:

- Use React hooks (`useState`, `useEffect`)
- Handle form submissions
- Make API calls to your backend
- Display loading states
- Handle errors
- Show data dynamically

### Step 4: Create Reusable Components

**Work on:**

- `SearchBar.tsx` - Practice form handling
- `WeatherCard.tsx` - Practice props and data display
- `Button.tsx` - Practice component variants

### Step 5: Add Helper Functions

**Work on:**

- `lib/api.ts` - Create functions to call your API routes
- `lib/utils.ts` - Already has utility functions you can use!

## 💡 Learning Tips

### For Beginners:

1. Start with the API routes first (backend)
2. Test them using your browser: `http://localhost:3000/api/weather?city=London`
3. Then build the frontend to use those API routes
4. Use `console.log()` to debug

### Component Structure Pattern:

```typescript
'use client' // Only if you need client-side features (useState, onClick, etc.)

interface ComponentProps {
  // Define your props
}

export default function ComponentName({ props }: ComponentProps) {
  // State & logic here

  return (
    // JSX here
  )
}
```

### API Route Pattern:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 1. Get parameters
  // 2. Validate input
  // 3. Make external API call
  // 4. Return response

  return NextResponse.json(data);
}
```

## 🎯 What to Build (Suggested Order)

1. **Weather API Route** (`api/weather/route.ts`)

   - Implement GET request handler
   - Fetch from OpenWeatherMap API
   - Return weather data

2. **Home Page Basic** (`app/page.tsx`)

   - Add a simple search form
   - Call your API route
   - Display the results

3. **Improve Components**

   - Make SearchBar more interactive
   - Create better WeatherCard layout
   - Add Header/Footer to layout

4. **Add Forecast Feature**
   - Implement forecast API route
   - Create forecast display component
   - Show 5-day forecast

## 🔧 Useful Commands

```bash
# Start development server
npm run dev

# Check for TypeScript errors
npx tsc --noEmit

# Format code
npx prettier --write .
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [React Hooks Guide](https://react.dev/reference/react)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## ✅ Current Status

✅ Folder structure created
✅ Type definitions set up
✅ Component placeholders created
✅ API route placeholders created
✅ Utility functions ready

🔨 **Ready for you to code!** Start with `src/app/api/weather/route.ts`

---

Happy Coding! 🚀

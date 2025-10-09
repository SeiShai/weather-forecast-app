'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#320a3a] via-[#520181] to-[#27012d]">
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-pink-400/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-300/30 rounded-full blur-3xl animate-float"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        
        {/* Hero Section */}
        <div className={`text-center space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Weather Icon Animation */}
          <div className="relative inline-block">
            <div className="text-9xl animate-bounce-slow drop-shadow-2xl">
              ☀️
            </div>
            <div className="absolute -top-4 -right-4 text-6xl animate-spin-slow">✨</div>
            <div className="absolute -bottom-2 -left-2 text-5xl animate-pulse">🌤️</div>
          </div>

          {/* Title with Gradient */}
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">
            Whether<span> </span><span className=" bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent animate-gradient">
              Weather
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-lg px-4">
            A side project for real-time weather updates using OpenWeatherMap API.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/pages/home"
              className="group relative px-8 py-4 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-2xl text-white font-bold text-lg shadow-2xl hover:scale-105 hover:bg-white/30 transition-all duration-300 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className={`mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Feature 1 */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-white mb-2">Global Coverage</h3>
            <p className="text-white/80">
              Search weather for any city worldwide with accurate real-time data
            </p>
          </div>

          {/* Feature 2 */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Detailed Insights</h3>
            <p className="text-white/80">
              Temperature, humidity, wind speed, and more comprehensive metrics
            </p>
          </div>

          {/* Feature 3 */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-white/80">
              Instant weather updates with modern, responsive interface
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-white/60 text-sm">
          Powered by OpenWeatherMap API
        </div>
      </div>
    </div>
  )
}
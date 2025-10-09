'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/pages/home', label: '🏠 Dashboard', icon: '📊' },
  ]

  return (
    <aside className="w-64 min-h-screen backdrop-blur-xl bg-white/10 border-r border-white/20 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-4xl group-hover:scale-110 transition-transform">☀️</span>
          <div>
            <h1 className="text-xl font-bold text-white">Weather</h1>
            <p className="text-xs text-white/70">Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-white/20 text-white shadow-lg scale-105'
                  : 'text-white/70 hover:bg-white/10 hover:text-white hover:scale-105'
              }`}
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="font-semibold text-sm">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/20">
        <p className="text-white/60 text-xs text-center">
          Powered by OpenWeatherMap
        </p>
      </div>
    </aside>
  )
}
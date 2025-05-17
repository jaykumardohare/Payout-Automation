import React from 'react'
import { NavLink } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/mentors', label: 'Mentors' },
  { to: '/sessions', label: 'Sessions' },
]

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <div className="flex space-x-8">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 select-none">
            Payout Automation
          </h1>
          <div className="hidden sm:flex space-x-4">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300 transition'
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </nav>
  )
}

import React from 'react'

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3 rounded-md border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />
  )
}

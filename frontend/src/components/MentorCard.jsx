import React from 'react'

export default function MentorCard({ mentor }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{mentor.email}</p>
      <p className="mt-2 font-medium text-indigo-600 dark:text-indigo-400">₹{mentor.ratePerHour} / hour</p>
    </div>
  )
}

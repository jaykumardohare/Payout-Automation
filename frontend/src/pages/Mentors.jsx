import React, { useEffect, useState } from 'react'
import { fetchMentors } from '../services/api'
import MentorCard from '../components/MentorCard'

export default function Mentors() {
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortOption, setSortOption] = useState('')

  useEffect(() => {
    fetchMentors()
      .then(data => setMentors(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filteredMentors = mentors
    .filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'rate-asc') return a.ratePerHour - b.ratePerHour
      if (sortOption === 'rate-desc') return b.ratePerHour - a.ratePerHour
      return 0
    })

  return (
    <div className="space-y-6 px-4 md:px-8 py-6">
      <h2 className="text-3xl font-bold text-center mb-4">Mentors</h2>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder="Search mentors by name or email"
          className="w-full p-3 rounded-lg border dark:border-gray-700 shadow-sm 
             focus:ring-2 focus:ring-indigo-500 
             text-gray-900 dark:text-white 
             bg-white dark:bg-gray-800 
             placeholder-gray-500 dark:placeholder-gray-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="p-3 rounded-lg border dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500 
             text-gray-900 dark:text-white 
             bg-white dark:bg-gray-800 
             placeholder-gray-500 dark:placeholder-gray-400"
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
          <option value="">Sort by Rate</option>
          <option value="rate-asc">Rate: Low to High</option>
          <option value="rate-desc">Rate: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading mentors...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredMentors.map(mentor => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
      )}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { fetchSessions } from '../services/api'
import SessionCard from '../components/SessionCard'

export default function Sessions() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortOption, setSortOption] = useState('')

  useEffect(() => {
    fetchSessions()
      .then(data => setSessions(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filteredSessions = sessions
    .filter(s =>
      s.sessionType.toLowerCase().includes(search.toLowerCase()) ||
      (s.mentor?.name?.toLowerCase() || '').includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'payout-asc') return a.payout - b.payout
      if (sortOption === 'payout-desc') return b.payout - a.payout
      if (sortOption === 'date-newest') return new Date(b.date) - new Date(a.date)
      if (sortOption === 'date-oldest') return new Date(a.date) - new Date(b.date)
      return 0
    })

  return (
    <div className="space-y-6 px-4 md:px-8 py-6">
      <h2 className="text-3xl font-bold text-center mb-4">Sessions</h2>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder="Search by type or mentor name"
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
          <option value="">Sort</option>
          <option value="payout-asc">Payout: Low to High</option>
          <option value="payout-desc">Payout: High to Low</option>
          <option value="date-newest">Date: Newest</option>
          <option value="date-oldest">Date: Oldest</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading sessions...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredSessions.map(session => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  )
}

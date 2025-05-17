import React, { useEffect, useState } from 'react'
import { fetchSessions } from '../services/api'
import SessionCard from '../components/SessionCard'

export default function Sessions() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSessions()
      .then(data => setSessions(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading sessions...</p>

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">Sessions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2
                    md:grid-cols-3 gap-6">
            {sessions.map(session => (
            <SessionCard key={session._id} session={session} />
            ))}
        </div>
    </div>
    )
}

import React, { useEffect, useState } from 'react'
import { fetchMentors } from '../services/api'
import MentorCard from '../components/MentorCard'

export default function Mentors() {
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMentors()
      .then(data => setMentors(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading mentors...</p>

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">Mentors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mentors.map(mentor => (
          <MentorCard key={mentor._id} mentor={mentor} />
        ))}
      </div>
    </div>
  )
}

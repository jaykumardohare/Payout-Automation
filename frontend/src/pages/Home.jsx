import React, { useEffect, useState } from "react";
import { fetchMentors, fetchSessions } from "../services/api";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

export default function Home() {
  const [mentorsCount, setMentorsCount] = useState(0);
  const [sessionsCount, setSessionsCount] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadStats() {
      try {
        const mentors = await fetchMentors();
        const sessions = await fetchSessions();
        setMentorsCount(mentors.length);
        setSessionsCount(sessions.length);
        const payoutSum = sessions.reduce((sum, s) => sum + s.payout, 0);
        setTotalPayout(payoutSum);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 text-xl text-gray-500 dark:text-gray-300">
        Loading stats...
      </div>
    );

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 dark:text-indigo-400">
          Welcome to MentorPayout Hub 💼
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Manage your mentors, automate session payouts, and keep everything organized — all in one place.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/mentors")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full transition"
          >
            View Mentors
          </button>
          <button
            onClick={() => navigate("/sessions")}
            className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-full transition"
          >
            View Sessions
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Mentors" value={mentorsCount} />
        <StatCard title="Sessions Logged" value={sessionsCount} />
        <StatCard title="Total Payout (₹)" value={totalPayout.toFixed(2)} />
      </section>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-4 text-3xl font-bold">
        <CountUp end={value} duration={2} separator="," />
      </p>
    </div>
  );
}


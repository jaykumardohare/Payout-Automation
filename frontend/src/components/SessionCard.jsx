import React from 'react'

export default function SessionCard({ session }) {
  const mentorName = session.mentor?.name || 'Unknown Mentor';
  const mentorEmail = session.mentor?.email || 'N/A';

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <h4 className="font-semibold mb-1 text-lg text-indigo-600 dark:text-indigo-400">
        {mentorName}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Email: {mentorEmail}</p>

      <div className="text-sm text-gray-700 dark:text-gray-300">
        <p>Type: {session.sessionType}</p>
        <p>Duration: {session.duration} mins</p>
        <p className="font-medium text-indigo-600 dark:text-indigo-400 mt-1">
          Payout: ₹{session.payout?.toFixed(2)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Date: {new Date(session.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

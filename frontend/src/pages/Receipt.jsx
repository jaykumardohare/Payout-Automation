import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getReceiptByMentor } from '../services/api';
import { useReactToPrint } from 'react-to-print';

export default function Receipt() {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    getReceiptByMentor(id).then(setReceipt).catch(console.error);
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Mentor Receipt',
  });

  if (!receipt) return <p>Loading receipt...</p>;

  const { mentor, sessions, summary } = receipt;

  return (
    <div className="p-6 space-y-6">
      <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded shadow">
        Download as PDF
      </button>

      <div ref={componentRef} className="bg-white dark:bg-gray-800 p-6 rounded shadow text-gray-800 dark:text-gray-100">
        <h2 className="text-2xl font-bold mb-4">Receipt for {mentor.name}</h2>
        <p>Email: {mentor.email}</p>
        <p>Rate/hour: ₹{mentor.ratePerHour}</p>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Sessions:</h3>
          <ul className="space-y-1">
            {sessions.map(s => (
              <li key={s._id} className="border-b py-2 text-sm">
                {s.date.slice(0,10)} – {s.sessionType} – {s.duration} mins – ₹{s.payout}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p>Subtotal: ₹{summary.subtotal}</p>
          <p>GST (18%): ₹{summary.gst}</p>
          <p className="font-bold">Final Payout: ₹{summary.finalAmount}</p>
        </div>
      </div>
    </div>
  );
}

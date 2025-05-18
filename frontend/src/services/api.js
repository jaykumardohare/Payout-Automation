import axios from "axios";

const BASE_URL = "https://payout-automation.onrender.com";

export async function fetchMentors() {
  const res = await axios.get(`${BASE_URL}/mentors`);
  return res.data;
}

export async function fetchSessions() {
  const res = await axios.get(`${BASE_URL}/sessions`);
  return res.data;
}

export const getReceiptByMentor = async (mentorId) => {
  const res = await fetch(`/api/receipts/${mentorId}`);
  if (!res.ok) throw new Error('Failed to fetch receipt');
  return res.json();
};


import axios from "axios";

const BASE_URL = "https://payout-automation-backend.onrender.com";

export async function fetchMentors() {
  const res = await axios.get(`${BASE_URL}/api/mentors`);
  return res.data;
}

export async function fetchSessions() {
  const res = await axios.get(`${BASE_URL}/api/sessions`);
  return res.data;
}

export const getReceiptByMentor = async (mentorId) => {
  const res = await axios.get(`${BASE_URL}/api/receipts/${mentorId}`);
  return res.data;
};

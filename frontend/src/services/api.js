import axios from "axios";

// In src/services/api.js
const BASE_URL = "https://payout-automation-backend.onrender.com/api";
// const BASE_URL = "http://localhost:5000/api"; // For local development 


export async function fetchMentors() {
try {
    const res = await axios.get(`${BASE_URL}/mentors`);
    return res.data;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw error;
  } 
};

export async function fetchSessions() {
  try {
    const res = await axios.get(`${BASE_URL}/sessions`);
    return res.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
}

export const getReceiptByMentor = async (mentorId) => {
  try {
    const res = await axios.get(`${BASE_URL}/receipts/${mentorId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching receipt:", error);
    throw error;
  } 
};

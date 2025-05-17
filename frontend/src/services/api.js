import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export async function fetchMentors() {
  const res = await axios.get(`${BASE_URL}/mentors`);
  return res.data;
}

export async function fetchSessions() {
  const res = await axios.get(`${BASE_URL}/sessions`);
  return res.data;
}


import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const fetchGrid = async () =>
  (await axios.get(`${BASE_URL}/api/grid`)).data;
export const fetchHistory = async () =>
  (await axios.get(`${BASE_URL}/api/history`)).data;

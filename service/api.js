import axios from "axios";

export const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;
export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
export default API;

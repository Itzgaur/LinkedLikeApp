import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true, // To include cookies in requests
});

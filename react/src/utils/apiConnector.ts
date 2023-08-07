import axios from "axios";

const apiConnector = axios.create({
  baseURL: "http://localhost:3321",
  timeout: 1000,
});

export default apiConnector;

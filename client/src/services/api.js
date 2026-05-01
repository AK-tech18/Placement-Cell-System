import axios from "axios";

const API = axios.create({
  baseURL: "https://placement-cell-system-3.onrender.com/api"
});

export default API;
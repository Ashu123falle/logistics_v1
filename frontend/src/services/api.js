import axios from "axios";

const API = axios.create({
  baseURL: "https://logistics-v1.onrender.com/api", 
  // baseURL: "http://localhost:8080/api", 
});


export default API;

import axios from "axios";

export default axios.create({
//   baseURL: "http://localhost:8081/api",
  baseURL: "http://18.141.164.56:8081/api",
  headers: {
    "Content-type": "application/json"
  }
});
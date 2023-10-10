import axios from "axios";

const request = axios.create({
  baseURL: "https://6525b03967cfb1e59ce79c72.mockapi.io/",
  timeout: 10000,
});

export default request;

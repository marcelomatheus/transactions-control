import axios from "axios";
const transactionsServer = axios.create({
  baseURL: "http://localhost:3000",
});

export default transactionsServer;

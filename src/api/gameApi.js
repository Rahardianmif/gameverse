import axios from "axios";

const gameApi = axios.create({
  baseURL: "https://www.freetogame.com/api",
  timeout: 15000,
});

export default gameApi;

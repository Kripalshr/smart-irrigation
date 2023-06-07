import axios from "axios";

const token = JSON.parse(window.localStorage.getItem("accessToken"));

const axiosInstance = axios.create({
  baseURL: "http://localhost:3333/api",
  headers: {
    Authorization: `${token ?? ""}`,
  },
});

export default axiosInstance;

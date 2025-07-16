import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:2200",
    withCredentials: true,
});

export default api;

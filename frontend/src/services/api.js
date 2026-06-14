import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("TOKEN:", token);
        console.log("AUTH HEADER:", config.headers.Authorization);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

export default api;
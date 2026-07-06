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
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.log(error.response);

        if  (error.response?.status === 401) {
            localStorage.removeItem("access_token");
            window.location.reload();
        }

        return Promise.reject(error);
    }
);


export default api;
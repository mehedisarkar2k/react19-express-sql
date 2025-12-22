import axios from "axios";

const BASE_URL = "http://localhost:8080";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        throw error;
    }
)

export default apiClient

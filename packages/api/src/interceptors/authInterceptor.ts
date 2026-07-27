import { apiClient } from "../client/apiClient";

apiClient.interceptors.request.use((config) => {

    const token = localStorage.getItem("accessToken");

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});
import { apiClient } from "../client/apiClient";

apiClient.interceptors.response.use(

    response => response,

    error => {

        if (error.response?.status === 401) {

            console.log("Refresh Token");

        }

        return Promise.reject(error);

    }

);
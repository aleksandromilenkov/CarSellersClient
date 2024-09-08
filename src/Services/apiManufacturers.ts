import { UserProfileToken } from "../Models/User";
import { Register, useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
const api = "https://localhost:7209/api/";
const apiClient = axios.create({
  baseURL: api,
});
// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("tokenCarSellers");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getManufacturers = async () => {
    try {
      const response = await apiClient.get('manufacturer');
      return response?.data;
    } catch (error: any) {
      // Handle error appropriately
      console.log(error);
      throw new Error(error.response?.data.message || error.message);
    }
  };
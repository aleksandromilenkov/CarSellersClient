import { UserProfileToken } from "../Models/User";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { CreateCarInputs } from "../Utils/Helpers/Types";

const api = "https://localhost:7209/api/";
// Create an Axios instance
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

export const getFavoritesCars = async () => {
  try {
    const response = await apiClient.get("favoriteCars");
    return response?.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

export const createFavoriteCar = async (carId: number) => {
  try {
    const response = await apiClient.post(`favoriteCars?carId=${carId}`);
    return response?.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

export const createCarAPI = async (carInputs:CreateCarInputs) => {
  try {
    const response = await apiClient.post(`car`, carInputs);
    return response?.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};
export const editCarAPI = async (carInputs:CreateCarInputs, carId:number|string|undefined) => {
  console.log(carInputs);
  console.log(carId);
  try {
    const response = await apiClient.put(`car/${carId}`, carInputs);
    return response?.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};


export const deleteCarAPI = async (carId:number) => {
  try {
    const response = await apiClient.delete(`car/${carId}`);
    return response?.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

export const getCars = async (params: {}) => {
  try {
    const response = await axios.get(api + "Car", { params: params });
    return response?.data;
  } catch (error: any) {
    // Handle error appropriately
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

export const getCar = async (carId:string|undefined) => {
  try {
    console.log("HERE")
    const response = await axios.get(api + `Car/${carId}`);
    return response?.data;
  } catch (error: any) {
    // Handle error appropriately
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};
export const getCarModels = async () => {
  try {
    const response = await axios.get(api + `CarModel`);
    return response?.data;
  } catch (error: any) {
    // Handle error appropriately
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};
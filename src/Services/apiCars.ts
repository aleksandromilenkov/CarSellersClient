import { UserProfileToken } from "../Models/User";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
const api = "https://localhost:7209/api/";
const token = localStorage.getItem("tokenCarSellers");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

interface LoginResponse {
  // Define the structure of your login response here
}

export const getFavoritesCars = async () => {
  try {
    const response = await axios.get(api + "favoriteCars");
    return response?.data;
  } catch (error: any) {
    // Handle error appropriately
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};
import { UserProfileToken } from "../Models/User";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
const api = "https://localhost:7209/api/";
interface LoginCredentials {
  userName: string;
  password: string;
}

interface LoginResponse {
  token: string;
  userName: string;
  email: string;
}
export async function getCurrentUser() {
  const user = localStorage.getItem("userCarSellers");
  return user;
}

export async function logout() {
  localStorage.removeItem("tokenCarSellers");
  localStorage.removeItem("userCarSellers");
}

export async function loginAPI({
  userName,
  password,
}: LoginCredentials): Promise<LoginResponse> {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      api + "account/login",
      {
        userName,
        password,
      }
    );
    return response.data;
  } catch (error: any) {
    // Handle error appropriately
    throw new Error(error.response?.data.message || error.message);
  }
}
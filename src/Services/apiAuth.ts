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
interface LoginCredentials {
  userName: string;
  password: string;
}

interface RegisterCredentials {
  userName: string;
  email:string;
  password: string;
}

interface LoginResponse {
  token: string;
  userName: string;
  email: string;
}

interface RegisterResponse {
  token: string;
  userName: string;
  email: string;
}

interface UpdateUserInfo {
  username: string | null;
  email: string|null;
  currentPassword: string|null;
  newPassword:string|null
}
interface UpdateUserResponse{
  username: string;
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

export async function registerAPI({userName, email, password}: RegisterCredentials) : Promise<RegisterResponse> {
  try{
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      api + "account/register",
      {
        userName,
        email,
        password,
      }
    );
    return response.data;
  }catch(error:any){
      // Handle error appropriately
      throw new Error(error.response?.data.message || error.message);
  }
}

export async function updateUserAPI({username,email, currentPassword, newPassword}: UpdateUserInfo) : Promise<UpdateUserResponse> {
  try{
    const response = await apiClient.patch('account/update', {username, email, currentPassword, newPassword});

    console.log('User updated successfully:', response.data);
    return response?.data;
  }catch(error:any){
      // Handle error appropriately
      throw new Error(error.response?.data.message || error.message);
  }
}
import axios, { AxiosError, AxiosResponse } from "axios";
const api = "https://localhost:7209/api/";
const token = localStorage.getItem("tokenCarSellers");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const getCompanies = async () => {
  try {
    const response = await axios.get(api + "CarSellerCompany");
    return response?.data;
  } catch (error: any) {
    // Handle error appropriately
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

import axios, { AxiosError, AxiosResponse } from "axios";
import { CreateCompanyInputs } from "../Utils/Helpers/Types";
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

export const getCompanyCars = async (companyId:string | undefined) => {
  try {
    const response = await axios.get(api + `CarSellerCompany/${companyId}`);
    return response?.data?.cars;
  } catch (error: any) {
    // Handle error appropriately
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

export const getCompany = async (companyId:string | undefined) => {
  try {
    const response = await axios.get(api + `CarSellerCompany/${companyId}`);
    return response?.data;
  } catch (error: any) {
    // Handle error appropriately
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};

export const createCompanyAPI = async (createCompanyInputs:CreateCompanyInputs) => {
  try {
    const response = await axios.post(api + `CarSellerCompany`, createCompanyInputs);
    return response?.data;
  } catch (error: any) {
    // Handle error appropriately
    console.log(error);
    throw new Error(error.response?.data.message || error.message);
  }
};


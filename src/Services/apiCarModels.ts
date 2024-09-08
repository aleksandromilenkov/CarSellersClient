import { UserProfileToken } from "../Models/User";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { CreateCarInputs, CreateCarModelInputs } from "../Utils/Helpers/Types";
export const createCarModelAPI = async (createCarModelData: CreateCarModelInputs) => {
    try {
      const response = await axios.post(`https://localhost:7209/api/carModel`,createCarModelData);
      return response?.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response?.data.message || error.message);
    }
  };
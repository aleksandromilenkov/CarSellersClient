import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { loginAPI } from "../../Services/apiAuth";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../../store";
import { loginUser } from "./userSlice";
function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (user) => {
      console.log(user);
      if (user) {
        localStorage.setItem("tokenCarSellers", user?.token);
        const userObj = {
          token: user?.token, 
          username: user?.userName,
          email: user?.email,
        };
        dispatch(loginUser(userObj))
        toast.success("Login successfully.");
      }
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
export default useLogin;

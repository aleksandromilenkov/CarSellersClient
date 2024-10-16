import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { loginAPI, registerAPI } from "../../Services/apiAuth";
function useRegister() {
  const navigate = useNavigate();

  const { mutate: registerUser, isPending: isLoading } = useMutation({
    mutationFn: registerAPI,
    onSuccess: (user) => {
      console.log(user);
      if (user) {
        toast.success("Registered successfully.");
      }
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(err.toString());
    },
  });

  return { registerUser, isLoading };
}
export default useRegister;

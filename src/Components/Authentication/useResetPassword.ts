import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { loginAPI, resetPasswordAPI } from "../../Services/apiAuth";
function useResetPassword() {
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: resetPasswordAPI,
    onSuccess: () => {
        toast.success("Password reseted successfully.");
    //   navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(err.toString());
    },
  });

  return { resetPassword, isLoading };
}
export default useResetPassword;

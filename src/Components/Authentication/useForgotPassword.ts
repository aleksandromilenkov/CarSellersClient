import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { loginAPI, forgotPasswordAPI } from "../../Services/apiAuth";
function useForgotPassword() {
  const navigate = useNavigate();

  const { mutate: sendForgotPasswordRequest, isPending: isLoading } = useMutation({
    mutationFn: forgotPasswordAPI,
    onSuccess: () => {
        toast.success("Request send successfully.");
    //   navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(err.toString());
    },
  });

  return { sendForgotPasswordRequest, isLoading };
}
export default useForgotPassword;

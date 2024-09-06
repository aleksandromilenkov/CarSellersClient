import { useMutation } from "@tanstack/react-query";
import { updateUserAPI } from "../../Services/apiAuth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../Authentication/userSlice";

function useUpdateProfile() {
    const dispatch = useDispatch();
  const { mutate: updateUser, isPending:isLoading } = useMutation({
    mutationFn: updateUserAPI,
    onSuccess: (data) => {
      toast.success("User updated successfully.");
      // Handle success state or dispatch actions
      dispatch(updateCurrentUser({
        username: data.username,
        email: data.email,
      }));
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  return { updateUser, isLoading };
}

export default useUpdateProfile;

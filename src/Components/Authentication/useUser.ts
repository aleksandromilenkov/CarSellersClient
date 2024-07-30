import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../Services/apiAuth";

const useUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user !== null };
};

export default useUser;

import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";
import { getToken } from "../lib/axios";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    // ADDED: Only run query if token exists
    enabled: !!getToken(),
  });

  return { 
    isLoading: authUser.isLoading, 
    authUser: authUser.data?.user 
  };
};

export default useAuthUser;

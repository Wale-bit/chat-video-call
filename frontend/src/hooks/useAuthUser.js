import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";
import { getToken } from "../lib/axios";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    // Always enable query, handle no-token inside getAuthUser
    enabled: true,
  });

  return { 
    isLoading: authUser.isLoading, 
    authUser: authUser.data?.user || null 
  };
};

export default useAuthUser;

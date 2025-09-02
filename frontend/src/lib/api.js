export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  
  // ADDED: Store token after successful login
  if (response.data.token) {
    setToken(response.data.token);
  }
  
  return response.data;
};

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  
  // ADDED: Store token after successful signup
  if (response.data.token) {
    setToken(response.data.token);
  }
  
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  
  // ADDED: Remove token after logout
  removeToken();
  
  return response.data;
};

export const getAuthUser = async () => {
  try {
    // Check if token exists first
    const token = getToken();
    if (!token) {
      return null;
    }
    
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    
    // If unauthorized, remove invalid token
    if (error.response?.status === 401) {
      removeToken();
    }
    
    return null;
  }
};

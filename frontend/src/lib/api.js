import { axiosInstance } from "./axios";

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

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}
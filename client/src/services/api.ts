export const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/api`;

export interface User{
    id: Number,
    fullname: String,
    email: String,
    role: "user" | "admin", 
    createdAt?: String,
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface RegisterData {
  fullname: string;
  email: string;
  password: string;
  role?: "user" | "admin"; 
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UsersResponse {
  success: boolean;
  users?: User[];
  message?: string;
}





export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();
  console.log("Login response:", responseData); // debug
  return responseData;
};

export const getUsers = async (token: string): Promise<UsersResponse> => {
  const res = await fetch(`${API_URL}/users`, { // Assuming the endpoint is /api/users
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return res.json();
};


export const getStats = async (token: string) => {
  try {
    const res = await fetch(`${API_URL}/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  } catch (err: any) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

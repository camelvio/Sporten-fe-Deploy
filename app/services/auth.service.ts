import { fetchAPI } from "../lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  access_token?: string;
  data?: {
    token?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export const login = async (credentials: LoginPayload): Promise<AuthResponse> => {
  try {
    return await fetchAPI<AuthResponse>("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  } catch (err) {
    // Fallback if backend API uses /auth/signin
    try {
      return await fetchAPI<AuthResponse>("/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
    } catch {
      throw err;
    }
  }
};

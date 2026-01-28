import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      // Optionally redirect to login
      window.location.href = "/#/login";
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authApi = {
  register: async (data: {
    email: string;
    password: string;
    name?: string;
    role?: "player" | "master";
  }) => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  me: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};

// Characters API
export const charactersApi = {
  list: async () => {
    const response = await apiClient.get("/characters");
    return response.data;
  },

  create: async (data: { name: string; data: any }) => {
    const response = await apiClient.post("/characters", data);
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get(`/characters/${id}`);
    return response.data;
  },

  update: async (id: string, data: { name?: string; data?: any }) => {
    const response = await apiClient.put(`/characters/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/characters/${id}`);
    return response.data;
  },
};

// Rooms API
export const roomsApi = {
  listActive: async () => {
    const response = await apiClient.get("/rooms/active");
    return response.data;
  },

  list: async () => {
    const response = await apiClient.get("/rooms");
    return response.data;
  },

  create: async (data: {
    name: string;
    maxPlayers: number;
    password: string;
  }) => {
    const response = await apiClient.post("/rooms", data);
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get(`/rooms/${id}`);
    return response.data;
  },

  update: async (
    id: string,
    data: {
      name?: string;
      maxPlayers?: number;
      password?: string;
      isActive?: boolean;
    },
  ) => {
    const response = await apiClient.put(`/rooms/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/rooms/${id}`);
    return response.data;
  },

  verifyPassword: async (id: string, password: string) => {
    const response = await apiClient.post(`/rooms/${id}/verify`, {
      password,
    });
    return response.data;
  },

  join: async (id: string, password: string) => {
    const response = await apiClient.post(`/rooms/${id}/join`, {
      password,
    });
    return response.data;
  },
};

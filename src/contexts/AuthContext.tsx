import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authApi } from "@/api/client";
import type { UserEntity } from "@/types/api";

interface AuthContextType {
  user: UserEntity | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name?: string,
    role?: "player" | "master",
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");
      const savedUser = localStorage.getItem("auth_user");

      if (token && savedUser) {
        try {
          // Verify token is still valid
          const response = await authApi.me();
          setUser(response.data.user);
        } catch {
          // Token is invalid, clear storage
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });

    if (response.success) {
      const { user, token } = response.data;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
      setUser(user);
    } else {
      throw new Error(response.error || "Login failed");
    }
  };

  const register = async (
    email: string,
    password: string,
    name?: string,
    role?: "player" | "master",
  ) => {
    const response = await authApi.register({ email, password, name, role });

    if (response.success) {
      const { user, token } = response.data;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
      setUser(user);
    } else {
      throw new Error(response.error || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore logout errors
    }

    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setUser(null);
    
    // Clear character creation store on logout
    // Import dynamically to avoid circular dependencies
    import("@/store/characterStore").then(({ useCharacterStore }) => {
      useCharacterStore.getState().resetCharacter();
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

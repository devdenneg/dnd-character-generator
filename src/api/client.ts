import axios from "axios";
import type {
  CharacterData,
  CharacterResponse,
  CharactersListResponse,
  AuthResponse,
} from "@/types/api";
import type { StartingEquipment } from "@/types/equipment";
import type { SpellcastingConfig } from "@/types/spellcasting";

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
    const response = await apiClient.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  telegramAuth: async (initData: string) => {
    const response = await apiClient.post("/auth/telegram-auth", { initData });
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
    const response = await apiClient.get<CharactersListResponse>("/characters");
    return response.data;
  },

  create: async (data: { name: string; data: CharacterData }) => {
    const response = await apiClient.post<CharacterResponse>("/characters", data);
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<CharacterResponse>(`/characters/${id}`);
    return response.data;
  },

  update: async (id: string, data: { name?: string; data?: CharacterData }) => {
    const response = await apiClient.put<CharacterResponse>(`/characters/${id}`, data);
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

  join: async (id: string, password: string, characterId: string) => {
    const response = await apiClient.post(`/rooms/${id}/join`, {
      password,
      characterId,
    });
    return response.data;
  },

  getPlayers: async (id: string) => {
    const response = await apiClient.get(`/rooms/${id}/players`);
    return response.data;
  },

  startGame: async (id: string) => {
    const response = await apiClient.post(`/rooms/${id}/start`);
    return response.data;
  },
};

// Races API
export const racesApi = {
  list: async (source?: string) => {
    const params = source ? { source } : {};
    const response = await apiClient.get("/races", { params });
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get(`/races/${id}`);
    return response.data;
  },

  getByExternalId: async (externalId: string) => {
    const response = await apiClient.get(`/races/external/${externalId}`);
    return response.data;
  },

  create: async (data: {
    externalId: string;
    name: string;
    nameRu: string;
    description: string;
    speed: number;
    size: "Small" | "Medium" | "Large";
    source: string;
    traits: Array<{
      name: string;
      nameRu: string;
      description: string;
    }>;
  }) => {
    const response = await apiClient.post("/races", data);
    return response.data;
  },

  update: async (
    id: string,
    data: {
      externalId?: string;
      name?: string;
      nameRu?: string;
      description?: string;
      speed?: number;
      size?: "Small" | "Medium" | "Large";
      source?: string;
      traits?: Array<{
        name: string;
        nameRu: string;
        description: string;
      }>;
    },
  ) => {
    const response = await apiClient.put(`/races/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/races/${id}`);
    return response.data;
  },
};

// Classes API
export const classesApi = {
  list: async (source?: string) => {
    const params = source ? { source } : {};
    const response = await apiClient.get("/classes", { params });
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get(`/classes/${id}`);
    return response.data;
  },

  getByExternalId: async (externalId: string) => {
    const response = await apiClient.get(`/classes/external/${externalId}`);
    return response.data;
  },

  create: async (data: {
    externalId: string;
    name: string;
    nameRu: string;
    description: string;
    hitDie: number;
    primaryAbility: string[];
    savingThrows: string[];
    armorProficiencies: string[];
    weaponProficiencies: string[];
    skillChoices: string[];
    skillCount: number;
    subclassLevel: number;
    source: string;
    features: Array<{
      name: string;
      nameRu: string;
      description: string;
      level: number;
    }>;
    subclasses: Array<{
      externalId: string;
      name: string;
      nameRu: string;
      description: string;
      source?: string;
      features: Array<{
        name: string;
        nameRu: string;
        description: string;
        level: number;
      }>;
    }>;
    startingEquipment?: StartingEquipment;
    spellcasting?: SpellcastingConfig;
  }) => {
    const response = await apiClient.post("/classes", data);
    return response.data;
  },

  update: async (
    id: string,
    data: {
      externalId?: string;
      name?: string;
      nameRu?: string;
      description?: string;
      hitDie?: number;
      primaryAbility?: string[];
      savingThrows?: string[];
      armorProficiencies?: string[];
      weaponProficiencies?: string[];
      skillChoices?: string[];
      skillCount?: number;
      subclassLevel?: number;
      source?: string;
      features?: Array<{
        name: string;
        nameRu: string;
        description: string;
        level: number;
      }>;
      subclasses?: Array<{
        externalId: string;
        name: string;
        nameRu: string;
        description: string;
        source?: string;
        features: Array<{
          name: string;
          nameRu: string;
          description: string;
          level: number;
        }>;
      }>;
      startingEquipment?: StartingEquipment;
      spellcasting?: SpellcastingConfig;
    },
  ) => {
    const response = await apiClient.put(`/classes/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/classes/${id}`);
    return response.data;
  },
};

// Backgrounds API
export const backgroundsApi = {
  list: async (source?: string) => {
    const params = source ? { source } : {};
    const response = await apiClient.get("/backgrounds", { params });
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get(`/backgrounds/${id}`);
    return response.data;
  },

  getByExternalId: async (externalId: string) => {
    const response = await apiClient.get(`/backgrounds/external/${externalId}`);
    return response.data;
  },

  create: async (data: {
    externalId: string;
    name: string;
    nameRu: string;
    description: string;
    skillProficiencies: string[];
    toolProficiencies: string[];
    languages: number;
    equipment: string[];
    startingGold: number;
    originFeat: string;
    abilityScoreIncrease: {
      options: string[];
      amount: number[];
    };
    source: string;
  }) => {
    const response = await apiClient.post("/backgrounds", data);
    return response.data;
  },

  update: async (
    id: string,
    data: {
      externalId?: string;
      name?: string;
      nameRu?: string;
      description?: string;
      skillProficiencies?: string[];
      toolProficiencies?: string[];
      languages?: number;
      equipment?: string[];
      startingGold?: number;
      originFeat?: string;
      abilityScoreIncrease?: {
        options: string[];
        amount: number[];
      };
      source?: string;
    },
  ) => {
    const response = await apiClient.put(`/backgrounds/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/backgrounds/${id}`);
    return response.data;
  },
};

// Spells API
export const spellsApi = {
  list: async (source?: string) => {
    const params = source ? { source } : {};
    const response = await apiClient.get("/spells", { params });
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get(`/spells/${id}`);
    return response.data;
  },

  getByExternalId: async (externalId: string) => {
    const response = await apiClient.get(`/spells/external/${externalId}`);
    return response.data;
  },

  getByClass: async (classId: string, source?: string) => {
    const params = source ? { source } : {};
    const response = await apiClient.get(`/spells/class/${classId}`, { params });
    return response.data;
  },

  create: async (data: {
    externalId: string;
    name: string;
    nameRu: string;
    level: number;
    school: string;
    castingTime: string;
    range: string;
    components: string;
    duration: string;
    description: string;
    classes: string[];
    source?: string;
  }) => {
    const response = await apiClient.post("/spells", data);
    return response.data;
  },

  update: async (
    id: string,
    data: {
      externalId?: string;
      name?: string;
      nameRu?: string;
      level?: number;
      school?: string;
      castingTime?: string;
      range?: string;
      components?: string;
      duration?: string;
      description?: string;
      classes?: string[];
      source?: string;
    },
  ) => {
    const response = await apiClient.put(`/spells/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/spells/${id}`);
    return response.data;
  },
};

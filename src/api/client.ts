import type {
    ApiResponse,
    AuthResponse,
    CharacterData,
    CharacterResponse,
    CharactersListResponse,
    FeatFull,
    FeatMeta,
    GlossaryListResponse,
    GlossaryTermFull,
    RaceFull,
    RaceTrait
} from "@/types/api";

import type { DescriptionItem } from "@/types/character";
import type { StartingEquipment } from "@/types/equipment";
import type { SpellcastingConfig } from "@/types/spellcasting";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://dndgenerator.fun/api";

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
  // Remove Content-Type for FormData to let browser set it with boundary
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
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
  }
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
    const response = await apiClient.post<CharacterResponse>(
      "/characters",
      data
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<CharacterResponse>(
      `/characters/${id}`
    );
    return response.data;
  },

  update: async (id: string, data: { name?: string; data?: CharacterData }) => {
    const response = await apiClient.put<CharacterResponse>(
      `/characters/${id}`,
      data
    );
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
    }
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
  // Получить список рас (только мета, без описаний и traits)
  listMeta: async (source?: string) => {
    const params = source ? { source } : {};
    const response = await apiClient.get("/races/meta", { params });
    return response.data;
  },

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

  create: async (data: Omit<RaceFull, 'id' | 'createdAt' | 'updatedAt' | 'traits'> & { traits: Omit<RaceTrait, 'id' | 'createdAt'>[] }) => {
    const response = await apiClient.post<ApiResponse<RaceFull>>("/races", data);
    return response.data;
  },


  update: async (
    id: string,
    data: Partial<Omit<RaceFull, 'id' | 'createdAt' | 'updatedAt' | 'traits'> & { traits: Omit<RaceTrait, 'id' | 'createdAt'>[] }>
  ) => {
    const response = await apiClient.put<ApiResponse<RaceFull>>(`/races/${id}`, data);
    return response.data;
  },


  delete: async (id: string) => {
    const response = await apiClient.delete(`/races/${id}`);
    return response.data;
  },
};

// Classes API
export const classesApi = {
  // Получить список классов (только мета, без описаний, features и subclasses)
  listMeta: async (source?: string) => {
    const params = source ? { source } : {};
    const response = await apiClient.get("/classes/meta", { params });
    return response.data;
  },

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
    equipment?: Array<{ equipmentId: string; quantity: number }>;
    startingGold?: number;
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
      equipment?: Array<{ equipmentId: string; quantity: number }>;
      startingGold?: number;
      startingEquipment?: StartingEquipment;
      spellcasting?: SpellcastingConfig;
    }
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
  // Получить список предысторий (только мета, без описаний)
  listMeta: async (source?: string) => {
    const params = source ? { source } : {};
    const response = await apiClient.get("/backgrounds/meta", { params });
    return response.data;
  },

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
    equipment: Array<{ equipmentId: string; quantity: number }>;
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
      equipment?: Array<{ equipmentId: string; quantity: number }>;
      startingGold?: number;
      originFeat?: string;
      abilityScoreIncrease?: {
        options: string[];
        amount: number[];
      };
      source?: string;
    }
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
  // Получить список заклинаний (только мета, без описаний)
  listMeta: async (source?: string) => {
    const params = source ? { source } : {};
    const response = await apiClient.get("/spells/meta", { params });
    return response.data;
  },

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
    const response = await apiClient.get(`/spells/class/${classId}`, {
      params,
    });
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
    description: DescriptionItem[];
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
      description?: DescriptionItem[];
      classes?: string[];
      source?: string;
    }
  ) => {
    const response = await apiClient.put(`/spells/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/spells/${id}`);
    return response.data;
  },
};

// Equipment API
export const equipmentApi = {
  // Получить список снаряжения (только мета, без описаний)
  listMeta: async (source?: string) => {
    const params = source ? { source } : {};
    const response = await apiClient.get("/equipment/meta", { params });
    return response.data;
  },

  list: async (source?: string) => {
    const params = source ? { source } : {};
    const response = await apiClient.get("/equipment", { params });
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get(`/equipment/${id}`);
    return response.data;
  },

  getByExternalId: async (externalId: string) => {
    const response = await apiClient.get(`/equipment/external/${externalId}`);
    return response.data;
  },

  create: async (data: {
    externalId: string;
    name: string;
    nameRu: string;
    category: string;
    cost: {
      quantity: number;
      unit: string;
    };
    weight?: number;
    source: string;
    description: string[];
    damage?: {
      dice: string;
      type: string;
    };
    armorClass?: number;
    armorType?: string;
    maxDexBonus?: number;
    properties?: string[];
  }) => {
    const response = await apiClient.post("/equipment", data);
    return response.data;
  },

  update: async (
    id: string,
    data: {
      externalId?: string;
      name?: string;
      nameRu?: string;
      category?: string;
      cost?: {
        quantity: number;
        unit: string;
      };
      weight?: number;
      source?: string;
      description?: string[];
      damage?: {
        dice: string;
        type: string;
      };
      armorClass?: number;
      armorType?: string;
      maxDexBonus?: number;
      properties?: string[];
    }
  ) => {
    const response = await apiClient.put(`/equipment/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/equipment/${id}`);
    return response.data;
  },
};

// Glossary API
export const glossaryApi = {
  // Get categories list
  getCategories: async () => {
    const response = await apiClient.get<ApiResponse<string[]>>("/glossary/categories");
    return response.data;
  },

  // Get lightweight metadata list
  listMeta: async (params: { category?: string; search?: string }) => {
    const queryParams: Record<string, string> = {};
    if (params.category && params.category !== "all") {
      queryParams.category = params.category;
    }
    if (params.search) {
      queryParams.search = params.search;
    }

    const response = await apiClient.get<GlossaryListResponse>("/glossary/meta", {
      params: queryParams,
    });
    return response.data;
  },

  // Get full term data
  get: async (id: string) => {
    const response = await apiClient.get<ApiResponse<{ term: GlossaryTermFull }>>(`/glossary/${id}`);
    return response.data;
  },
};

// Feats API
export const featsApi = {
  // Получить список черт (только мета)
  listMeta: async (search?: string) => {
    const params = search ? { search } : {};
    const response = await apiClient.get<ApiResponse<FeatMeta[]>>("/feats/meta", {
      params,
    });
    return response.data;
  },

  list: async (search?: string) => {
    const params = search ? { search } : {};
    const response = await apiClient.get<ApiResponse<FeatMeta[]>>("/feats", {
      params,
    });
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<ApiResponse<FeatFull>>(`/feats/${id}`);
    return response.data;
  },

  getByExternalId: async (externalId: string) => {
    const response = await apiClient.get<ApiResponse<FeatFull>>(`/feats/external/${externalId}`);
    return response.data;
  },
};


// Search API
export const searchApi = {
  search: async (query: string) => {
    const response = await apiClient.get("/search", { params: { q: query } });
    return response.data;
  },

  random: async () => {
    const response = await apiClient.get("/search/random");
    return response.data;
  },
};

// Upload API
export const uploadApi = {
  list: async () => {
    const response = await apiClient.get<ApiResponse<{
      filename: string;
      url: string;
      size: number;
      date: string;
    }[]>>("/upload");
    return response.data;
  },

  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/upload", formData);
    return response.data;
  },

  delete: async (filename: string) => {
    const response = await apiClient.delete(`/upload/${filename}`);
    return response.data;
  },
};

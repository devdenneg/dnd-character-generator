// API Response Types for D&D Character Generator

import type { Character } from './character';

/**
 * Complete character data structure stored in database
 * Replaces all `data: any` usages
 */
export type CharacterData = Character;

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

/**
 * Character entity from database
 */
export interface CharacterEntity {
  id: string;
  name: string;
  data: CharacterData;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Single character response
 */
export interface CharacterResponse {
  success: boolean;
  data: {
    character: CharacterEntity;
  };
}

/**
 * Multiple characters response
 */
export interface CharactersListResponse {
  success: boolean;
  data: {
    characters: CharacterEntity[];
  };
}

/**
 * Room entity from database
 */
export interface RoomEntity {
  id: string;
  name: string;
  description: string | null;
  password: string | null;
  maxPlayers: number;
  isActive: boolean;
  masterId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Room with players
 */
export interface RoomWithPlayers extends RoomEntity {
  players: RoomPlayer[];
  _count?: {
    players: number;
  };
}

/**
 * Room player entity
 */
export interface RoomPlayer {
  id: string;
  roomId: string;
  userId: string;
  characterId: string;
  isOnline: boolean;
  joinedAt: string;
  character: CharacterEntity;
  user: {
    id: string;
    username: string;
    role: 'player' | 'master';
  };
}

/**
 * Achievement entity
 */
export interface AchievementEntity {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  masterId: string;
  roomId: string | null;
  createdAt: string;
  icon?: string;
}

/**
 * Player achievement (granted achievement)
 */
export interface PlayerAchievementEntity {
  id: string;
  achievementId: string;
  characterId: string;
  grantedAt: string;
  achievement: AchievementEntity;
  character: CharacterEntity;
}

/**
 * Achievement notification data for Socket.IO
 */
export interface AchievementNotification {
  achievement: AchievementEntity;
  character: {
    id: string;
    name: string;
    data: CharacterData;
  };
}

/**
 * User entity
 */
export interface UserEntity {
  id: string;
  username: string;
  email?: string;
  name?: string | null;
  role: 'player' | 'master';
  createdAt: string;
}

/**
 * Auth response
 */
export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: UserEntity;
  };
  error?: string;
}

/**
 * Error response from API
 */
export interface ApiError {
  error: string;
  message?: string;
}

/**
 * Glossary term metadata (list view)
 */
export interface GlossaryTermMeta {
  id: string;
  name: string;
  nameRu: string;
  category: string;
  source: string;
}

/**
 * Full glossary term data
 */
export interface GlossaryTermFull extends GlossaryTermMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any[];
}

/**
 * Glossary list response (meta)
 */
export interface GlossaryListResponse {
  success: boolean;
  data: {
    terms: GlossaryTermMeta[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

/**
 * Feat metadata (list view)
 */
export interface FeatMeta {
  id: string;
  name: string;
  nameRu: string;
  category: string;
  prerequisite: string | null;
  source: string;
}

/**
 * Full feat data
 */
export interface FeatFull extends FeatMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any[];
}
/**
 * Race metadata (list view)
 */
export interface RaceMeta {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  speed: string;
  size: string;
  source: any;
  image?: string | null;
  hasLineages: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Race trait
 */
export interface RaceTrait {
  id: string;
  externalId: string | null;
  name: string;
  nameRu: string;
  description: any[];
  createdAt: string;
}

/**
 * Full race data
 */
export interface RaceFull extends RaceMeta {
  description: any[];
  gallery: string[];
  lastUsername?: string | null;
  properties?: any;
  traits: RaceTrait[];
}

import { useQuery } from "@tanstack/react-query";
import { charactersApi } from "@/api/client";

export const characterQueryKeys = {
  mine: ["characters", "mine"] as const,
  byId: (id: string) => ["characters", "id", id] as const,
  byShortId: (shortId: string) => ["characters", "short", shortId] as const,
};

export function useMyCharactersQuery(enabled = true) {
  return useQuery({
    queryKey: characterQueryKeys.mine,
    queryFn: () => charactersApi.list(),
    enabled,
  });
}

export function useCharacterByIdQuery(id: string, enabled = true) {
  return useQuery({
    queryKey: characterQueryKeys.byId(id),
    queryFn: () => charactersApi.get(id),
    enabled: Boolean(id) && enabled,
  });
}

export function useCharacterByShortIdQuery(shortId: string) {
  return useQuery({
    queryKey: characterQueryKeys.byShortId(shortId),
    queryFn: () => charactersApi.getByShortId(shortId),
    enabled: Boolean(shortId),
  });
}

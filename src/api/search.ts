import { useQuery } from "@tanstack/react-query";
import { searchApi } from "./client";

interface SearchResult {
  id: string;
  name: string;
  nameRu: string;
  type: "race" | "class" | "background" | "spell" | "equipment" | "glossary" | "feat";
  category: string;
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const response = await searchApi.search(query);
      return response.data.results as SearchResult[];
    },
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useRandomContent() {
  return useQuery({
    queryKey: ["search", "random"],
    queryFn: async () => {
      const response = await searchApi.random();
      return response.data.results as SearchResult[];
    },
    staleTime: 0, // Always fresh on mount
    refetchOnWindowFocus: false,
  });
}

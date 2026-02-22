import { useMutation, useQueryClient } from "@tanstack/react-query";
import { charactersApi } from "@/api/client";
import { characterQueryKeys } from "./queries";

export function useCreateCharacterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => charactersApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: characterQueryKeys.mine });
    },
  });
}

export function useUpdateCharacterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      charactersApi.update(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: characterQueryKeys.mine });
      queryClient.invalidateQueries({ queryKey: characterQueryKeys.byId(variables.id) });
    },
  });
}

export function useDeleteCharacterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => charactersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: characterQueryKeys.mine });
    },
  });
}

export function useSetCharacterPrivacyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isPublic }: { id: string; isPublic: boolean }) =>
      charactersApi.setPrivacy(id, isPublic),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: characterQueryKeys.mine });
      queryClient.invalidateQueries({ queryKey: characterQueryKeys.byId(variables.id) });
    },
  });
}

export function useLevelUpCharacterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      charactersApi.levelUp(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: characterQueryKeys.mine });
      queryClient.invalidateQueries({ queryKey: characterQueryKeys.byId(variables.id) });
    },
  });
}

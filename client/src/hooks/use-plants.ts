import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Plant } from '@shared/schema';
import { useToast } from './use-toast';

export function usePlants() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: plants = [], isLoading } = useQuery({
    queryKey: ['/api/plants'],
    staleTime: 180_000, // 3 minutes
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Plant>) => {
      const res = await apiRequest('POST', '/api/plants', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/plants'] });
      toast({
        title: 'Usina criada com sucesso!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao criar usina',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Plant> }) => {
      const res = await apiRequest('PUT', `/api/plants/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/plants'] });
      toast({
        title: 'Usina atualizada com sucesso!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao atualizar usina',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/plants/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/plants'] });
      toast({
        title: 'Usina excluída com sucesso!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao excluir usina',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    plants: plants as Plant[],
    isLoading,
    create: createMutation.mutate,
    createAsync: createMutation.mutateAsync,
    update: updateMutation.mutate,
    updateAsync: updateMutation.mutateAsync,
    delete: deleteMutation.mutate,
    deleteAsync: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

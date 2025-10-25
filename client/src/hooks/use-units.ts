import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Unit } from '@shared/schema';
import { useToast } from './use-toast';

export function useUnits() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: units = [], isLoading } = useQuery({
    queryKey: ['/api/units'],
    staleTime: 120_000, // 2 minutes
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Unit>) => {
      const res = await apiRequest('POST', '/api/units', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/units'] });
      toast({
        title: 'Unidade consumidora criada com sucesso!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao criar unidade consumidora',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Unit> }) => {
      const res = await apiRequest('PUT', `/api/units/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/units'] });
      toast({
        title: 'Unidade consumidora atualizada com sucesso!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao atualizar unidade consumidora',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/units/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/units'] });
      toast({
        title: 'Unidade consumidora excluída com sucesso!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao excluir unidade consumidora',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    units: units as Unit[],
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

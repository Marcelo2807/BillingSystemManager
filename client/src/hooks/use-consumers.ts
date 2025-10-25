import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Consumer } from '@shared/schema';
import { useToast } from './use-toast';

export function useConsumers() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: consumers = [], isLoading } = useQuery({
    queryKey: ['/api/consumers'],
    staleTime: 120_000, // 2 minutes
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Consumer>) => {
      const res = await apiRequest('POST', '/api/consumers', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/consumers'] });
      toast({
        title: 'Consumidor criado com sucesso!',
        variant: 'default',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao criar consumidor',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Consumer> }) => {
      const res = await apiRequest('PUT', `/api/consumers/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/consumers'] });
      toast({
        title: 'Consumidor atualizado com sucesso!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao atualizar consumidor',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/consumers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/consumers'] });
      toast({
        title: 'Consumidor excluído com sucesso!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao excluir consumidor',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    consumers: consumers as Consumer[],
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

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { PerformanceRecord } from '@shared/schema';
import { useToast } from './use-toast';

export function usePerformance() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: performanceRecords = [], isLoading } = useQuery({
    queryKey: ['/api/performance-records'],
    staleTime: 180_000, // 3 minutes
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<PerformanceRecord>) => {
      const res = await apiRequest('POST', '/api/performance-records', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/performance-records'] });
      toast({
        title: 'Registro de desempenho criado com sucesso!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao criar registro de desempenho',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    performanceRecords: performanceRecords as PerformanceRecord[],
    isLoading,
    create: createMutation.mutate,
    createAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
}

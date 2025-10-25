import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { BillingRecord } from '@shared/schema';
import { useToast } from './use-toast';

export function useBillingRecords() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: billingRecords = [], isLoading } = useQuery({
    queryKey: ['/api/billing-records'],
    staleTime: 60_000, // 1 minute
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<BillingRecord>) => {
      const res = await apiRequest('POST', '/api/billing-records', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/billing-records'] });
      toast({
        title: 'Registro de faturamento criado com sucesso!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao criar registro de faturamento',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<BillingRecord> }) => {
      const res = await apiRequest('PUT', `/api/billing-records/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/billing-records'] });
      toast({
        title: 'Registro de faturamento atualizado com sucesso!',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro ao atualizar registro de faturamento',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    billingRecords: billingRecords as BillingRecord[],
    isLoading,
    create: createMutation.mutate,
    createAsync: createMutation.mutateAsync,
    update: updateMutation.mutate,
    updateAsync: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}

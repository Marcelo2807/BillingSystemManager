import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Invoice } from '@shared/schema';
import { useToast } from './use-toast';

export function useInvoices() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['/api/invoices'],
    staleTime: 60_000, // 1 minute
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch('/api/invoices/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro ao fazer upload');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/invoices'] });
      toast({
        title: 'Fatura enviada com sucesso!',
      });
    },
    onError: (error: Error) => {
      if (error.message.includes('já cadastrada')) {
        toast({
          title: 'Fatura duplicada',
          description: 'Esta fatura já foi cadastrada anteriormente.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Erro ao enviar fatura',
          description: error.message,
          variant: 'destructive',
        });
      }
    },
  });

  return {
    invoices: invoices as Invoice[],
    isLoading,
    upload: uploadMutation.mutate,
    uploadAsync: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
  };
}

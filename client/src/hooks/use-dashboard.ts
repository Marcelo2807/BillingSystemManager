import { useQuery } from '@tanstack/react-query';
import type { DashboardStats } from '@shared/types';

export function useDashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats'],
    staleTime: 30_000, // 30 seconds
  });

  return {
    stats: stats || {
      totalConsumers: 0,
      totalUnits: 0,
      totalInvoices: 0,
      totalReceivable: 0,
      paidInvoices: 0,
      pendingInvoices: 0,
      overdueInvoices: 0,
    },
    isLoading,
  };
}

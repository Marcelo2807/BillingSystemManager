import { StatCard } from "@/components/stat-card";
import { AlertSection } from "@/components/alert-section";
import { RecentBillingTable } from "@/components/recent-billing-table";
import { Users, Building2, FileText, DollarSign } from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";
import { useBillingRecords } from "@/hooks/use-billing-records";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { stats, isLoading: statsLoading } = useDashboard();
  const { billingRecords, isLoading: recordsLoading } = useBillingRecords();

  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Pegar os últimos 10 registros
  const recentRecords = billingRecords.slice(0, 10);

  // Filtrar registros vencidos e próximos do vencimento
  const today = new Date();
  const overdueRecords = billingRecords.filter(r => r.status === 'overdue');
  const upcomingRecords = billingRecords.filter(r => {
    if (r.status !== 'pending') return false;
    // Lógica para definir "próximo do vencimento" pode ser ajustada
    return true;
  });

  if (statsLoading || recordsLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Visão geral do sistema de faturamento
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Visão geral do sistema de faturamento
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Consumidores"
          value={stats.totalConsumers}
          icon={Users}
        />
        <StatCard
          title="Unidades Consumidoras"
          value={stats.totalUnits}
          icon={Building2}
        />
        <StatCard
          title="Faturas do Mês"
          value={stats.totalInvoices}
          icon={FileText}
        />
        <StatCard
          title="Total a Receber"
          value={formatCurrency(stats.totalReceivable)}
          icon={DollarSign}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AlertSection type="overdue" count={overdueRecords.length} />
        <AlertSection type="upcoming" count={upcomingRecords.length} />
      </div>

      <RecentBillingTable records={recentRecords} />
    </div>
  );
}

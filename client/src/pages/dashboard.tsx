import { StatCard } from "@/components/stat-card";
import { AlertSection } from "@/components/alert-section";
import { RecentBillingTable } from "@/components/recent-billing-table";
import { Users, Building2, FileText, DollarSign } from "lucide-react";

export default function Dashboard() {
  const mockRecords = [
    { id: "1", consumerDocument: "123.456.789-00", ucNumber: "1234567890", dueDate: "15/01/2025", amount: 450.80, status: "pending" as const },
    { id: "2", consumerDocument: "987.654.321-00", ucNumber: "9876543210", dueDate: "10/01/2025", amount: 780.50, status: "paid" as const },
    { id: "3", consumerDocument: "456.789.123-00", ucNumber: "4567891230", dueDate: "05/01/2025", amount: 320.00, status: "overdue" as const },
    { id: "4", consumerDocument: "321.654.987-00", ucNumber: "3216549870", dueDate: "20/01/2025", amount: 890.25, status: "pending" as const },
    { id: "5", consumerDocument: "789.123.456-00", ucNumber: "7891234560", dueDate: "12/01/2025", amount: 560.90, status: "paid" as const },
    { id: "6", consumerDocument: "147.258.369-00", ucNumber: "1472583690", dueDate: "18/01/2025", amount: 420.30, status: "pending" as const },
  ];

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
          value={156}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Unidades Consumidoras"
          value={342}
          icon={Building2}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Faturas do Mês"
          value={89}
          icon={FileText}
        />
        <StatCard
          title="Total a Receber"
          value="R$ 45.280,00"
          icon={DollarSign}
          trend={{ value: -5, isPositive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AlertSection type="overdue" count={12} />
        <AlertSection type="upcoming" count={23} />
      </div>

      <RecentBillingTable records={mockRecords} />
    </div>
  );
}

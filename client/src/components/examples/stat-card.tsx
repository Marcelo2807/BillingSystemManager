import { StatCard } from "../stat-card";
import { Users, Building2, FileText, DollarSign } from "lucide-react";

export default function StatCardExample() {
  return (
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
  );
}

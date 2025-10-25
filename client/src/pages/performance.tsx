import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import { Zap, TrendingUp, DollarSign, Leaf } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Performance() {
  const energyData = [
    { month: "Jul", consumed: 12500, compensated: 8200 },
    { month: "Ago", consumed: 13200, compensated: 8900 },
    { month: "Set", consumed: 11800, compensated: 7800 },
    { month: "Out", consumed: 14100, compensated: 9500 },
    { month: "Nov", consumed: 15200, compensated: 10200 },
    { month: "Dez", consumed: 16800, compensated: 11400 },
  ];

  const savingsData = [
    { month: "Jul", savings: 3280 },
    { month: "Ago", savings: 3560 },
    { month: "Set", savings: 3120 },
    { month: "Out", savings: 3800 },
    { month: "Nov", savings: 4080 },
    { month: "Dez", savings: 4560 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Desempenho</h1>
        <p className="text-sm text-muted-foreground">
          Análise de consumo e economia de energia
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Energia Consumida"
          value="16.8k kWh"
          icon={Zap}
          trend={{ value: 10, isPositive: true }}
        />
        <StatCard
          title="Energia Compensada"
          value="11.4k kWh"
          icon={Leaf}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Economia Total"
          value="R$ 4.560,00"
          icon={DollarSign}
          trend={{ value: 18, isPositive: true }}
        />
        <StatCard
          title="Taxa de Compensação"
          value="67.8%"
          icon={TrendingUp}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Consumo vs Compensação (kWh)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="consumed"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  name="Consumido"
                />
                <Line
                  type="monotone"
                  dataKey="compensated"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Compensado"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Economia Mensal (R$)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="savings" fill="hsl(var(--primary))" name="Economia" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

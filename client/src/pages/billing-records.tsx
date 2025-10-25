import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BillingRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const mockRecords = Array.from({ length: 20 }, (_, i) => ({
    id: `record-${i + 1}`,
    consumerName: `Consumidor ${i + 1}`,
    ucNumber: `${String(i + 1000).padStart(10, '0')}`,
    referenceMonth: "01/2025",
    dueDate: `${10 + (i % 20)}/01/2025`,
    amount: (Math.random() * 800 + 200).toFixed(2),
    status: ["pending", "paid", "overdue"][i % 3] as "pending" | "paid" | "overdue",
  }));

  const filteredRecords = mockRecords.filter((record) => {
    const matchesSearch = record.consumerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.ucNumber.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusMap = {
    pending: { label: "Pendente", variant: "secondary" as const },
    paid: { label: "Pago", variant: "default" as const },
    overdue: { label: "Vencido", variant: "destructive" as const },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Registros de Cobrança</h1>
        <p className="text-sm text-muted-foreground">
          Visualize e gerencie os registros de cobrança
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Registros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por consumidor ou UC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search-records"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-status-filter">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="paid">Pagos</SelectItem>
                <SelectItem value="overdue">Vencidos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Consumidor</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">UC</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Referência</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Vencimento</TableHead>
                  <TableHead className="text-right text-xs font-medium uppercase tracking-wide">Valor</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow
                    key={record.id}
                    className="hover-elevate cursor-pointer"
                    data-testid={`row-record-${record.id}`}
                  >
                    <TableCell className="font-medium">{record.consumerName}</TableCell>
                    <TableCell className="font-mono text-sm">{record.ucNumber}</TableCell>
                    <TableCell className="text-sm">{record.referenceMonth}</TableCell>
                    <TableCell className="text-sm">{record.dueDate}</TableCell>
                    <TableCell className="text-right font-mono text-sm font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(parseFloat(record.amount))}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusMap[record.status].variant}>
                        {statusMap[record.status].label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

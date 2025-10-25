import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BillingRecord {
  id: string;
  consumerDocument: string;
  ucNumber: string;
  dueDate: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
}

interface RecentBillingTableProps {
  records: BillingRecord[];
}

const statusMap = {
  pending: { label: "Pendente", variant: "secondary" as const },
  paid: { label: "Pago", variant: "default" as const },
  overdue: { label: "Vencido", variant: "destructive" as const },
};

export function RecentBillingTable({ records }: RecentBillingTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Faturas Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium uppercase tracking-wide">UC</TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wide">CPF/CNPJ</TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wide">Vencimento</TableHead>
                <TableHead className="text-right text-xs font-medium uppercase tracking-wide">Valor</TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wide">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow
                  key={record.id}
                  className="hover-elevate cursor-pointer"
                  data-testid={`row-billing-${record.id}`}
                >
                  <TableCell className="font-mono text-sm">{record.ucNumber}</TableCell>
                  <TableCell className="font-mono text-sm">{record.consumerDocument}</TableCell>
                  <TableCell className="text-sm">{record.dueDate}</TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(record.amount)}
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
  );
}

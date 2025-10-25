import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Consumer {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  unitsCount: number;
}

interface ConsumersTableProps {
  consumers: Consumer[];
}

export function ConsumersTable({ consumers }: ConsumersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredConsumers = consumers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.document.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredConsumers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedConsumers = filteredConsumers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, CPF/CNPJ ou email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-9"
          data-testid="input-search-consumers"
        />
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-medium uppercase tracking-wide">Nome</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide">CPF/CNPJ</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide">Email</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide">Telefone</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide">Unidades</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedConsumers.map((consumer) => (
              <TableRow
                key={consumer.id}
                className="hover-elevate cursor-pointer"
                data-testid={`row-consumer-${consumer.id}`}
              >
                <TableCell className="font-medium">{consumer.name}</TableCell>
                <TableCell className="font-mono text-sm">{consumer.document}</TableCell>
                <TableCell className="text-sm">{consumer.email}</TableCell>
                <TableCell className="font-mono text-sm">{consumer.phone}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-mono">
                    {consumer.unitsCount}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredConsumers.length)} de{" "}
          {filteredConsumers.length} consumidores
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            data-testid="button-prev-page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            data-testid="button-next-page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

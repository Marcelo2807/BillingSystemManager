import { ConsumerDialog } from "@/components/consumer-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useConsumers } from "@/hooks/use-consumers";
import { useUnits } from "@/hooks/use-units";
import { useState, useMemo } from "react";
import { Search, Edit, Trash2 } from "lucide-react";
import type { Consumer } from "@shared/schema";

export default function Consumers() {
  const { consumers, isLoading, delete: deleteConsumer } = useConsumers();
  const { units } = useUnits();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsumer, setSelectedConsumer] = useState<Consumer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Contar unidades por consumidor
  const unitsCountByConsumer = useMemo(() => {
    const counts: Record<string, number> = {};
    units.forEach(unit => {
      if (unit.consumerId) {
        counts[unit.consumerId] = (counts[unit.consumerId] || 0) + 1;
      }
    });
    return counts;
  }, [units]);

  // Filtrar consumidores
  const filteredConsumers = useMemo(() => {
    if (!searchTerm) return consumers;
    const term = searchTerm.toLowerCase();
    return consumers.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term) ||
      c.document?.includes(term)
    );
  }, [consumers, searchTerm]);

  const handleEdit = (consumer: Consumer) => {
    setSelectedConsumer(consumer);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este consumidor?')) {
      deleteConsumer(id);
    }
  };

  const handleNewConsumer = () => {
    setSelectedConsumer(null);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Consumidores</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os consumidores cadastrados
          </p>
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Consumidores</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os consumidores cadastrados
          </p>
        </div>
        <Button onClick={handleNewConsumer}>
          Novo Consumidor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Consumidores ({filteredConsumers.length})</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CPF/CNPJ ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF/CNPJ</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Unidades</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConsumers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    {searchTerm ? 'Nenhum consumidor encontrado' : 'Nenhum consumidor cadastrado'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredConsumers.map((consumer) => (
                  <TableRow key={consumer.id}>
                    <TableCell className="font-medium">{consumer.name}</TableCell>
                    <TableCell>{consumer.document || '-'}</TableCell>
                    <TableCell>{consumer.email || '-'}</TableCell>
                    <TableCell>{consumer.phone || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {unitsCountByConsumer[consumer.id] || 0} unidade(s)
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(consumer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(consumer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConsumerDialog
        consumer={selectedConsumer}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}

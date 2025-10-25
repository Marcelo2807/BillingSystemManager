import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUnits } from "@/hooks/use-units";
import { useConsumers } from "@/hooks/use-consumers";
import { usePlants } from "@/hooks/use-plants";

export default function Units() {
  const [searchTerm, setSearchTerm] = useState("");
  const [distributorFilter, setDistributorFilter] = useState("all");

  const { units, isLoading } = useUnits();
  const { consumers } = useConsumers();
  const { plants } = usePlants();

  // Criar mapa de consumidores e plantas para lookup rápido
  const consumerMap = useMemo(() => {
    const map: Record<string, string> = {};
    consumers.forEach(c => map[c.id] = c.name);
    return map;
  }, [consumers]);

  const plantMap = useMemo(() => {
    const map: Record<string, string> = {};
    plants.forEach(p => map[p.id] = p.name);
    return map;
  }, [plants]);

  // Obter lista única de distribuidoras
  const distributors = useMemo(() => {
    const unique = new Set(units.map(u => u.distributor));
    return Array.from(unique).sort();
  }, [units]);

  const filteredUnits = useMemo(() => {
    return units.filter((unit) => {
      const matchesSearch =
        unit.ucNumber.includes(searchTerm) ||
        consumerMap[unit.consumerId || '']?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDistributor =
        distributorFilter === "all" || unit.distributor === distributorFilter;
      return matchesSearch && matchesDistributor;
    });
  }, [units, searchTerm, distributorFilter, consumerMap]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Unidades Consumidoras</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie as unidades consumidoras
          </p>
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Unidades Consumidoras</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie as unidades consumidoras
          </p>
        </div>
        <Button data-testid="button-add-unit">
          <Plus className="h-4 w-4" />
          Nova Unidade
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Unidades ({filteredUnits.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por UC ou consumidor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search-units"
              />
            </div>
            <Select value={distributorFilter} onValueChange={setDistributorFilter}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-distributor">
                <SelectValue placeholder="Distribuidora" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {distributors.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">UC</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Consumidor</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Distribuidora</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Usina</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnits.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      {searchTerm ? 'Nenhuma unidade encontrada' : 'Nenhuma unidade cadastrada'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUnits.map((unit) => (
                    <TableRow
                      key={unit.id}
                      className="hover-elevate cursor-pointer"
                      data-testid={`row-unit-${unit.id}`}
                    >
                      <TableCell className="font-mono text-sm font-medium">{unit.ucNumber}</TableCell>
                      <TableCell>{consumerMap[unit.consumerId || ''] || '-'}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{unit.distributor}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{plantMap[unit.plantId || ''] || '-'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

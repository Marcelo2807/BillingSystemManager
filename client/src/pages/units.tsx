import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export default function Units() {
  const [searchTerm, setSearchTerm] = useState("");
  const [distributor, setDistributor] = useState("all");

  const mockUnits = Array.from({ length: 15 }, (_, i) => ({
    id: `unit-${i + 1}`,
    ucNumber: `${String(i + 1000).padStart(10, '0')}`,
    consumerName: `Consumidor ${i + 1}`,
    distributor: ["CPFL", "EDP", "Enel", "Light"][i % 4],
    city: ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba"][i % 4],
    state: ["SP", "RJ", "MG", "PR"][i % 4],
  }));

  const filteredUnits = mockUnits.filter((unit) => {
    const matchesSearch = unit.ucNumber.includes(searchTerm) || 
                         unit.consumerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistributor = distributor === "all" || unit.distributor === distributor;
    return matchesSearch && matchesDistributor;
  });

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
          <CardTitle>Lista de Unidades</CardTitle>
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
            <Select value={distributor} onValueChange={setDistributor}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-distributor">
                <SelectValue placeholder="Distribuidora" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="CPFL">CPFL</SelectItem>
                <SelectItem value="EDP">EDP</SelectItem>
                <SelectItem value="Enel">Enel</SelectItem>
                <SelectItem value="Light">Light</SelectItem>
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
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Cidade</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">UF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnits.map((unit) => (
                  <TableRow
                    key={unit.id}
                    className="hover-elevate cursor-pointer"
                    data-testid={`row-unit-${unit.id}`}
                  >
                    <TableCell className="font-mono text-sm font-medium">{unit.ucNumber}</TableCell>
                    <TableCell>{unit.consumerName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{unit.distributor}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{unit.city}</TableCell>
                    <TableCell className="font-mono text-sm">{unit.state}</TableCell>
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

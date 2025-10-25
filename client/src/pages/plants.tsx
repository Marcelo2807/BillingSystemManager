import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Sun, Plus, MapPin } from "lucide-react";
import { usePlants } from "@/hooks/use-plants";
import { useUnits } from "@/hooks/use-units";

export default function Plants() {
  const { plants, isLoading } = usePlants();
  const { units } = useUnits();

  // Contar unidades por planta
  const unitsCountByPlant = useMemo(() => {
    const counts: Record<string, number> = {};
    units.forEach(unit => {
      if (unit.plantId) {
        counts[unit.plantId] = (counts[unit.plantId] || 0) + 1;
      }
    });
    return counts;
  }, [units]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Usinas Solares</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie as usinas de energia solar
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Usinas Solares</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie as usinas de energia solar
          </p>
        </div>
        <Button data-testid="button-add-plant">
          <Plus className="h-4 w-4" />
          Nova Usina
        </Button>
      </div>

      {plants.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plants.slice(0, 4).map((plant) => (
            <Card key={plant.id} className="hover-elevate cursor-pointer transition-shadow" data-testid={`card-plant-${plant.id}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Sun className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <h3 className="font-semibold">{plant.name}</h3>
                <p className="font-mono text-xs text-muted-foreground">{plant.cnpj}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{plant.city}, {plant.state}</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-mono font-medium text-foreground">{unitsCountByPlant[plant.id] || 0}</span> unidades conectadas
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Todas as Usinas ({plants.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Nome</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">CNPJ</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Localização</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Unidades</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      Nenhuma usina cadastrada
                    </TableCell>
                  </TableRow>
                ) : (
                  plants.map((plant) => (
                    <TableRow key={plant.id} className="hover-elevate cursor-pointer">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-primary" />
                          {plant.name}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{plant.cnpj}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{plant.city}, {plant.state}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">{unitsCountByPlant[plant.id] || 0}</Badge>
                      </TableCell>
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

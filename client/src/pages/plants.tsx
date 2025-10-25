import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sun, Plus, MapPin } from "lucide-react";

export default function Plants() {
  const mockPlants = [
    { id: "1", name: "Usina Solar Centro", cnpj: "12.345.678/0001-90", city: "São Paulo", state: "SP", power: "500 kWp", unitsCount: 45 },
    { id: "2", name: "Parque Solar Norte", cnpj: "98.765.432/0001-10", city: "Belo Horizonte", state: "MG", power: "750 kWp", unitsCount: 62 },
    { id: "3", name: "Energia Solar Sul", cnpj: "45.678.912/0001-34", city: "Curitiba", state: "PR", power: "350 kWp", unitsCount: 28 },
    { id: "4", name: "Solar Park Leste", cnpj: "78.912.345/0001-56", city: "Rio de Janeiro", state: "RJ", power: "600 kWp", unitsCount: 51 },
  ];

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockPlants.map((plant) => (
          <Card key={plant.id} className="hover-elevate cursor-pointer transition-shadow" data-testid={`card-plant-${plant.id}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <Sun className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="secondary" className="font-mono text-xs">
                  {plant.power}
                </Badge>
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
                  <span className="font-mono font-medium text-foreground">{plant.unitsCount}</span> unidades conectadas
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Usinas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Nome</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">CNPJ</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Localização</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Potência</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wide">Unidades</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPlants.map((plant) => (
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
                    <TableCell className="font-mono text-sm">{plant.power}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">{plant.unitsCount}</Badge>
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

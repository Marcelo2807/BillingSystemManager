import { ConsumersTable } from "@/components/consumers-table";
import { ConsumerDialog } from "@/components/consumer-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Consumers() {
  const mockConsumers = Array.from({ length: 25 }, (_, i) => ({
    id: `consumer-${i + 1}`,
    name: `Consumidor ${i + 1}`,
    document: `${String(i + 1).padStart(3, '0')}.${String(i + 456).padStart(3, '0')}.${String(i + 789).padStart(3, '0')}-${String(i).padStart(2, '0')}`,
    email: `consumidor${i + 1}@example.com`,
    phone: `(11) 9${String(i).padStart(4, '0')}-${String(i + 1000).padStart(4, '0')}`,
    unitsCount: Math.floor(Math.random() * 5) + 1,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Consumidores</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os consumidores cadastrados
          </p>
        </div>
        <ConsumerDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Consumidores</CardTitle>
        </CardHeader>
        <CardContent>
          <ConsumersTable consumers={mockConsumers} />
        </CardContent>
      </Card>
    </div>
  );
}

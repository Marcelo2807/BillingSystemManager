import { ConsumersTable } from "../consumers-table";

export default function ConsumersTableExample() {
  const mockConsumers = Array.from({ length: 25 }, (_, i) => ({
    id: `consumer-${i + 1}`,
    name: `Consumidor ${i + 1}`,
    document: `${String(i + 1).padStart(3, '0')}.${String(i + 456).padStart(3, '0')}.${String(i + 789).padStart(3, '0')}-${String(i).padStart(2, '0')}`,
    email: `consumidor${i + 1}@example.com`,
    phone: `(11) 9${String(i).padStart(4, '0')}-${String(i + 1000).padStart(4, '0')}`,
    unitsCount: Math.floor(Math.random() * 5) + 1,
  }));

  return <ConsumersTable consumers={mockConsumers} />;
}

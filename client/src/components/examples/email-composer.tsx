import { EmailComposer } from "../email-composer";

export default function EmailComposerExample() {
  const mockBillings = [
    { id: "1", consumerName: "João Silva", ucNumber: "1234567890", amount: 450.80, dueDate: "15/01/2025", status: "pending" as const },
    { id: "2", consumerName: "Maria Santos", ucNumber: "9876543210", amount: 780.50, dueDate: "10/01/2025", status: "paid" as const },
    { id: "3", consumerName: "Pedro Costa", ucNumber: "4567891230", amount: 320.00, dueDate: "05/01/2025", status: "overdue" as const },
    { id: "4", consumerName: "Ana Oliveira", ucNumber: "3216549870", amount: 890.25, dueDate: "20/01/2025", status: "pending" as const },
    { id: "5", consumerName: "Carlos Ferreira", ucNumber: "7891234560", amount: 560.90, dueDate: "12/01/2025", status: "pending" as const },
  ];

  return <EmailComposer billings={mockBillings} />;
}

import { RecentBillingTable } from "../recent-billing-table";

export default function RecentBillingTableExample() {
  const mockRecords = [
    { id: "1", consumerDocument: "123.456.789-00", ucNumber: "1234567890", dueDate: "15/01/2025", amount: 450.80, status: "pending" as const },
    { id: "2", consumerDocument: "987.654.321-00", ucNumber: "9876543210", dueDate: "10/01/2025", amount: 780.50, status: "paid" as const },
    { id: "3", consumerDocument: "456.789.123-00", ucNumber: "4567891230", dueDate: "05/01/2025", amount: 320.00, status: "overdue" as const },
    { id: "4", consumerDocument: "321.654.987-00", ucNumber: "3216549870", dueDate: "20/01/2025", amount: 890.25, status: "pending" as const },
    { id: "5", consumerDocument: "789.123.456-00", ucNumber: "7891234560", dueDate: "12/01/2025", amount: 560.90, status: "paid" as const },
  ];

  return <RecentBillingTable records={mockRecords} />;
}

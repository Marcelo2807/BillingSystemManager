import { EmailComposer } from "@/components/email-composer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export default function BillingEmails() {
  const mockBillings = [
    { id: "1", consumerName: "João Silva", ucNumber: "1234567890", amount: 450.80, dueDate: "15/01/2025", status: "pending" as const },
    { id: "2", consumerName: "Maria Santos", ucNumber: "9876543210", amount: 780.50, dueDate: "10/01/2025", status: "paid" as const },
    { id: "3", consumerName: "Pedro Costa", ucNumber: "4567891230", amount: 320.00, dueDate: "05/01/2025", status: "overdue" as const },
    { id: "4", consumerName: "Ana Oliveira", ucNumber: "3216549870", amount: 890.25, dueDate: "20/01/2025", status: "pending" as const },
    { id: "5", consumerName: "Carlos Ferreira", ucNumber: "7891234560", amount: 560.90, dueDate: "12/01/2025", status: "pending" as const },
    { id: "6", consumerName: "Juliana Alves", ucNumber: "1472583690", amount: 420.30, dueDate: "18/01/2025", status: "pending" as const },
  ];

  const emailHistory = [
    { id: "1", to: "joao@example.com", subject: "Fatura de Energia - Janeiro/2025", status: "sent", sentAt: "10/01/2025 14:30" },
    { id: "2", to: "maria@example.com", subject: "Fatura de Energia - Janeiro/2025", status: "sent", sentAt: "10/01/2025 14:31" },
    { id: "3", to: "pedro@example.com", subject: "Fatura de Energia - Janeiro/2025", status: "failed", sentAt: "10/01/2025 14:32" },
    { id: "4", to: "ana@example.com", subject: "Fatura de Energia - Janeiro/2025", status: "pending", sentAt: "10/01/2025 14:33" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Enviar Emails</h1>
        <p className="text-sm text-muted-foreground">
          Envie faturas por email para os consumidores
        </p>
      </div>

      <EmailComposer billings={mockBillings} />

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Envios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {emailHistory.map((email) => (
              <div
                key={email.id}
                className="flex items-center gap-4 rounded-md border p-3"
                data-testid={`email-history-${email.id}`}
              >
                <div className="flex h-8 w-8 items-center justify-center">
                  {email.status === "sent" && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />}
                  {email.status === "failed" && <XCircle className="h-5 w-5 text-destructive" />}
                  {email.status === "pending" && <Clock className="h-5 w-5 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{email.to}</p>
                  <p className="text-xs text-muted-foreground truncate">{email.subject}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      email.status === "sent" ? "default" :
                      email.status === "failed" ? "destructive" :
                      "secondary"
                    }
                  >
                    {email.status === "sent" ? "Enviado" :
                     email.status === "failed" ? "Falhou" :
                     "Pendente"}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{email.sentAt}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

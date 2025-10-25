import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BillingItem {
  id: string;
  consumerName: string;
  ucNumber: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
}

interface EmailComposerProps {
  billings: BillingItem[];
}

export function EmailComposer({ billings }: EmailComposerProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [message, setMessage] = useState("Prezado(a) cliente,\n\nSegue em anexo sua fatura de energia referente ao período.\n\nAtenciosamente,\nPró Energia");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "paid" | "overdue">("pending");
  const { toast } = useToast();

  const filteredBillings = billings.filter(
    (b) => filterStatus === "all" || b.status === filterStatus
  );

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSendEmails = () => {
    console.log("Sending emails to:", selectedIds);
    toast({
      title: "Emails enviados",
      description: `${selectedIds.length} email(s) enviado(s) com sucesso`,
    });
    setSelectedIds([]);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Selecionar Destinatários</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" data-testid="tab-all">Todos</TabsTrigger>
              <TabsTrigger value="pending" data-testid="tab-pending">Pendentes</TabsTrigger>
              <TabsTrigger value="paid" data-testid="tab-paid">Pagos</TabsTrigger>
              <TabsTrigger value="overdue" data-testid="tab-overdue">Vencidos</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredBillings.map((billing) => (
              <div
                key={billing.id}
                className="flex items-center gap-3 rounded-md border p-3 hover-elevate cursor-pointer"
                onClick={() => toggleSelection(billing.id)}
                data-testid={`billing-item-${billing.id}`}
              >
                <Checkbox
                  checked={selectedIds.includes(billing.id)}
                  onCheckedChange={() => toggleSelection(billing.id)}
                  data-testid={`checkbox-billing-${billing.id}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{billing.consumerName}</p>
                  <p className="text-xs text-muted-foreground font-mono">UC: {billing.ucNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(billing.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">{billing.dueDate}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-sm text-muted-foreground">
              {selectedIds.length} selecionado(s)
            </p>
            <Badge variant="secondary" className="font-mono">
              Total: {filteredBillings.length}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mensagem do Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-64 resize-none"
            placeholder="Digite sua mensagem..."
            data-testid="textarea-email-message"
          />

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>A fatura será enviada como anexo PDF</span>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleSendEmails}
            disabled={selectedIds.length === 0}
            data-testid="button-send-emails"
          >
            <Send className="h-4 w-4" />
            Enviar {selectedIds.length > 0 && `(${selectedIds.length})`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

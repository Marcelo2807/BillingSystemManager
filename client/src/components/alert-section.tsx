import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertSectionProps {
  type: "overdue" | "upcoming";
  count: number;
  items?: Array<{ id: string; description: string; dueDate: string }>;
}

export function AlertSection({ type, count, items = [] }: AlertSectionProps) {
  const isOverdue = type === "overdue";

  return (
    <Card
      className={cn(
        "hover-elevate cursor-pointer transition-all",
        isOverdue && "border-destructive/50"
      )}
      data-testid={`card-alert-${type}`}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md",
          isOverdue ? "bg-destructive/10" : "bg-primary/10"
        )}>
          {isOverdue ? (
            <AlertCircle className="h-5 w-5 text-destructive" />
          ) : (
            <Clock className="h-5 w-5 text-primary" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">
            {isOverdue ? "Faturas Vencidas" : "Vencendo em 7 dias"}
          </p>
          <p className="text-xs text-muted-foreground">
            {count} {count === 1 ? "fatura" : "faturas"}
          </p>
        </div>
        <Badge
          variant={isOverdue ? "destructive" : "default"}
          className="font-mono"
          data-testid={`badge-alert-count-${type}`}
        >
          {count}
        </Badge>
      </CardContent>
    </Card>
  );
}

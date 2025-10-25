import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useConsumers } from "@/hooks/use-consumers";
import type { Consumer } from "@shared/schema";

const consumerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  document: z.string().min(11, "CPF/CNPJ inválido").optional().or(z.literal("")),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
});

type ConsumerForm = z.infer<typeof consumerSchema>;

interface ConsumerDialogProps {
  consumer?: Consumer | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ConsumerDialog({ consumer, open, onOpenChange }: ConsumerDialogProps) {
  const { create, update, isCreating, isUpdating } = useConsumers();
  const isEditing = !!consumer;

  const form = useForm<ConsumerForm>({
    resolver: zodResolver(consumerSchema),
    defaultValues: {
      name: "",
      document: "",
      email: "",
      phone: "",
    },
  });

  // Reset form quando o consumer mudar
  useEffect(() => {
    if (consumer) {
      form.reset({
        name: consumer.name,
        document: consumer.document || "",
        email: consumer.email || "",
        phone: consumer.phone || "",
      });
    } else {
      form.reset({
        name: "",
        document: "",
        email: "",
        phone: "",
      });
    }
  }, [consumer, form]);

  const onSubmit = async (data: ConsumerForm) => {
    try {
      if (isEditing) {
        await update({ id: consumer.id, data });
      } else {
        await create(data);
      }
      onOpenChange?.(false);
      form.reset();
    } catch (error) {
      console.error('Error saving consumer:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Consumidor' : 'Novo Consumidor'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome *</FormLabel>
                  <FormControl>
                    <Input placeholder="João da Silva" {...field} data-testid="input-consumer-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF/CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="000.000.000-00" {...field} data-testid="input-consumer-document" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="joao@example.com" {...field} data-testid="input-consumer-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} data-testid="input-consumer-phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange?.(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                data-testid="button-submit-consumer"
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

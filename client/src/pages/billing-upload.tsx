import { InvoiceUploadZone } from "@/components/invoice-upload-zone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function BillingUpload() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Upload de Faturas</h1>
        <p className="text-sm text-muted-foreground">
          Envie faturas para processamento automático com IA
        </p>
      </div>

      <Tabs defaultValue="distributor" className="space-y-6">
        <TabsList>
          <TabsTrigger value="distributor" data-testid="tab-distributor">Faturas de Distribuidora</TabsTrigger>
          <TabsTrigger value="proprietary" data-testid="tab-proprietary">Faturas Próprias</TabsTrigger>
        </TabsList>

        <TabsContent value="distributor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Faturas de Distribuidora</CardTitle>
              <CardDescription>
                Envie faturas recebidas das distribuidoras de energia (CPFL, EDP, Enel, etc.)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceUploadZone />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proprietary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Faturas Próprias (Usinas)</CardTitle>
              <CardDescription>
                Envie faturas geradas pelas suas usinas solares para os consumidores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceUploadZone />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

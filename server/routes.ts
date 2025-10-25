import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import {
  consumers,
  plants,
  units,
  invoices,
  billingRecords,
  apportionments,
  performanceRecords,
  documents,
  documentExtractions,
  emailHistory,
  type Consumer,
  type Plant,
  type Unit,
  type Invoice,
  type BillingRecord
} from "@shared/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import multer from "multer";
import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

// Configure multer para upload de arquivos
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Helper function to get user ID (simulado - em produção usaria autenticação real)
function getUserId(req: Request): string {
  // Em produção, isso viria da sessão/token de autenticação
  return (req as any).user?.id || 'demo-user-id';
}

export async function registerRoutes(app: Express): Promise<Server> {
  // ==================== CONSUMERS ROUTES ====================

  // Listar todos os consumidores
  app.get("/api/consumers", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const allConsumers = await db
        .select()
        .from(consumers)
        .where(eq(consumers.createdBy, userId))
        .orderBy(consumers.name);
      res.json(allConsumers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Criar novo consumidor
  app.post("/api/consumers", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const [newConsumer] = await db
        .insert(consumers)
        .values({ ...req.body, createdBy: userId })
        .returning();
      res.json(newConsumer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Atualizar consumidor
  app.put("/api/consumers/:id", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const [updated] = await db
        .update(consumers)
        .set(req.body)
        .where(and(
          eq(consumers.id, req.params.id),
          eq(consumers.createdBy, userId)
        ))
        .returning();
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Deletar consumidor
  app.delete("/api/consumers/:id", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      await db
        .delete(consumers)
        .where(and(
          eq(consumers.id, req.params.id),
          eq(consumers.createdBy, userId)
        ));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== PLANTS ROUTES ====================

  app.get("/api/plants", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const allPlants = await db
        .select()
        .from(plants)
        .where(eq(plants.createdBy, userId))
        .orderBy(plants.name);
      res.json(allPlants);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/plants", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const [newPlant] = await db
        .insert(plants)
        .values({ ...req.body, createdBy: userId })
        .returning();
      res.json(newPlant);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/plants/:id", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const [updated] = await db
        .update(plants)
        .set(req.body)
        .where(and(
          eq(plants.id, req.params.id),
          eq(plants.createdBy, userId)
        ))
        .returning();
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/plants/:id", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      await db
        .delete(plants)
        .where(and(
          eq(plants.id, req.params.id),
          eq(plants.createdBy, userId)
        ));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== UNITS ROUTES ====================

  app.get("/api/units", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const allUnits = await db
        .select()
        .from(units)
        .where(eq(units.createdBy, userId))
        .orderBy(units.ucNumber);
      res.json(allUnits);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/units", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const [newUnit] = await db
        .insert(units)
        .values({ ...req.body, createdBy: userId })
        .returning();
      res.json(newUnit);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/units/:id", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const [updated] = await db
        .update(units)
        .set(req.body)
        .where(and(
          eq(units.id, req.params.id),
          eq(units.createdBy, userId)
        ))
        .returning();
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/units/:id", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      await db
        .delete(units)
        .where(and(
          eq(units.id, req.params.id),
          eq(units.createdBy, userId)
        ));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== INVOICES ROUTES ====================

  app.get("/api/invoices", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const allInvoices = await db
        .select()
        .from(invoices)
        .where(eq(invoices.createdBy, userId))
        .orderBy(desc(invoices.createdAt));
      res.json(allInvoices);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Upload de fatura
  app.post("/api/invoices/upload", upload.single('file'), async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      // Calcular SHA-256
      const fileBuffer = await fs.readFile(file.path);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

      // Verificar se já existe
      const existing = await db
        .select()
        .from(invoices)
        .where(eq(invoices.sha256, hash))
        .limit(1);

      if (existing.length > 0) {
        await fs.unlink(file.path); // Remove arquivo duplicado
        return res.status(409).json({ error: 'Fatura já cadastrada', invoice: existing[0] });
      }

      // Criar diretório de armazenamento se não existir
      const storageDir = path.join(process.cwd(), 'storage', 'invoices', userId);
      await fs.mkdir(storageDir, { recursive: true });

      // Mover arquivo para storage permanente
      const storagePath = `${userId}/${Date.now()}-${file.originalname}`;
      const finalPath = path.join(process.cwd(), 'storage', 'invoices', storagePath);
      await fs.rename(file.path, finalPath);

      // Criar registro no banco
      const [newInvoice] = await db
        .insert(invoices)
        .values({
          type: req.body.type || 'distributor',
          storagePath,
          sha256: hash,
          status: 'uploaded',
          referenceMonth: req.body.referenceMonth ? parseInt(req.body.referenceMonth) : null,
          referenceYear: req.body.referenceYear ? parseInt(req.body.referenceYear) : null,
          createdBy: userId,
        })
        .returning();

      res.json(newInvoice);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== BILLING RECORDS ROUTES ====================

  app.get("/api/billing-records", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const records = await db
        .select()
        .from(billingRecords)
        .where(eq(billingRecords.createdBy, userId))
        .orderBy(desc(billingRecords.createdAt));
      res.json(records);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/billing-records", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const [newRecord] = await db
        .insert(billingRecords)
        .values({ ...req.body, createdBy: userId })
        .returning();
      res.json(newRecord);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/billing-records/:id", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const [updated] = await db
        .update(billingRecords)
        .set(req.body)
        .where(and(
          eq(billingRecords.id, req.params.id),
          eq(billingRecords.createdBy, userId)
        ))
        .returning();
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== APPORTIONMENTS ROUTES ====================

  app.get("/api/apportionments", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const allApportionments = await db
        .select()
        .from(apportionments)
        .where(eq(apportionments.createdBy, userId))
        .orderBy(desc(apportionments.createdAt));
      res.json(allApportionments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/apportionments", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const [newApportionment] = await db
        .insert(apportionments)
        .values({ ...req.body, createdBy: userId })
        .returning();
      res.json(newApportionment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/apportionments/:id", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const [updated] = await db
        .update(apportionments)
        .set(req.body)
        .where(and(
          eq(apportionments.id, req.params.id),
          eq(apportionments.createdBy, userId)
        ))
        .returning();
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== PERFORMANCE RECORDS ROUTES ====================

  app.get("/api/performance-records", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const records = await db
        .select()
        .from(performanceRecords)
        .where(eq(performanceRecords.createdBy, userId))
        .orderBy(desc(performanceRecords.referenceMonth));
      res.json(records);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/performance-records", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const [newRecord] = await db
        .insert(performanceRecords)
        .values({ ...req.body, createdBy: userId })
        .returning();
      res.json(newRecord);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== DASHBOARD STATS ====================

  app.get("/api/dashboard/stats", async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);

      const [consumersCount] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(consumers)
        .where(eq(consumers.createdBy, userId));

      const [unitsCount] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(units)
        .where(eq(units.createdBy, userId));

      const [invoicesCount] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(invoices)
        .where(eq(invoices.createdBy, userId));

      const stats = {
        totalConsumers: consumersCount?.count || 0,
        totalUnits: unitsCount?.count || 0,
        totalInvoices: invoicesCount?.count || 0,
        totalReceivable: 0,
        paidInvoices: 0,
        pendingInvoices: 0,
        overdueInvoices: 0,
      };

      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== EMAIL HISTORY ====================

  app.get("/api/email-history", async (req: Request, res: Response) => {
    try {
      const history = await db
        .select()
        .from(emailHistory)
        .orderBy(desc(emailHistory.createdAt))
        .limit(50);
      res.json(history);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/email-history", async (req: Request, res: Response) => {
    try {
      const [newRecord] = await db
        .insert(emailHistory)
        .values(req.body)
        .returning();
      res.json(newRecord);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

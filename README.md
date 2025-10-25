# PRO ENERGIA - Sistema de Gestão de Faturamento Solar ⚡

Sistema completo de gerenciamento de faturamento de energia solar para empresas, com processamento de faturas via IA, gestão de consumidores, usinas solares e envio automatizado de emails.

## 🚀 Tecnologias

### Frontend
- **React 18.3.1** + TypeScript
- **Vite** - Build tool
- **Wouter** - Roteamento
- **TanStack Query** (React Query) - Gerenciamento de estado
- **Radix UI** + shadcn/ui - Componentes de UI
- **Tailwind CSS** - Estilização
- **React Hook Form** + Zod - Formulários e validação
- **Recharts** - Gráficos
- **react-dropzone** - Upload de arquivos

### Backend
- **Express.js** - Servidor HTTP
- **Drizzle ORM** - ORM para PostgreSQL
- **PostgreSQL** (Neon) - Banco de dados
- **Multer** - Upload de arquivos
- **OpenAI API** - Processamento de documentos com IA (opcional)

## 📁 Estrutura do Banco de Dados

O sistema utiliza 10 tabelas principais:

1. **users** - Autenticação de usuários
2. **consumers** - Consumidores/clientes
3. **plants** - Usinas solares
4. **units** - Unidades consumidoras
5. **invoices** - Faturas (distribuidora e próprias)
6. **billing_records** - Registros de faturamento
7. **apportionments** - Rateios de energia
8. **performance_records** - Registros de desempenho
9. **email_history** - Histórico de emails enviados
10. **email_templates** - Templates de email

## 🎯 Funcionalidades Principais

### 1. Dashboard 📊
- KPIs em tempo real (consumidores, unidades, faturas, valores a receber)
- Alertas de vencimento
- Tabela de faturas recentes

### 2. Gestão de Consumidores 👥
- CRUD completo
- Busca por nome, CPF/CNPJ ou email
- Contagem de unidades por consumidor

### 3. Unidades Consumidoras 🏢
- Gerenciamento de UCs
- Filtros por distribuidora
- Associação com consumidores e plantas

### 4. Usinas Solares ☀️
- Cadastro de usinas
- Visualização em cards e tabela
- Contagem de unidades conectadas

### 5. Upload de Faturas 📄
- Upload via drag-and-drop
- Suporte a PDF, PNG, JPG, WEBP (máx. 5MB)
- Deduplicação via SHA-256
- Separação de faturas de distribuidoras e próprias

### 6. Envio de Emails em Lote ✉️
- Seleção múltipla de faturas
- Filtros por período e status
- Histórico de envios

### 7. Registros de Faturamento 📋
- Acompanhamento de status
- Integração com faturas

### 8. Performance ⚡
- Métricas de energia (gerada, consumida, compensada)
- Economia dos consumidores
- Filtros por planta e período

## 🛠️ Configuração e Instalação

### Pré-requisitos

- Node.js 18+
- PostgreSQL database (Neon recomendado para Replit)
- Conta OpenAI (opcional, para processamento de documentos com IA)

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# OpenAI (opcional)
OPENAI_API_KEY=sk-...

# Server
PORT=5000
NODE_ENV=development
```

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Criar tabelas no banco de dados
npm run db:push

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:5000`

### Build para Produção

```bash
# Build
npm run build

# Start em produção
npm start
```

## 📚 Estrutura de Pastas

```
BillingSystemManager/
├── client/src/              # Frontend React
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/              # Componentes shadcn/ui
│   │   └── ...              # Componentes customizados
│   ├── hooks/               # React hooks customizados
│   ├── lib/                 # Utilitários
│   ├── pages/               # Páginas do app
│   └── main.tsx             # Entry point
├── server/                  # Backend Express
│   ├── routes.ts            # Rotas da API
│   ├── db.ts                # Configuração do DB
│   └── index.ts             # Entry point
├── shared/                  # Código compartilhado
│   ├── schema.ts            # Schema Drizzle
│   └── types.ts             # TypeScript types
└── storage/                 # Armazenamento de arquivos
    └── invoices/            # Faturas uploaded
```

## 🔌 API Endpoints

### Consumidores
- `GET /api/consumers` - Listar todos
- `POST /api/consumers` - Criar novo
- `PUT /api/consumers/:id` - Atualizar
- `DELETE /api/consumers/:id` - Deletar

### Usinas
- `GET /api/plants` - Listar todas
- `POST /api/plants` - Criar nova
- `PUT /api/plants/:id` - Atualizar
- `DELETE /api/plants/:id` - Deletar

### Unidades
- `GET /api/units` - Listar todas
- `POST /api/units` - Criar nova
- `PUT /api/units/:id` - Atualizar
- `DELETE /api/units/:id` - Deletar

### Faturas
- `GET /api/invoices` - Listar todas
- `POST /api/invoices/upload` - Upload de fatura (multipart/form-data)

### Billing Records
- `GET /api/billing-records` - Listar todos
- `POST /api/billing-records` - Criar novo
- `PUT /api/billing-records/:id` - Atualizar

### Performance
- `GET /api/performance-records` - Listar registros
- `POST /api/performance-records` - Criar registro

### Dashboard
- `GET /api/dashboard/stats` - Estatísticas gerais

### Email
- `GET /api/email-history` - Histórico de emails
- `POST /api/email-history` - Registrar envio

## 🎨 Componentes UI Principais

### Cards de Estatísticas
```tsx
<StatCard
  title="Total de Consumidores"
  value={156}
  icon={Users}
/>
```

### Tabelas
```tsx
<Table>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>
```

### Upload Zone
```tsx
<InvoiceUploadZone />
```

## 🔐 Segurança

- Sistema de autenticação preparado (atualmente com user ID simulado)
- Validação de dados com Zod
- Proteção contra uploads duplicados (SHA-256)
- Limite de tamanho de arquivo (5MB)

## 📦 Scripts Disponíveis

```bash
npm run dev        # Desenvolvimento
npm run build      # Build para produção
npm start          # Servidor produção
npm run check      # Type checking
npm run db:push    # Sincronizar schema do DB
```

## 🌐 Deploy no Replit

1. Configure a variável `DATABASE_URL` nos Secrets
2. O Replit provisiona automaticamente um banco PostgreSQL via Neon
3. Execute `npm run db:push` para criar as tabelas
4. O app inicia automaticamente com `npm run dev`

## 📝 Próximas Melhorias

- [ ] Implementar autenticação real com JWT
- [ ] Adicionar exportação de relatórios (Excel/PDF)
- [ ] Integração completa com OpenAI para extração de dados de faturas
- [ ] Sistema de rateios com validação de 100%
- [ ] Templates customizáveis de email
- [ ] Dashboard com gráficos de performance
- [ ] Notificações em tempo real
- [ ] API de webhooks para integrações

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 👨‍💻 Desenvolvido com

- ❤️ Paixão por energia limpa
- ⚡ Tecnologias modernas
- 🌍 Foco em sustentabilidade

---

**Pró Energia** - Transformando energia solar em gestão eficiente 🌞

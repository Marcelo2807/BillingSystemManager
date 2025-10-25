# 🚀 Guia de Setup no Replit

Este guia mostra como configurar e executar o sistema PRO ENERGIA no Replit.

## 📋 Passo a Passo

### 1. Provisionar Banco de Dados PostgreSQL

O Replit oferece integração automática com Neon PostgreSQL:

1. Clique no ícone de **Database** na barra lateral esquerda do Replit
2. Clique em **Create PostgreSQL database**
3. O Replit criará automaticamente:
   - Um banco PostgreSQL hospedado no Neon
   - A variável `DATABASE_URL` nos Secrets

### 2. Verificar Variável de Ambiente

1. Vá em **Tools > Secrets** na barra lateral
2. Confirme que a variável `DATABASE_URL` foi criada automaticamente
3. O formato será algo como: `postgresql://user:password@host.neon.tech/database?sslmode=require`

### 3. Instalar Dependências

No terminal do Replit, execute:

```bash
npm install
```

### 4. Criar Tabelas no Banco de Dados

Execute o comando para sincronizar o schema:

```bash
npm run db:push
```

Este comando irá:
- Ler o schema definido em `shared/schema.ts`
- Criar todas as 10 tabelas necessárias no PostgreSQL
- Configurar as relações e constraints

### 5. Iniciar o Servidor

```bash
npm run dev
```

O servidor iniciará automaticamente e o Replit abrirá uma janela de preview com o app rodando.

## 🔧 Configurações Opcionais

### OpenAI API (para processamento de documentos com IA)

Se quiser usar a funcionalidade de extração de dados de faturas com IA:

1. Obtenha uma API key em: https://platform.openai.com/api-keys
2. Vá em **Tools > Secrets**
3. Adicione uma nova secret:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** `sk-...` (sua chave)

## 📁 Estrutura de Armazenamento

O sistema cria automaticamente a pasta `storage/invoices/` para armazenar os arquivos de faturas enviados. No Replit:

- Os arquivos são armazenados no filesystem do container
- Persistem enquanto o Repl estiver ativo
- Para persistência permanente, considere usar Replit Storage ou AWS S3

## 🎯 Acessando o Sistema

Após iniciar, você pode acessar:

- **Frontend:** Através da janela de preview do Replit
- **API:** `https://[your-repl-name].[your-username].repl.co/api/`

## 🐛 Troubleshooting

### Erro: "DATABASE_URL must be set"

**Solução:** Certifique-se de que criou o banco PostgreSQL na aba Database do Replit.

### Erro ao fazer db:push

**Solução:**
1. Verifique se a variável `DATABASE_URL` existe em Secrets
2. Confirme que o banco foi provisionado corretamente
3. Tente novamente após alguns segundos

### Porta já em uso

**Solução:** O Replit gerencia automaticamente as portas. Reinicie o Repl se necessário.

### Upload de arquivos não funciona

**Solução:**
1. Verifique se a pasta `storage/invoices` foi criada
2. Confirme que o arquivo tem menos de 5MB
3. Verifique o formato (PDF, PNG, JPG, WEBP)

## 📊 Testando o Sistema

### Criar Dados de Teste

1. **Criar um consumidor:**
   - Vá em Cadastros > Consumidores
   - Clique em "Novo Consumidor"
   - Preencha os dados

2. **Criar uma usina:**
   - Vá em Cadastros > Usinas
   - Clique em "Nova Usina"
   - Preencha nome, CNPJ e localização

3. **Criar unidades:**
   - Vá em Cadastros > Unidades
   - Clique em "Nova Unidade"
   - Associe ao consumidor e usina criados

4. **Upload de fatura:**
   - Vá em Faturamento > Upload de Faturas
   - Arraste um arquivo PDF de teste
   - Clique em "Enviar"

## 🔐 Segurança

### Ambiente de Produção

Se for usar em produção:

1. **Habilite autenticação:**
   - Implemente JWT ou outra estratégia
   - Remova o user ID simulado em `server/routes.ts`

2. **Configure CORS adequadamente**

3. **Use HTTPS:**
   - O Replit fornece HTTPS automaticamente

4. **Proteja Secrets:**
   - Nunca exponha suas API keys
   - Use sempre a aba Secrets do Replit

## 🚀 Performance

### Otimizações no Replit

- O Replit usa containers compartilhados
- Para melhor performance, considere upgrade para Replit Pro
- Cache do React Query já está configurado para reduzir chamadas à API

## 📝 Comandos Úteis

```bash
# Ver logs do servidor
npm run dev

# Type checking
npm run check

# Build para produção
npm run build

# Iniciar em produção
npm start
```

## 🆘 Suporte

Se encontrar problemas:

1. Verifique o console do navegador para erros frontend
2. Verifique o terminal do Replit para erros backend
3. Confirme que todas as dependências foram instaladas
4. Reinicie o Repl se necessário

## 🎉 Pronto!

Seu sistema PRO ENERGIA está rodando! Explore as funcionalidades:

- ✅ Dashboard com estatísticas
- ✅ Gestão completa de consumidores
- ✅ Controle de unidades e usinas
- ✅ Upload de faturas
- ✅ Sistema de performance

---

**Desenvolvido com ❤️ para energia solar sustentável**

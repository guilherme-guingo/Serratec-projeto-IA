# 📄 Serratec Projeto IA — Leitor de Notas Fiscais com OCR

Sistema web de auditoria inteligente de notas fiscais, desenvolvido com **React + Vite**. O usuário faz upload de uma imagem de nota fiscal, que é enviada para um fluxo de automação no **n8n**. O n8n utiliza IA (Gemini) para extrair os dados via OCR e retorna um JSON estruturado. Os dados são exibidos na interface e podem ser exportados em **CSV**. O banco de dados **Supabase (PostgreSQL)** é utilizado para persistir as notas e seus itens.

---

## 🧰 Tecnologias Utilizadas

| Tecnologia       | Função                                         |
| ---------------- | ---------------------------------------------- |
| React 19         | Biblioteca para construção da interface         |
| Vite 8           | Bundler e servidor de desenvolvimento           |
| TypeScript       | Tipagem estática nos serviços e componentes     |
| n8n              | Automação do fluxo de OCR com IA (Gemini)       |
| Supabase         | Banco de dados PostgreSQL na nuvem              |
| react-csv        | Exportação dos resultados em formato CSV        |

---

## 📁 Estrutura de Pastas

```
Serratec-projeto-IA/
├── public/
├── src/
│   ├── components/
│   │   └── CardResultado/
│   │       ├── CardResultado.tsx   # Componente de exibição dos dados da nota
│   │       └── Card.css
│   ├── contexts/
│   │   └── OcrContext.tsx          # Context API — gerencia estado global do OCR
│   ├── data/
│   │   └── mock.json              # Dados fictícios para fallback
│   ├── pages/
│   │   ├── Upload.tsx              # Página de upload de imagem
│   │   ├── Upload.css
│   │   ├── Resultado.tsx           # Página de exibição dos resultados + exportação CSV
│   │   └── Resultado.css
│   ├── service/
│   │   └── ocrService.ts          # Serviço que envia a imagem ao n8n via webhook
│   ├── types/
│   │   └── ocrTypes.ts            # Interfaces TypeScript (NotaFiscalData, ItemNota)
│   ├── App.jsx                    # Componente raiz — controle de navegação
│   ├── main.jsx                   # Ponto de entrada — renderiza App dentro do OcrProvider
│   └── index.css                  # Estilos globais
├── .env                           # Variável de ambiente do webhook n8n
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Pré-requisitos

- **Node.js** v18 ou superior
- **npm** v9 ou superior
- **n8n** instalado e rodando localmente (ou em servidor)
- Conta no **Supabase** (plano gratuito é suficiente)

---

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/guilherme-guingo/Serratec-projeto-IA.git
cd Serratec-projeto-IA
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a variável de ambiente

Crie um arquivo `.env` na raiz do projeto (se ainda não existir) com o seguinte conteúdo:

```env
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/SEU-WEBHOOK-ID-AQUI
```

> ⚠️ Substitua `SEU-WEBHOOK-ID-AQUI` pelo ID real do seu webhook no n8n.

### 4. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:5173**

---

## 🔄 Configuração do n8n

O **n8n** é o orquestrador do fluxo de OCR. Ele recebe a imagem, envia para a IA (Gemini) e retorna os dados extraídos.

### Instalação do n8n

```bash
npm install -g n8n
```

### Iniciar o n8n

```bash
n8n start
```

Acesse o painel em: **http://localhost:5678**

### Fluxo esperado no n8n

1. **Webhook (Trigger)** — Recebe a imagem via `POST` com `FormData`
2. **Nó de IA (Gemini)** — Processa a imagem e extrai os dados da nota fiscal
3. **Respond to Webhook** — Retorna o JSON estruturado para o front-end

O JSON retornado pela IA deve seguir o formato abaixo:

```json
{
  "empresa": "Nome da Empresa Ltda",
  "cnpj": "12345678000199",
  "data": "2026-06-28",
  "itens": [
    { "nome": "Produto A", "quantidade": 2, "preco": 120.00 },
    { "nome": "Produto B", "quantidade": 1, "preco": 65.90 }
  ],
  "valor_total": 305.90
}
```

---

## 🗄️ Configuração do Supabase

O **Supabase** é utilizado como banco de dados PostgreSQL para persistir as notas fiscais processadas.

### 1. Crie um projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com) e faça login
2. Clique em **"New Project"**
3. Preencha o nome do projeto, defina uma senha para o banco e selecione a região
4. Aguarde a criação do projeto

### 2. Execute o script SQL

No painel do Supabase, vá em **SQL Editor** (ícone no menu lateral esquerdo) e execute o seguinte script:

```sql
CREATE TABLE notas_fiscais (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  empresa TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  data DATE NOT NULL,
  valor_total NUMERIC(10, 2) NOT NULL,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE itens_nota (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nota_id UUID REFERENCES notas_fiscais(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  quantidade NUMERIC(10, 2) NOT NULL,
  preco NUMERIC(10, 2) NOT NULL
);
```

### 3. Estrutura das tabelas

#### Tabela `notas_fiscais`

| Coluna       | Tipo                       | Descrição                           |
| ------------ | -------------------------- | ----------------------------------- |
| `id`         | UUID (PK, auto)            | Identificador único da nota         |
| `empresa`    | TEXT                       | Nome da empresa emissora            |
| `cnpj`       | TEXT                       | CNPJ da empresa                     |
| `data`       | DATE                       | Data de emissão da nota             |
| `valor_total`| NUMERIC(10,2)              | Valor total da nota fiscal          |
| `criado_em`  | TIMESTAMP WITH TIME ZONE   | Data/hora de inserção no banco      |

#### Tabela `itens_nota`

| Coluna       | Tipo                       | Descrição                           |
| ------------ | -------------------------- | ----------------------------------- |
| `id`         | UUID (PK, auto)            | Identificador único do item         |
| `nota_id`    | UUID (FK → notas_fiscais)  | Referência à nota fiscal pai        |
| `nome`       | TEXT                       | Nome do produto/serviço             |
| `quantidade` | NUMERIC(10,2)              | Quantidade do item                  |
| `preco`      | NUMERIC(10,2)              | Preço unitário do item              |

> A relação entre as tabelas é **1:N** — uma nota fiscal possui vários itens. Se uma nota for deletada, seus itens são removidos automaticamente (`ON DELETE CASCADE`).

### 4. Obtenha as credenciais do Supabase

No painel do Supabase, vá em **Project Settings → API** e copie:

- **Project URL** — ex: `https://xyzcompany.supabase.co`
- **anon (public) key** — chave pública para acesso ao banco

Essas credenciais são usadas no **n8n** para conectar o fluxo ao banco de dados.

### 5. Conectar o Supabase ao n8n

No seu fluxo do n8n:

1. Adicione um nó **Supabase** após o processamento da IA
2. Configure as credenciais com a **Project URL** e a **API Key** obtidas no passo anterior
3. Configure o nó para inserir os dados na tabela `notas_fiscais` e, em seguida, na tabela `itens_nota` usando o `id` retornado da primeira inserção

---

## 📤 Exportação CSV

Na página de resultados, clique no botão **"Exportar para CSV"** para baixar os dados extraídos. O arquivo gerado contém as colunas:

| Coluna              | Descrição                 |
| ------------------- | ------------------------- |
| Empresa             | Nome da empresa           |
| CNPJ                | CNPJ da empresa           |
| Data                | Data da nota fiscal       |
| Produto             | Nome do produto           |
| Quantidade          | Quantidade do item        |
| Preço Unitário      | Preço unitário do item    |
| Valor Total da Nota | Valor total da nota       |

---

## 🧪 Scripts Disponíveis

| Comando            | Descrição                              |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Inicia o servidor de desenvolvimento   |
| `npm run build`    | Gera o build de produção               |
| `npm run preview`  | Pré-visualiza o build de produção      |
| `npm run lint`     | Executa o ESLint no projeto            |

---

## 👥 Equipe

Projeto desenvolvido pelo grupo da turma **Serratec** — disciplina de Inteligência Artificial.

| Nome                | GitHub                                              |
| ------------------- | --------------------------------------------------- |
|  Leilton Braga |  https://github.com/LeiltonBraga  |
| Pedro Augusto B. Dayer  |  https://github.com/PedroDayer  |
| Yuri Martins  |  https://github.com/Y-M-dev  |
| Guilherme Fernandes Guingo  |  https://github.com/guilherme-guingo  |
| Anna Júlia A. Leite  |  https://github.com/Annajleite  |

---

## 📝 Licença

Projeto acadêmico — uso educacional.

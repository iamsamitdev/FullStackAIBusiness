## Full Stack AI Business - Day 4

### Download Training Document

[Click here to download the training document](https://bit.ly/fullstack-ai-business)

1. [Section 1: Cloning the Repository and Setting Up](#section-1-cloning-the-repository-and-setting-up)
    - การโคลนโปรเจคจาก GitHub
    - การติดตั้ง dependencies และการตั้งค่า environment variables
    - Workshop: รันโปรเจคและตรวจสอบว่า API ทำงานได้หรือไม่

2. [Section 2: Vector Database Fundamentals](#section-2-vector-database-fundamentals)
    - ความเข้าใจเรื่อง Embeddings และ Vector Store
    - การตั้งค่า Neon Serverless Postgres pgVector เพื่อเก็บข้อมูล
    - Workshop: เตรียมฐานข้อมูล Vector
3. [Section 3: Data Ingestion (การนำเข้าข้อมูล)](#section-3-data-ingestion-การนำเข้าข้อมูล)
    - เทคนิคการแปลงไฟล์เอกสารภายใน (PDF, Docx, Text) ให้เป็น Embeddings
    - ในการทำ Document Loader และ Text Splitter
    - Workshop: เขียน Script นำข้อมูลองค์กรเข้าสู่ Vector Database
4. [Section 4: Building the Chatbot API (RAG Logic)](#section-4-building-the-chatbot-api-rag-logic)
    - การตั้งค่า OpenAI API Key และการใช้งาน LLM
    - การดึงข้อมูลจาก Vector Database มาใช้ในการตอบคำถาม
    - การสร้าง API Endpoint สำหรับ Chatbot
    - Workshop: สร้าง Chatbot API ที่ตอบคำถามจากเอกสารองค์กร
5. [Section 5: Frontend Integration (Next.js)](#section-5-frontend-integration-nextjs)
    - การสร้างหน้า Chatbot ใน Next.js
    - การเชื่อมต่อ Frontend กับ Chatbot API
    - การปรับปรุง UX/UI ให้เหมาะสมกับการใช้งาน
    - Workshop: สร้างหน้า Chatbot และทดสอบการใช้งาน
6. [Section 6: LINE Messaging API Setup](#section-6-line-messaging-api-setup)
    - การสร้าง Provider และ Channel ใน LINE Developers Console
    - การตั้งค่า Webhook URL ให้ชี้มาที่ Next.js API
    - ความปลอดภัยในการตรวจสอบ Signature ของ LINE
7. [Section 7: Integrating Chatbot with LINE](#section-7-integrating-chatbot-with-line)
    - การรับข้อความจากผู้ใช้ผ่าน LINE Messaging API
    - การส่งข้อความตอบกลับจาก Chatbot API
    - Workshop: เชื่อมต่อ Chatbot กับ LINE และทดสอบการใช้งาน
8. [Section 8: N8N with Line Messaging API](#section-8-n8n-with-line-messaging-api)
    - การตั้งค่า N8N เพื่อเชื่อมต่อกับ LINE Messaging API
    - การสร้าง Workflow ใน N8N เพื่อจัดการข้อความจาก LINE
    - Workshop: สร้าง Workflow ใน N8N เพื่อรับและส่งข้อความผ่าน LINE
9. [Section 9: Deployment and Testing](#section-9-deployment-and-testing)
    - การเตรียมโปรเจคสำหรับการดีพลอย
    - การดีพลอยไปยัง Vercel หรือแพลตฟอร์มอื่นๆ
    - การทดสอบการทำงานของ Chatbot บน LINE อย่างเต็มรูปแบบ
    - Workshop: ดีพลอยโปรเจคและทดสอบการใช้งานจริง

---
### Section 1: Cloning the Repository and Setting Up

#### 1.1 โคลนโปรเจคจาก GitHub
```bash
git clone https://github.com/iamsamitdev/FullStackAIBusiness
cd FullStackAIBusiness/landingpage
```

#### 1.2 ติดตั้ง Dependencies:

```bash
npm install
```

#### 1.3 ตั้งค่า Environment Variables
สร้างไฟล์ `.env` และเพิ่ม:
```env
# Connection String ของฐานข้อมูล PostgreSQL
# DATABASE_URI="postgresql://postgres:123456@localhost:5432/blog_db"

# Recommended for most uses
DATABASE_URI=postgresql://username:password@hostname:port/neondb?sslmode=verify-full

# สร้างรหัสอะไรก็ได้ยาวๆ สำหรับความปลอดภัย
PAYLOAD_SECRET=my_super_secret_key

# Vercel Blob Storage Tokens
BLOB_READ_WRITE_TOKEN="your_blob_read_write_token_here"

# Facebook Marketing
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_facebook_pixel_id_here
FB_ACCESS_TOKEN=your_facebook_access_token_here
```

#### 1.4 รันโปรเจค:
```bash
npm run dev
```
ทดสอบว่าโปรเจคทำงานได้ที่ `http://localhost:3000`

---

### Section 2: Vector Database Fundamentals

#### 2.1 ความเข้าใจเรื่อง Embeddings และ Vector Store

**Embeddings คืออะไร?**
- Embeddings คือการแปลงข้อความให้เป็นตัวเลข (Vector) ที่สามารถเปรียบเทียบความคล้ายคลึงกันได้
- ใช้ในการค้นหาข้อมูลที่มีความหมายใกล้เคียงกัน (Semantic Search)
- OpenAI ใช้โมเดล `text-embedding-3-small` หรือ `text-embedding-3-large`

**Vector Store คืออะไร?**
- ฐานข้อมูลที่ออกแบบมาเพื่อเก็บและค้นหา Vector
- รองรับการค้นหาแบบ Similarity Search
- ตัวอย่าง: Neon Serverless Postgres (pgVector), Pinecone, Weaviate, Chroma

**RAG (Retrieval-Augmented Generation) คืออะไร?**
```
User Question → Embedding → Vector Search → Relevant Documents → LLM → Answer
```
1. รับคำถามจากผู้ใช้
2. แปลงคำถามเป็น Embedding
3. ค้นหาเอกสารที่เกี่ยวข้องจาก Vector Database
4. ส่งเอกสารที่เกี่ยวข้องพร้อมคำถามให้ LLM
5. LLM สร้างคำตอบจากข้อมูลที่ได้

#### 2.2 การตั้งค่า Neon Serverless Postgres pgVector

> **ทำไมต้อง Neon?**
> - โปรเจคปัจจุบันใช้ Neon อยู่แล้วสำหรับ Payload CMS (`@payloadcms/db-postgres` → `DATABASE_URL`)
> - Neon เป็น Serverless Postgres ที่รองรับ pgVector Extension ในตัว
> - ทำงานร่วมกับ Vercel ได้อย่างดีเยี่ยม (Vercel Integration)
> - รองรับ Serverless / Edge Function ได้โดยตรงผ่าน `@neondatabase/serverless`
> - มี Free Tier ที่เพียงพอสำหรับเริ่มต้น
> - เราจะใช้ Neon Database เดียวกันสำหรับทั้ง Payload CMS และ Vector Store

**ตรวจสอบโปรเจคปัจจุบัน:**

ก่อนเริ่ม ให้ตรวจสอบว่าโปรเจค `landingpage` ที่มีอยู่มีโครงสร้างดังนี้:

```
landingpage/
├── app/
│   ├── (landing)/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx          ← หน้า Landing Page หลัก
│   └── (payload)/
│       └── ...                ← Payload CMS Admin
├── components/
│   ├── facebook/              ← Facebook Pixel components
│   ├── landing/               ← Landing page components (Navbar, Hero, etc.)
│   └── ui/                    ← UI components (button, calendar)
├── lib/
│   ├── fpixel.ts              ← Facebook Pixel utility
│   └── utils.ts               ← Utility functions
├── collections/               ← Payload CMS collections
├── payload.config.ts          ← Payload CMS config (ใช้ postgresAdapter กับ DATABASE_URL)
├── package.json
└── .env.local
```

**สิ่งที่จะเพิ่มในบทนี้:**
```
landingpage/
├── app/
│   ├── (landing)/
│   │   └── page.tsx          ← แก้ไข: เพิ่ม ChatWidget
│   └── api/
│       └── chat/
│           └── route.ts      ← ใหม่: Chat API endpoint
├── components/
│   └── chat/
│       └── ChatWidget.tsx    ← ใหม่: Chat widget component
├── lib/
│   ├── neon.ts               ← ใหม่: Neon database client
│   └── rag.ts                ← ใหม่: RAG service
├── scripts/
│   ├── ingest.ts             ← ใหม่: Document ingestion script
│   └── setup-neon.sql        ← ใหม่: SQL setup สำหรับ pgVector
├── documents/                 ← ใหม่: โฟลเดอร์เก็บเอกสาร PDF/TXT
└── package.json              ← แก้ไข: เพิ่ม dependencies
```

**Step 1: ติดตั้ง Dependencies ที่จำเป็น**

เปิด Terminal ที่โฟลเดอร์ `landingpage` แล้วรันคำสั่ง:
```bash
npm install @neondatabase/serverless @langchain/community @langchain/core @langchain/openai @langchain/textsplitters dotenv pdf-parse
```

> **หมายเหตุ:** แต่ละ package มีหน้าที่ดังนี้:
> - `@neondatabase/serverless` — Neon Postgres driver สำหรับ Serverless/Edge
> - `@langchain/community` — Document Loaders (PDFLoader, etc.)
> - `@langchain/core` — LangChain core (Document class, etc.)
> - `@langchain/openai` — OpenAI Embeddings & Chat models
> - `@langchain/textsplitters` — Text splitting สำหรับแบ่งเอกสาร
> - `dotenv` — โหลด `.env` ไฟล์ใน script
> - `pdf-parse` — อ่านไฟล์ PDF

**Step 2: เพิ่ม ingest script ใน `package.json`**

เปิดไฟล์ `package.json` แล้วเพิ่ม script `"ingest"`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "ingest": "npx tsx scripts/ingest.ts"
  }
}
```

**Step 3: ตั้งค่า Environment Variables**

เปิดไฟล์ `.env.local` (หรือ `.env`) แล้วเพิ่ม:
```env
# Neon Serverless Postgres (ตัวนี้มีอยู่แล้วจาก Payload CMS)
DATABASE_URL=postgresql://neondb_owner:xxxx@ep-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# OpenAI (เพิ่มใหม่)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
```

> **Tip:** `DATABASE_URL` มีอยู่แล้วในโปรเจค (Payload CMS ใช้อยู่) — ไม่ต้องสร้าง Database ใหม่ เราจะใช้ Database เดียวกัน เพียงแค่เพิ่มตาราง `documents` สำหรับเก็บ Vector

**Step 4: Enable pgVector Extension และสร้างตาราง**

สร้างไฟล์ `scripts/setup-neon.sql`:
```sql
-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create a table for documents
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding VECTOR(1536) -- สำหรับ OpenAI text-embedding-3-small
);

-- Create an index for faster similarity search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create a function for similarity search
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
$$;
```

**รัน SQL นี้:**
1. ไปที่ **Neon Console** → SQL Editor (https://console.neon.tech)
2. เลือก Database ที่ใช้อยู่ (เดียวกับ Payload CMS)
3. วาง SQL จากไฟล์ `scripts/setup-neon.sql` แล้วกด Run

> **หรือ** ถ้าใช้ Vercel → Storage → Data → Query ก็ทำได้เช่นกัน

#### 2.3 สร้าง Neon Database Client

สร้างไฟล์ `lib/neon.ts`:
```ts
import { neon } from "@neondatabase/serverless"

// สร้าง Neon SQL Client
// ใช้ tagged template literal สำหรับ query (ป้องกัน SQL Injection อัตโนมัติ)
export const sql = neon(process.env.DATABASE_URL!)
```

> **ข้อดีของ `@neondatabase/serverless`:**
> - ใช้ HTTP-based connection ที่เหมาะกับ Serverless / Edge Runtime
> - ไม่ต้องจัดการ Connection Pool เอง
> - รองรับ Tagged Template สำหรับเขียน SQL แบบ Parameterized ได้สะดวก
> - เบา เฉพาะ Postgres driver ไม่มี overhead จาก SDK อื่น

---

### Section 3: Data Ingestion (การนำเข้าข้อมูล)

#### 3.1 เทคนิคการแปลงไฟล์เอกสาร

**Document Loaders ที่ใช้:**
- `PDFLoader` — สำหรับไฟล์ PDF (ต้องติดตั้ง `pdf-parse`)
- `TextLoader` — สำหรับไฟล์ Text
- `DocxLoader` — สำหรับไฟล์ Word

**Text Splitter:**
- แบ่งเอกสารขนาดใหญ่เป็นชิ้นเล็กๆ (Chunks)
- `chunkSize: 1000` — ขนาดของแต่ละ chunk (ตัวอักษร)
- `chunkOverlap: 200` — ส่วนทับซ้อนระหว่าง chunk เพื่อไม่ให้ข้อมูลขาดหาย

**กระบวนการ:**
```
PDF/TXT Files → Document Loader → Text Splitter → Chunks → OpenAI Embeddings → Neon Postgres (pgVector)
```

#### 3.2 สร้าง Script นำเข้าข้อมูล

สร้างไฟล์ `scripts/ingest.ts`:
```ts
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { OpenAIEmbeddings } from "@langchain/openai"
import { Document } from "@langchain/core/documents"
import { neon } from "@neondatabase/serverless"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

// โหลด environment variables
dotenv.config({ path: ".env.local" })
dotenv.config({ path: ".env" })

// ตรวจสอบ environment variables
const databaseUrl = process.env.DATABASE_URL
const openaiApiKey = process.env.OPENAI_API_KEY

if (!databaseUrl) {
  console.error("❌ Missing DATABASE_URL in environment variables")
  process.exit(1)
}

if (!openaiApiKey) {
  console.error("❌ Missing OPENAI_API_KEY in environment variables")
  process.exit(1)
}

// สร้าง Neon SQL Client
const sql = neon(databaseUrl)

const DOCUMENTS_PATH = "./documents" // โฟลเดอร์เก็บเอกสาร

async function ingestDocuments() {
  console.log("🚀 Starting document ingestion...")
  console.log(`📂 Looking for documents in: ${path.resolve(DOCUMENTS_PATH)}`)

  // ตรวจสอบว่ามีโฟลเดอร์ documents หรือไม่
  if (!fs.existsSync(DOCUMENTS_PATH)) {
    fs.mkdirSync(DOCUMENTS_PATH, { recursive: true })
    console.log("📁 Created documents folder. Please add PDF or TXT files and run again.")
    return
  }

  // 1. อ่านไฟล์ทั้งหมดในโฟลเดอร์
  const files = fs.readdirSync(DOCUMENTS_PATH)
  const pdfFiles = files.filter(f => f.endsWith(".pdf"))
  const txtFiles = files.filter(f => f.endsWith(".txt"))
  
  if (pdfFiles.length === 0 && txtFiles.length === 0) {
    console.log("⚠️ No PDF or TXT files found in documents folder.")
    return
  }

  console.log(`📚 Found ${pdfFiles.length} PDF files and ${txtFiles.length} TXT files`)

  const allDocs: Document[] = []

  // โหลด PDF files
  for (const file of pdfFiles) {
    const filePath = path.join(DOCUMENTS_PATH, file)
    console.log(`📄 Loading PDF: ${file}`)
    
    try {
      const loader = new PDFLoader(filePath)
      const docs = await loader.load()
      
      docs.forEach(doc => {
        doc.metadata = { ...doc.metadata, source: file, type: "pdf" }
      })
      
      allDocs.push(...docs)
      console.log(`   ✅ Loaded ${docs.length} pages from ${file}`)
    } catch (error) {
      console.error(`   ❌ Error loading ${file}:`, error)
    }
  }

  // โหลด TXT files
  for (const file of txtFiles) {
    const filePath = path.join(DOCUMENTS_PATH, file)
    console.log(`📄 Loading TXT: ${file}`)
    
    try {
      const content = fs.readFileSync(filePath, "utf-8")
      const doc = new Document({
        pageContent: content,
        metadata: { source: file, type: "txt" },
      })
      allDocs.push(doc)
      console.log(`   ✅ Loaded ${file}`)
    } catch (error) {
      console.error(`   ❌ Error loading ${file}:`, error)
    }
  }

  if (allDocs.length === 0) {
    console.log("❌ No documents could be loaded.")
    return
  }

  console.log(`\n📚 Total documents loaded: ${allDocs.length}`)

  // 2. แบ่งเอกสารเป็น Chunks
  console.log("\n✂️ Splitting documents into chunks...")
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })

  const splitDocs = await textSplitter.splitDocuments(allDocs)
  console.log(`✅ Created ${splitDocs.length} chunks`)

  // 3. สร้าง Embeddings
  console.log("\n🔄 Creating embeddings...")
  const embeddingsModel = new OpenAIEmbeddings({
    modelName: "text-embedding-3-small",
    openAIApiKey: openaiApiKey,
  })

  // 4. ลบข้อมูลเก่าออกก่อน (optional)
  console.log("🗑️ Clearing existing documents...")
  await sql`DELETE FROM documents WHERE id > 0`

  // 5. บันทึกลง Neon Postgres
  console.log("\n💾 Saving to Neon Postgres...")
  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < splitDocs.length; i++) {
    const doc = splitDocs[i]
    
    try {
      // สร้าง embedding สำหรับ chunk นี้
      const embedding = await embeddingsModel.embedQuery(doc.pageContent)

      // แปลง embedding array เป็น pgvector format string: [0.1,0.2,0.3,...]
      const embeddingString = `[${embedding.join(",")}]`

      // บันทึกลง database ผ่าน Neon SQL
      await sql`
        INSERT INTO documents (content, metadata, embedding)
        VALUES (${doc.pageContent}, ${JSON.stringify(doc.metadata)}, ${embeddingString}::vector)
      `
      
      successCount++
      
      // แสดง progress ทุก 10 chunks
      if ((i + 1) % 10 === 0 || i === splitDocs.length - 1) {
        const progress = Math.round(((i + 1) / splitDocs.length) * 100)
        console.log(`   📊 Progress: ${i + 1}/${splitDocs.length} (${progress}%)`)
      }
    } catch (error) {
      console.error(`❌ Error saving chunk ${i + 1}:`, error)
      errorCount++
    }
  }

  console.log("\n" + "=".repeat(50))
  console.log("🎉 Document ingestion completed!")
  console.log(`✅ Successfully saved: ${successCount} chunks`)
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} chunks`)
  }
  console.log("=".repeat(50))
}

ingestDocuments().catch(error => {
  console.error("❌ Fatal error:", error)
  process.exit(1)
})
```

#### 3.3 เตรียมเอกสารและรัน Ingestion

**สร้างโฟลเดอร์เก็บเอกสาร:**
```bash
mkdir documents
```

**เพิ่มไฟล์เอกสาร:**
- วาง PDF หรือ TXT ที่ต้องการลงในโฟลเดอร์ `documents/`
- เช่น ข้อมูลสินค้า, FAQ, คู่มือการใช้งาน, นโยบายบริษัท ฯลฯ

**รัน Script:**
```bash
npm run ingest
```

**ผลลัพธ์ที่คาดหวัง:**
```
🚀 Starting document ingestion...
📂 Looking for documents in: C:\...\landingpage\documents
📚 Found 1 PDF files and 0 TXT files
📄 Loading PDF: product-catalog.pdf
   ✅ Loaded 5 pages from product-catalog.pdf

📚 Total documents loaded: 5

✂️ Splitting documents into chunks...
✅ Created 23 chunks

🔄 Creating embeddings...
🗑️ Clearing existing documents...

💾 Saving to Neon Postgres...
   📊 Progress: 10/23 (43%)
   📊 Progress: 20/23 (87%)
   📊 Progress: 23/23 (100%)

==================================================
🎉 Document ingestion completed!
✅ Successfully saved: 23 chunks
==================================================
```

---

### Section 4: Building the Chatbot API (RAG Logic)

#### 4.1 สร้าง RAG Service

สร้างไฟล์ `lib/rag.ts`:
```ts
import { OpenAIEmbeddings } from "@langchain/openai"
import { ChatOpenAI } from "@langchain/openai"
import { sql } from "./neon"

// สร้าง Embeddings Model
const embeddings = new OpenAIEmbeddings({
  modelName: "text-embedding-3-small",
})

// สร้าง LLM Model
const llm = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0.7,
})

// Interface สำหรับ Document ที่ค้นหาได้
interface MatchedDocument {
  id: number
  content: string
  metadata: Record<string, unknown>
  similarity: number
}

/**
 * ค้นหาเอกสารที่เกี่ยวข้องจาก Vector Database (Neon Postgres)
 */
export async function searchDocuments(
  query: string, 
  matchCount = 5,
  matchThreshold = 0.2
): Promise<MatchedDocument[]> {
  try {
    // 1. สร้าง Embedding จากคำถาม
    const queryEmbedding = await embeddings.embedQuery(query)
    console.log("Query:", query)
    console.log("Embedding length:", queryEmbedding.length)

    // 2. แปลง embedding เป็น pgvector format
    const embeddingString = `[${queryEmbedding.join(",")}]`

    // 3. ค้นหาเอกสารที่เกี่ยวข้องผ่าน SQL (ใช้ pgvector cosine distance)
    const documents = await sql`
      SELECT 
        id, 
        content, 
        metadata,
        1 - (embedding <=> ${embeddingString}::vector) AS similarity
      FROM documents
      WHERE 1 - (embedding <=> ${embeddingString}::vector) > ${matchThreshold}
      ORDER BY embedding <=> ${embeddingString}::vector
      LIMIT ${matchCount}
    `

    console.log("Search results:", documents.length, "documents found")
    return documents as MatchedDocument[]
  } catch (error) {
    console.error("Error in searchDocuments:", error)
    return []
  }
}

/**
 * สร้างคำตอบจาก LLM โดยใช้ข้อมูลจาก Context
 */
export async function generateAnswer(
  question: string,
  context: string,
  chatHistory: { role: "user" | "assistant"; content: string }[] = []
): Promise<string> {
  const systemPrompt = `คุณเป็นผู้ช่วยตอบคำถามที่เป็นมิตรและช่วยเหลือลูกค้า 
ตอบคำถามโดยใช้ข้อมูลจากบริบทที่ให้มาเท่านั้น 
หากไม่มีข้อมูลเพียงพอในบริบท ให้บอกว่าไม่ทราบข้อมูลและแนะนำให้ติดต่อทีมงานโดยตรง
ตอบเป็นภาษาไทยเสมอ และใช้ภาษาที่สุภาพ เป็นกันเอง

บริบท:
${context}`

  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: systemPrompt },
    ...chatHistory.map(msg => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
    { role: "user", content: question },
  ]

  try {
    const response = await llm.invoke(messages)
    return response.content as string
  } catch (error) {
    console.error("Error generating answer:", error)
    throw new Error("ไม่สามารถสร้างคำตอบได้ กรุณาลองใหม่อีกครั้ง")
  }
}

/**
 * ฟังก์ชันหลักสำหรับ RAG - รับคำถามและส่งคืนคำตอบ
 */
export async function askQuestion(
  question: string,
  chatHistory: { role: "user" | "assistant"; content: string }[] = []
): Promise<{ answer: string; sources: MatchedDocument[] }> {
  // 1. ค้นหาเอกสารที่เกี่ยวข้อง
  const documents = await searchDocuments(question)

  // 2. สร้าง Context จากเอกสาร
  const context = documents.length > 0
    ? documents.map(doc => doc.content).join("\n\n---\n\n")
    : "ไม่พบข้อมูลที่เกี่ยวข้อง"

  // 3. สร้างคำตอบ
  const answer = await generateAnswer(question, context, chatHistory)

  return {
    answer,
    sources: documents,
  }
}
```

> **จุดสำคัญ:** ไฟล์นี้ import `sql` จาก `./neon` ที่เราสร้างไว้ใน Section 2.3 และใช้ SQL query ตรงไปที่ pgvector ใน Neon ได้เลย ไม่ต้องดึงข้อมูลทั้งหมดมาคำนวณใน JavaScript

#### 4.2 สร้าง API Endpoint สำหรับ Chatbot

สร้างไฟล์ `app/api/chat/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server"
import { askQuestion } from "@/lib/rag"

export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory = [] } = await request.json()

    // ตรวจสอบว่ามี message หรือไม่
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "กรุณาระบุข้อความที่ต้องการถาม" },
        { status: 400 }
      )
    }

    // ตรวจสอบ message length
    if (message.length > 2000) {
      return NextResponse.json(
        { error: "ข้อความยาวเกินไป (สูงสุด 2000 ตัวอักษร)" },
        { status: 400 }
      )
    }

    // เรียกใช้ RAG เพื่อตอบคำถาม
    const { answer, sources } = await askQuestion(message, chatHistory)

    return NextResponse.json({
      success: true,
      answer,
      sources: sources.map(s => ({
        content: s.content.substring(0, 200) + "...",
        similarity: s.similarity,
        metadata: s.metadata,
      })),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    
    const errorMessage = error instanceof Error ? error.message : "เกิดข้อผิดพลาด"
    
    return NextResponse.json(
      { 
        success: false,
        error: "ขออภัย เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่อีกครั้ง",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: "ok",
    message: "Chat API is running",
    timestamp: new Date().toISOString(),
  })
}
```

> **โครงสร้างโฟลเดอร์ที่สร้างใหม่:**
> ```
> app/
> └── api/
>     └── chat/
>         └── route.ts
> ```
> ไฟล์นี้อยู่ใน `app/` ระดับเดียวกับ `(landing)/` และ `(payload)/`

---

### Section 5: Frontend Integration (Next.js)

#### 5.1 สร้าง Chat Widget Component

สร้างไฟล์ `components/chat/ChatWidget.tsx`:
```tsx
"use client"

import { useState, useRef, useEffect, useCallback } from "react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "สวัสดีครับ! 👋 ผมเป็นผู้ช่วยตอบคำถาม มีอะไรให้ช่วยไหมครับ?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedInput = input.trim()
    if (!trimmedInput || isLoading) return

    // สร้าง user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedInput,
      timestamp: new Date(),
    }

    // เพิ่ม user message และล้าง input
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // เตรียม chat history (ไม่รวม welcome message)
      const chatHistory = messages
        .filter(m => m.id !== "welcome")
        .map(m => ({
          role: m.role,
          content: m.content,
        }))

      // เรียก API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedInput,
          chatHistory,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "เกิดข้อผิดพลาด")
      }

      // สร้าง assistant message
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.answer,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error("Chat error:", error)
      
      // สร้าง error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "ขออภัยครับ เกิดข้อผิดพลาดในการตอบกลับ กรุณาลองใหม่อีกครั้ง 🙏",
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <>
      {/* Chat Button - ปุ่มลอยมุมล่างขวา */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen 
            ? "bg-red-500 hover:bg-red-600" 
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          // Close Icon
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Chat Icon
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700">
          
          {/* Header */}
          <div className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-blue-100">ออนไลน์</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-800">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-md shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === "user" ? "text-blue-200" : "text-slate-400"
                  }`}>
                    {message.timestamp.toLocaleTimeString("th-TH", { 
                      hour: "2-digit", 
                      minute: "2-digit" 
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form 
            onSubmit={handleSubmit}
            className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="พิมพ์ข้อความ..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                aria-label="Send message"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
```

> **หมายเหตุ:** ChatWidget นี้ตรงกับ reference project โดยใช้ Inline SVG แทน icon library เพื่อไม่ต้องติดตั้ง dependency เพิ่ม

#### 5.2 เพิ่ม Chat Widget ในหน้าเว็บ

แก้ไขไฟล์ `app/(landing)/page.tsx`:

**ไฟล์เดิม:**
```tsx
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import About from '@/components/landing/About'
import Team from '@/components/landing/Team'
import Testimonial from '@/components/landing/Testimonial'
import Blog from '@/components/landing/Blog'
import CTA from '@/components/landing/CTA'
import ScrollToTop from '@/components/landing/ScrollToTop'

// ... metadata ...

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Team />
      <Testimonial />
      <Blog />
      <CTA />
      <Footer />
      <ScrollToTop />
    </div>
  )
}
```

**แก้ไขเป็น (เพิ่ม ChatWidget):**
```tsx
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import About from '@/components/landing/About'
import Team from '@/components/landing/Team'
import Testimonial from '@/components/landing/Testimonial'
import Blog from '@/components/landing/Blog'
import CTA from '@/components/landing/CTA'
import ScrollToTop from '@/components/landing/ScrollToTop'
import ChatWidget from '@/components/chat/ChatWidget'     // ← เพิ่มบรรทัดนี้

// ... metadata ...

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Team />
      <Testimonial />
      <Blog />
      <CTA />
      <Footer />
      <ScrollToTop />
      <ChatWidget />     {/* ← เพิ่มบรรทัดนี้ */}
    </div>
  )
}
```

> **สิ่งที่เปลี่ยน:**
> 1. เพิ่ม `import ChatWidget from '@/components/chat/ChatWidget'`
> 2. เพิ่ม `<ChatWidget />` ก่อนปิด `</div>` — จะแสดงปุ่ม Chat ลอยอยู่มุมล่างขวา

#### 5.3 ทดสอบ Chat Widget

1. รัน development server:
```bash
npm run dev
```

2. เปิดเว็บที่ `http://localhost:3000`
3. จะเห็นปุ่ม Chat (ไอคอนรูป Chat สีน้ำเงิน) อยู่มุมล่างขวา
4. คลิกเพื่อเปิด Chat Window
5. พิมพ์คำถามที่เกี่ยวข้องกับเอกสารที่ ingest ไป
6. Bot จะตอบกลับจากข้อมูลในเอกสาร

---

### Section 6: LINE Messaging API Setup

#### 6.1 สร้าง Provider และ Channel

**ขั้นตอนการสร้าง:**
1. ไปที่ https://developers.line.biz
2. Login ด้วย LINE Account
3. สร้าง Provider ใหม่
4. สร้าง Messaging API Channel
5. จดบันทึก Channel Secret และ Channel Access Token

#### 6.2 ตั้งค่า Environment Variables

ในไฟล์ `.env.local`:
```env
# LINE
LINE_CHANNEL_SECRET=your-channel-secret
LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token
```

#### 6.3 สร้าง LINE Utility Functions

สร้างไฟล์ `lib/line.ts`:
```ts
import crypto from "crypto"

const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET!
const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN!

// ตรวจสอบ Signature
export function verifySignature(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac("sha256", CHANNEL_SECRET)
    .update(body)
    .digest("base64")
  return hash === signature
}

// ส่งข้อความตอบกลับ
export async function replyMessage(replyToken: string, messages: any[]) {
  const response = await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken,
      messages,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("LINE API error:", error)
    throw new Error("Failed to send message")
  }

  return response.json()
}

// ส่งข้อความแบบ Push
export async function pushMessage(userId: string, messages: any[]) {
  const response = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      to: userId,
      messages,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("LINE API error:", error)
    throw new Error("Failed to push message")
  }

  return response.json()
}
```

---

### Section 7: Integrating Chatbot with LINE

#### 7.1 สร้าง Webhook API

สร้างไฟล์ `app/api/line/webhook/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server"
import { verifySignature, replyMessage } from "@/lib/line"
import { askQuestion } from "@/lib/rag"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-line-signature") || ""

    // ตรวจสอบ Signature
    if (!verifySignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const data = JSON.parse(body)
    const events = data.events || []

    for (const event of events) {
      if (event.type === "message" && event.message.type === "text") {
        const userMessage = event.message.text
        const replyToken = event.replyToken

        // ใช้ RAG ค้นหาและสร้างคำตอบ
        const { answer } = await askQuestion(userMessage)

        // ส่งข้อความตอบกลับ
        await replyMessage(replyToken, [
          {
            type: "text",
            text: answer,
          },
        ])
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

// LINE ต้องการให้ GET return 200
export async function GET() {
  return NextResponse.json({ status: "ok" })
}
```

#### 7.2 ตั้งค่า Webhook URL ใน LINE Developers Console

1. ไปที่ LINE Developers Console
2. เลือก Channel ที่สร้างไว้
3. ในส่วน Messaging API Settings
4. ตั้งค่า Webhook URL: `https://your-domain.com/api/line/webhook`
5. เปิดใช้งาน Use webhook
6. ปิด Auto-reply messages (ถ้าต้องการให้ Bot ตอบเอง)

---

### Section 8: N8N with LINE Messaging API

#### 8.1 ภาพรวม: Real-time Lead Alert & CRM Sync

**โจทย์:** เมื่อลูกค้ากรอกฟอร์มบนเว็บ Next.js นอกจากยิง Facebook Pixel แล้ว ให้ส่งข้อมูลเข้า LINE Group ของแอดมินด้วย เพื่อให้ทีมขายติดตามได้ทันที

**Workflow ที่จะสร้าง:**
```
ลูกค้ากด Submit Form 
    ↓
Next.js: ยิง Webhook ไปหา n8n
    ↓
n8n: รับข้อมูล (ชื่อ, เบอร์, บริการที่สนใจ)
    ↓
┌─────────────────────┐
│  n8n Node 1:        │
│  บันทึก Google       │
│  Sheets (CRM)       │
└─────────────────────┘
    ↓
┌─────────────────────┐
│  n8n Node 2:        │
│  ส่ง LINE Notify     │
│  แจ้งเตือนทีมขาย       │
└─────────────────────┘
```

**สิ่งที่จะได้เรียนรู้:**
- การเขียน Next.js ให้ยิง API ไปหา n8n (Webhook)
- การใช้ LINE Messaging API สำหรับส่งแจ้งเตือนเข้ากลุ่ม
- การเชื่อมต่อ Google Sheets เป็น Database ง่ายๆ
- การสร้าง Automation Workflow ด้วย n8n

#### 8.2 ติดตั้งและตั้งค่า n8n

**วิธีที่ 1: ใช้ n8n Cloud (แนะนำสำหรับผู้เริ่มต้น)**
1. ไปที่ https://n8n.io และสมัครสมาชิก
2. สร้าง Workspace ใหม่
3. จะได้ URL สำหรับ Webhook เช่น `https://your-instance.app.n8n.cloud/webhook/xxx`

**วิธีที่ 2: Self-hosted ด้วย Docker**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```
เข้าใช้งานที่ http://localhost:5678

#### 8.3 ตั้งค่า LINE Messaging API สำหรับ Push Message

> ⚠️ **หมายเหตุ:** LINE Notify ได้ปิดให้บริการแล้ว เราจึงใช้ LINE Messaging API แทน

**ขั้นตอนการตั้งค่า LINE Bot สำหรับส่งแจ้งเตือน:**

1. ไปที่ https://developers.line.biz
2. Login และเลือก Provider ที่สร้างไว้ (หรือสร้างใหม่)
3. สร้าง **Messaging API Channel** ใหม่สำหรับ Lead Alert (หรือใช้ Channel เดิมก็ได้)
4. ไปที่ Tab "Messaging API"
5. Copy **Channel Access Token** (กด Issue ถ้ายังไม่มี)
6. **เชิญ Bot เข้ากลุ่ม:**
   - สแกน QR Code เพื่อเพิ่ม Bot เป็นเพื่อน
   - สร้างกลุ่ม LINE สำหรับทีมขาย
   - เชิญ Bot เข้ากลุ่ม
7. **ดึง Group ID:**
   - เมื่อ Bot ถูกเชิญเข้ากลุ่ม จะมี Webhook event ส่งมา
   - ดู Group ID จาก event `join` หรือ `message` ที่ส่งในกลุ่ม
   - หรือใช้วิธีง่ายๆ: ส่งข้อความในกลุ่ม แล้วดู log จาก Webhook

**วิธีดึง Group ID (ทำครั้งเดียว):**

สร้างไฟล์ชั่วคราว `app/api/line/get-group-id/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Log ทุก event ที่เข้ามา
  console.log("LINE Event:", JSON.stringify(body, null, 2))
  
  for (const event of body.events || []) {
    // ดึง Group ID จาก event
    if (event.source?.groupId) {
      console.log("🎯 GROUP ID:", event.source.groupId)
    }
  }
  
  return NextResponse.json({ status: "ok" })
}
```

**ตั้งค่า Environment Variables:**
```env
# LINE Messaging API
LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token
LINE_GROUP_ID=Cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 8.4 สร้าง Google Sheets สำหรับเก็บ Lead

**ขั้นตอน:**
1. สร้าง Google Sheet ใหม่
2. ตั้งชื่อ Sheet เช่น "Lead Database"
3. สร้าง Header ในแถวแรก:
   | A | B | C | D | E |
   |---|---|---|---|---|
   | Timestamp | Name | Phone | Service | Source |

4. แชร์ Sheet ให้ n8n Service Account (ถ้าใช้ n8n Cloud) หรือใช้ Google Sheets API

#### 8.5 สร้าง Contact Form Component

สร้างไฟล์ `components/landing/ContactForm.tsx`:
```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { event } from "@/lib/fpixel"

interface FormData {
  name: string
  phone: string
  service: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // 1. ส่งข้อมูลไปยัง API (ซึ่งจะยิงไป n8n)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      // 2. ยิง Facebook Pixel Event
      event("Lead", {
        content_name: "Contact Form",
        content_category: formData.service,
        value: 0,
      })

      // 3. แสดงข้อความสำเร็จ
      setIsSuccess(true)
      setFormData({ name: "", phone: "", service: "", message: "" })
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
      console.error("Form submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
          <svg
            className="h-8 w-8 text-green-600 dark:text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-green-800 dark:text-green-200">
          ส่งข้อมูลสำเร็จ!
        </h3>
        <p className="text-green-700 dark:text-green-300">
          ขอบคุณที่สนใจ ทีมงานจะติดต่อกลับโดยเร็ว
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="mt-4"
        >
          ส่งข้อมูลอีกครั้ง
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          ชื่อ-นามสกุล *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          placeholder="กรอกชื่อของคุณ"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          เบอร์โทรศัพท์ *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          placeholder="08x-xxx-xxxx"
        />
      </div>

      <div>
        <label
          htmlFor="service"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          บริการที่สนใจ *
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          <option value="">เลือกบริการ</option>
          <option value="ai-chatbot">AI Chatbot สำหรับธุรกิจ</option>
          <option value="ai-automation">AI Automation</option>
          <option value="ai-consulting">AI Consulting</option>
          <option value="ai-training">AI Training Course</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          ข้อความเพิ่มเติม
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          placeholder="บอกเราเพิ่มเติมเกี่ยวกับความต้องการของคุณ"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            กำลังส่ง...
          </span>
        ) : (
          "ส่งข้อมูล"
        )}
      </Button>
    </form>
  )
}
```

#### 8.6 สร้าง API Endpoint สำหรับ Contact Form

สร้างไฟล์ `app/api/contact/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server"

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL!

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, service, message } = body

    // Validate required fields
    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // ส่งข้อมูลไป n8n Webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        service,
        message: message || "",
        timestamp: new Date().toISOString(),
        source: "website",
      }),
    })

    if (!n8nResponse.ok) {
      console.error("n8n webhook error:", await n8nResponse.text())
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

**เพิ่ม Environment Variable:**
```env
# n8n
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/lead-form
```

#### 8.7 สร้าง n8n Workflow

**ขั้นตอนการสร้าง Workflow ใน n8n:**

**Step 1: สร้าง Webhook Trigger**
1. เปิด n8n และสร้าง Workflow ใหม่
2. เพิ่ม Node: **Webhook**
3. ตั้งค่า:
   - HTTP Method: POST
   - Path: `lead-form`
4. Copy Webhook URL ไปใส่ใน `.env`

**Step 2: เพิ่ม Google Sheets Node**
1. เพิ่ม Node: **Google Sheets**
2. เชื่อมต่อ Google Account
3. ตั้งค่า:
   - Operation: Append Row
   - Document: เลือก Sheet ที่สร้างไว้
   - Sheet: Sheet1
   - Mapping Mode: Map Each Column Manually
   - Column Mappings:
     ```
     Timestamp: {{ $json.timestamp }}
     Name: {{ $json.name }}
     Phone: {{ $json.phone }}
     Service: {{ $json.service }}
     Source: {{ $json.source }}
     ```

**Step 3: เพิ่ม HTTP Request Node สำหรับ LINE Messaging API**
1. เพิ่ม Node: **HTTP Request**
2. ตั้งค่า:
   - Method: POST
   - URL: `https://api.line.me/v2/bot/message/push`
   - Authentication: None (เราจะใส่ Header เอง)
   - Headers:
     ```
     Authorization: Bearer YOUR_LINE_CHANNEL_ACCESS_TOKEN
     Content-Type: application/json
     ```
   - Body Content Type: JSON
   - Body (JSON):
     ```json
     {
       "to": "YOUR_LINE_GROUP_ID",
       "messages": [
         {
           "type": "text",
           "text": "🔥 มีลูกค้าใหม่!\n━━━━━━━━━━━━━━\n👤 ชื่อ: {{ $json.name }}\n📱 เบอร์: {{ $json.phone }}\n📋 สนใจ: {{ $json.service }}\n🕐 เวลา: {{ $json.timestamp }}\n━━━━━━━━━━━━━━\n💬 ข้อความ: {{ $json.message || '-' }}"
         }
       ]
     }
     ```

**Step 4: ทดสอบ Workflow**
1. คลิก "Execute Workflow" เพื่อทดสอบ
2. ส่ง Test Request จาก Postman หรือ curl:
```bash
curl -X POST https://your-n8n.com/webhook/lead-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ทดสอบ ระบบ",
    "phone": "0891234567",
    "service": "AI Chatbot",
    "message": "สนใจคอร์ส AI",
    "timestamp": "2025-01-28T10:00:00Z",
    "source": "website"
  }'
```

3. ตรวจสอบ:
   - Google Sheets ว่ามีข้อมูลเพิ่มขึ้น
   - LINE Group ว่าได้รับแจ้งเตือน

**Step 5: Activate Workflow**
1. เมื่อทดสอบเสร็จ คลิก "Active" เพื่อเปิดใช้งาน
2. Workflow จะทำงานอัตโนมัติเมื่อมี Request เข้ามา

#### 8.8 n8n Workflow JSON (Import ได้เลย)

```json
{
  "name": "Lead Form to LINE & Sheets",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "lead-form",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "webhook-node",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": {
          "__rl": true,
          "mode": "list",
          "value": "YOUR_GOOGLE_SHEET_ID"
        },
        "sheetName": {
          "__rl": true,
          "mode": "list",
          "value": "Sheet1"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "Timestamp": "={{ $json.timestamp }}",
            "Name": "={{ $json.name }}",
            "Phone": "={{ $json.phone }}",
            "Service": "={{ $json.service }}",
            "Source": "={{ $json.source }}"
          }
        }
      },
      "id": "sheets-node",
      "name": "Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4,
      "position": [500, 200]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.line.me/v2/bot/message/push",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Authorization",
              "value": "Bearer YOUR_LINE_CHANNEL_ACCESS_TOKEN"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "contentType": "json",
        "bodyParameters": {
          "parameters": []
        },
        "jsonBody": "={\n  \"to\": \"YOUR_LINE_GROUP_ID\",\n  \"messages\": [\n    {\n      \"type\": \"text\",\n      \"text\": \"🔥 มีลูกค้าใหม่!\\n━━━━━━━━━━━━━━\\n👤 ชื่อ: {{ $json.name }}\\n📱 เบอร์: {{ $json.phone }}\\n📋 สนใจ: {{ $json.service }}\\n🕐 เวลา: {{ $json.timestamp }}\\n━━━━━━━━━━━━━━\\n💬 ข้อความ: {{ $json.message || '-' }}\"\n    }\n  ]\n}"
      },
      "id": "line-push-node",
      "name": "LINE Push Message",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4,
      "position": [500, 400]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={ \"success\": true }"
      },
      "id": "response-node",
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [750, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          { "node": "Google Sheets", "type": "main", "index": 0 },
          { "node": "LINE Push Message", "type": "main", "index": 0 }
        ]
      ]
    },
    "Google Sheets": {
      "main": [
        [{ "node": "Respond to Webhook", "type": "main", "index": 0 }]
      ]
    },
    "LINE Push Message": {
      "main": [
        [{ "node": "Respond to Webhook", "type": "main", "index": 0 }]
      ]
    }
  }
}
```

**หมายเหตุ:** อย่าลืมแทนที่ค่าต่อไปนี้ก่อน Import:
- `YOUR_GOOGLE_SHEET_ID` — ID ของ Google Sheet
- `YOUR_LINE_CHANNEL_ACCESS_TOKEN` — Channel Access Token จาก LINE Developers Console
- `YOUR_LINE_GROUP_ID` — Group ID ที่ได้จากขั้นตอน 8.3

#### 8.9 ทดสอบระบบทั้งหมด

**Checklist:**
- [ ] n8n Workflow Active แล้ว
- [ ] Environment Variables ครบ (`N8N_WEBHOOK_URL`, `LINE_CHANNEL_ACCESS_TOKEN`, `LINE_GROUP_ID`)
- [ ] Google Sheets พร้อมใช้งาน
- [ ] LINE Bot ถูกเชิญเข้ากลุ่มแล้ว และดึง Group ID เรียบร้อย

**ขั้นตอนทดสอบ:**
1. เปิดหน้าเว็บ Contact Form
2. กรอกข้อมูลและกด Submit
3. ตรวจสอบ:
   - ✅ หน้าเว็บแสดง "ส่งสำเร็จ"
   - ✅ Google Sheets มีข้อมูลใหม่
   - ✅ LINE Group ได้รับแจ้งเตือน
   - ✅ Facebook Events Manager มี Lead Event

---

### Section 9: Deployment and Testing

#### 9.1 เตรียมโปรเจคสำหรับการดีพลอย

**ตรวจสอบ Environment Variables ทั้งหมด:**

```env
# Neon Serverless Postgres (มีอยู่แล้วจาก Payload CMS)
DATABASE_URL=postgresql://neondb_owner:xxxx@ep-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Payload CMS (มีอยู่แล้ว)
PAYLOAD_SECRET=your-payload-secret

# Vercel Blob Storage (มีอยู่แล้ว)
BLOB_READ_WRITE_TOKEN=your-blob-token

# OpenAI (เพิ่มใหม่ใน Day 4)
OPENAI_API_KEY=sk-proj-xxxx

# LINE (เพิ่มใหม่ใน Day 4)
LINE_CHANNEL_SECRET=your-channel-secret
LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token

# Facebook Pixel (มีอยู่แล้ว)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your-pixel-id

# n8n (เพิ่มใหม่ใน Day 4)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/lead-form
```

**ตรวจสอบ Build:**
```bash
npm run build
```

#### 9.2 สรุปไฟล์ที่เพิ่ม/แก้ไขทั้งหมดใน Day 4

| ไฟล์ | การเปลี่ยนแปลง | Section |
|------|---------------|---------|
| `package.json` | เพิ่ม dependencies + ingest script | 2.2 |
| `.env.local` | เพิ่ม `OPENAI_API_KEY` | 2.2 |
| `scripts/setup-neon.sql` | **สร้างใหม่** — pgVector SQL setup | 2.2 |
| `lib/neon.ts` | **สร้างใหม่** — Neon database client | 2.3 |
| `scripts/ingest.ts` | **สร้างใหม่** — Document ingestion | 3.2 |
| `documents/` | **สร้างใหม่** — โฟลเดอร์เก็บ PDF/TXT | 3.3 |
| `lib/rag.ts` | **สร้างใหม่** — RAG service | 4.1 |
| `app/api/chat/route.ts` | **สร้างใหม่** — Chat API endpoint | 4.2 |
| `components/chat/ChatWidget.tsx` | **สร้างใหม่** — Chat widget | 5.1 |
| `app/(landing)/page.tsx` | **แก้ไข** — เพิ่ม ChatWidget | 5.2 |
| `lib/line.ts` | **สร้างใหม่** — LINE utility | 6.3 |
| `app/api/line/webhook/route.ts` | **สร้างใหม่** — LINE webhook | 7.1 |
| `components/landing/ContactForm.tsx` | **สร้างใหม่** — Contact form | 8.5 |
| `app/api/contact/route.ts` | **สร้างใหม่** — Contact API | 8.6 |

#### 9.3 การดีพลอยไปยัง Vercel

**ขั้นตอน:**
1. Push โค้ดขึ้น GitHub
2. ไปที่ https://vercel.com และเชื่อมต่อ GitHub
3. Import โปรเจค
4. ตั้งค่า Environment Variables ใน Vercel Dashboard
5. (แนะนำ) เชื่อมต่อ Neon ผ่าน Vercel Integration:
   - ไปที่ Vercel Dashboard → Storage → Connect Database
   - เลือก Neon Serverless Postgres
   - Vercel จะเพิ่ม `DATABASE_URL` ให้อัตโนมัติ
6. Deploy

**คำสั่ง Vercel CLI:**
```bash
npm i -g vercel
vercel
```

#### 9.4 การทดสอบ

**ทดสอบ Chatbot บนเว็บ:**
1. เปิดเว็บไซต์ที่ deploy แล้ว
2. คลิกปุ่ม Chat ที่มุมล่างขวา
3. ถามคำถามที่เกี่ยวข้องกับเอกสารที่ ingest ไป
4. ตรวจสอบว่าได้รับคำตอบที่ถูกต้อง

**ทดสอบ LINE Bot:**
1. เพิ่ม Bot เป็นเพื่อนใน LINE
2. ส่งข้อความถามคำถาม
3. ตรวจสอบว่า Bot ตอบกลับถูกต้อง

**ทดสอบ Facebook Pixel:**
1. ติดตั้ง Facebook Pixel Helper Extension
2. เข้าเว็บไซต์และตรวจสอบ Events
3. ตรวจสอบใน Facebook Events Manager

---

### สรุป

ในบทนี้เราได้เพิ่มความสามารถ AI Chatbot ให้กับโปรเจค Landing Page ที่มีอยู่:

**สิ่งที่ทำ:**
1. **Vector Database** — ใช้ Neon Postgres + pgVector (Database เดียวกับ Payload CMS)
2. **Data Ingestion** — นำเข้าเอกสาร PDF/TXT แปลงเป็น Embeddings เก็บลง database
3. **RAG Chatbot API** — สร้าง API ที่ค้นหาข้อมูลจาก Vector Database แล้วให้ LLM สร้างคำตอบ
4. **Chat Widget** — สร้าง UI แบบ Floating Chat Button พร้อม Chat Window
5. **LINE Integration** — เชื่อมต่อ Chatbot กับ LINE Messaging API
6. **n8n Automation** — สร้าง Workflow แจ้งเตือนทีมขายผ่าน LINE + บันทึก Google Sheets
7. **Deployment** — ดีพลอยไปยัง Vercel พร้อม Environment Variables ครบ

**Next Steps:**
- ปรับปรุง Prompt ให้เหมาะกับธุรกิจ
- เพิ่ม Analytics เพื่อติดตามการใช้งาน Chatbot
- ทำ A/B Testing กับ CTA และ Chatbot
- เพิ่มความสามารถในการจดจำบทสนทนา (Memory)
- สร้าง Workflow เพิ่มเติม เช่น Auto Follow-up Email

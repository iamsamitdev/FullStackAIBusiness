## Full Stack AI Business - Day 3

### Download Training Document

[Click here to download the training document](https://bit.ly/fullstack-ai-business)

1. [Section 1: Facebook (Meta) Pixel Integration](#section-1-facebook-meta-pixel-integration)
    - ความเข้าใจเรื่อง Pixel และ Conversions API
    - การติดตั้ง Pixel ใน Next.js (Standard Events: PageView)
    - การสร้าง Custom Events (เช่น กดปุ่มสั่งซื้อ, อ่านบทความจบ, กรอกฟอร์ม)
    - Workshop: ติดตั้งและทดสอบ Event ยิงเข้า Facebook Ads Manager
2. [Section 2: Vector Database Fundamentals](#section-2-vector-database-fundamentals)
    - ความเข้าใจเรื่อง Embeddings และ Vector Store
    - การตั้งค่า Supabase pgVector เพื่อเก็บข้อมูล
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

### Section 1: Facebook (Meta) Pixel Integration

#### 1.1 รู้จัก Facebook (Meta) Pixel & Conversions API

**Facebook Pixel (Browser-Side) คืออะไร**
Facebook Pixel เป็นเครื่องมือวิเคราะห์ที่ช่วยให้คุณวัดผลการโฆษณาบน Facebook ได้อย่างมีประสิทธิภาพ โดยการติดตั้งโค้ด JavaScript เล็กๆ บนเว็บไซต์ของคุณ Pixel จะเก็บข้อมูลเกี่ยวกับการกระทำของผู้ใช้ เช่น การเยี่ยมชมหน้าเว็บ การคลิกปุ่ม หรือการซื้อสินค้า ข้อมูลนี้จะถูกส่งกลับไปยัง Facebook เพื่อช่วยให้คุณเข้าใจพฤติกรรมของผู้ใช้ ปรับปรุงแคมเปญโฆษณา และเพิ่มประสิทธิภาพในการเข้าถึงกลุ่มเป้าหมาย
- **คืออะไร:** โค้ด JavaScript ฝังบนหน้าเว็บ ทำหน้าที่สอดส่องพฤติกรรมผู้ใช้ผ่าน Browser
- **การทำงาน:** เก็บข้อมูลเหตุการณ์ (Events) เช่น การดูหน้าเว็บ, การคลิก, การซื้อสินค้า
- **ข้อดี:** ติดตั้งง่าย, เก็บข้อมูลได้หลากหลาย, ใช้สำหรับการทำ Retargeting และวัดผลโฆษณา
- **ข้อจำกัด:** ข้อมูลอาจถูกบล็อกโดย Ad Blockers, iOS 14.5+ หรือ Browser ที่เน้น Privacy (Safari/Firefox) ทำให้ข้อมูลหายไปประมาณ 10-30%

**Conversions API (Server-Side) คืออะไร**
Conversions API เป็นวิธีการส่งข้อมูลเหตุการณ์ (Events) จากเซิร์ฟเวอร์ของคุณไปยัง Facebook โดยตรง ซึ่งช่วยให้คุณสามารถเก็บข้อมูลที่แม่นยำมากขึ้น โดยไม่ต้องพึ่งพาเบราว์เซอร์ของผู้ใช้ ซึ่งอาจถูกบล็อกหรือจำกัดการทำงานได้
- **คืออะไร:** วิธีการส่งข้อมูลเหตุการณ์จากเซิร์ฟเวอร์ไปยัง Facebook โดยตรง
- **การทำงาน:** ส่งข้อมูลเหตุการณ์ผ่าน API calls แทนการพึ่งพา Browser
- **ข้อดี:** ข้อมูลมีความแม่นยำสูงกว่า, ไม่ถูกบล็อกโดย Ad Blockers หรือข้อจำกัดของ Browser, เหมาะสำหรับเหตุการณ์สำคัญ
- **ข้อจำกัด:** ต้องการการตั้งค่าที่ซับซ้อนกว่า, อาจต้องใช้ทรัพยากรเซิร์ฟเวอร์เพิ่มเติม

**Standard Events ที่สำคัญ:**
| Event | คำอธิบาย |
|-------|----------|
| PageView | ผู้ใช้เข้าชมหน้าเว็บ |
| ViewContent | ผู้ใช้ดูเนื้อหา (สินค้า, บทความ) |
| AddToCart | เพิ่มสินค้าลงตะกร้า |
| Purchase | ทำการซื้อสำเร็จ |
| Lead | กรอกฟอร์มติดต่อ |
| CompleteRegistration | สมัครสมาชิกสำเร็จ |

#### 1.2 การติดตั้ง Facebook Pixel ใน Next.js
ใน Next.js App Router เราไม่มีไฟล์ index.html ตรงๆ เราจึงต้องสร้าง Component ขึ้นมาจัดการเรื่อง Script

##### 1.2.1 เตรียม Environment Variable
ไปที่ไฟล์ .env (หรือ .env.local) แล้วใส่ Pixel ID ของคุณ:
```
# Facebook Marketing
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789012345
FB_ACCESS_TOKEN=EAAbRwCYJPWABQfmB0GHlvr1nwZBZAI...
```
##### 1.2.2 สร้าง Utility Functions
สร้างไฟล์ `lib/fpixel.ts` เพื่อรวมคำสั่งในการส่ง Event ต่างๆ
```ts
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

// ฟังก์ชันส่ง PageView (ดูหน้าเว็บ)
export const pageview = () => {
  if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
    (window as any).fbq("track", "PageView")
  }
}

// Interface สำหรับ Event Options
interface EventOptions {
  eventID?: string
  [key: string]: unknown
}

// ฟังก์ชันส่ง Custom Event (เช่น สั่งซื้อ, กรอกฟอร์ม)
// รองรับ eventID สำหรับ Deduplication กับ CAPI
export const event = (
  name: string, 
  data: Record<string, unknown> = {}, 
  options: EventOptions = {}
) => {
  if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
    if (options.eventID) {
      // ส่งพร้อม eventID สำหรับ Deduplication
      (window as any).fbq("track", name, data, { eventID: options.eventID })
    } else {
      (window as any).fbq("track", name, data)
    }
  }
}
```
##### 1.2.3 สร้าง Facebook Pixel Component
ร้างไฟล์ `components/facebook/FacebookPixel.tsx` คอมโพเนนต์นี้จะทำหน้าที่
- ฝัง Script ของ Facebook Pixel
- ดักจับการเปลี่ยนหน้า (Route Change) เพื่อส่ง Event PageView อัตโนมัติ

```tsx
"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { FB_PIXEL_ID, pageview } from "@/lib/fpixel"

export default function FacebookPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Trigger PageView เมื่อ URL เปลี่ยน
  useEffect(() => {
    pageview()
  }, [pathname, searchParams])

  return (
    <>
      {/* ฝัง Global Script */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
          `,
        }}
      />
    </>
  )
}
```
##### 1.2.4 เพิ่ม Facebook Pixel Component ใน Root Layout
แก้ไขไฟล์ `app/(landing)/layout.tsx` เพื่อเพิ่ม `<FacebookPixel />` ใน Root Layout
```tsx
import FacebookPixel from "@/components/facebook/FacebookPixel"
...
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${anuphan.variable} antialiased`}
      >
        <FacebookPixel />
        {children}
      </body>
    </html>
  )
}
```

#### 1.3 การสร้าง Custom Events & Workshop
เราจะมาเขียนโค้ดเพื่อดักจับพฤติกรรมลูกค้าจริงๆ ในสถานการณ์ต่างๆ

**Scenario A: ลูกค้ากดปุ่ม "สั่งซื้อ" หรือ "ติดต่อเรา" (Button Click)**
เราอยากรู้ว่าใครสนใจสินค้าจริงๆ (ไม่ใช่แค่เข้ามาดูเฉยๆ)
ไฟล์: `components/landing/Hero.tsx` หรือจุดที่มีปุ่ม CTA
```tsx
"use client"; // ต้องเป็น Client Component
import { event } from "@/lib/fpixel";
import { Button } from "@/components/ui/button";

export default function Hero() {
  
  const handlePurchaseClick = () => {
    // ส่ง Event 'InitiateCheckout' หรือชื่อ Custom ที่เราตั้งเอง
    event("InitiateCheckout", {
      currency: "THB",
      value: 2990, // มูลค่าสินค้า (ใส่เพื่อให้ Facebook คำนวณ ROI ได้)
      content_name: "AI Course Bundle"
    });
    
    // โค้ดเปลี่ยนหน้าหรือเปิด Modal ทำงานต่อตรงนี้...
    console.log("Pixel Fired: InitiateCheckout");
  };

  return (
    <Button onClick={handlePurchaseClick}>
      สั่งซื้อทันที (2,990 บาท)
    </Button>
  );
}
```
**Scenario B: ลูกค้ากรอกฟอร์มสำเร็จ (Form Submission)**
ไฟล์: `components/landing/ContactForm.tsx` (สมมติ)
```tsx
"use client";
import { event } from "@/lib/fpixel";

// ... ในฟังก์ชัน handleSubmit ...
const onSubmit = async (data: any) => {
  // 1. ส่งข้อมูลเข้า Database/API
  await saveToDatabase(data);

  // 2. ยิง Pixel บอก Facebook ว่าได้ Lead แล้ว
  event("Lead", {
    content_name: "Contact Form",
    value: 0, 
  });
  
  alert("ขอบคุณครับ เราจะติดต่อกลับโดยเร็ว");
};
```

**Scenario C: ลูกค้าอ่านบทความจนจบ (Scroll Depth)**
อันนี้ Advanced และมีประโยชน์มากสำหรับ Content Marketing วัดว่าใครอ่านบทความเกิน 80%
สร้างไฟล์ `app/(landing)/blog/[slug]/page.tsx`
```tsx
"use client";
import { useEffect, useState } from "react";
import { event } from "@/lib/fpixel";

export default function BlogPost() {
  const [hasRead, setHasRead] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // คำนวณความสูงทั้งหมด vs ตำแหน่งปัจจุบัน
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;

      // ถ้าเลื่อนเกิน 80% และยังไม่เคยส่ง Event นี้
      if (progress > 0.8 && !hasRead) {
        event("ArticleReadComplete", {
          content_name: "How to use AI", // อาจจะดึงจาก Props title
        });
        setHasRead(true); // กันไม่ให้ยิงซ้ำรัวๆ
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasRead]);

  return (
    <article>
       {/* เนื้อหาบทความ... */}
    </article>
  );
}
```

สร้างไฟล์ `components/facebook/ArticleReadTracker.tsx` เพื่อแยก Component สำหรับติดตามการอ่านบทความ
```tsx
"use client"

import { useEffect, useState } from "react"
import { event } from "@/lib/fpixel"

interface ArticleReadTrackerProps {
  title: string
}

export default function ArticleReadTracker({ title }: ArticleReadTrackerProps) {
  const [hasRead, setHasRead] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // คำนวณความสูงทั้งหมด vs ตำแหน่งปัจจุบัน
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / totalHeight

      // ถ้าเลื่อนเกิน 80% และยังไม่เคยส่ง Event นี้
      if (progress > 0.8 && !hasRead) {
        event("ArticleReadComplete", {
          content_name: title,
        })
        setHasRead(true) // กันไม่ให้ยิงซ้ำรัวๆ
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasRead, title])

  return null // Component นี้ไม่ render อะไร แค่ track อย่างเดียว
}
```
แล้วนำไปใช้ในไฟล์ `app/(landing)/blog/[slug]/page.tsx`
```tsx
import ArticleReadTracker from "@/components/facebook/ArticleReadTracker"
...
export default async function BlogDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  ...
  return (
    <article className="min-h-screen bg-white dark:bg-slate-950">
      <ArticleReadTracker title={post.title} />
      {/* Hero Section */}
      <header className="relative pt-28 pb-16 lg:pt-36 lg:pb-24">
      ...
     </header> 
        {/* Featured Image */}
        <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto mb-12 lg:mb-16">
        ...
        </div>

        {/* Content */}
        <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto pb-16 lg:pb-24">
        ...
        </div>
    </article>
  )
}   
```

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
- ตัวอย่าง: Supabase pgVector, Pinecone, Weaviate, Chroma

**RAG (Retrieval-Augmented Generation) คืออะไร?**
```
User Question → Embedding → Vector Search → Relevant Documents → LLM → Answer
```
1. รับคำถามจากผู้ใช้
2. แปลงคำถามเป็น Embedding
3. ค้นหาเอกสารที่เกี่ยวข้องจาก Vector Database
4. ส่งเอกสารที่เกี่ยวข้องพร้อมคำถามให้ LLM
5. LLM สร้างคำตอบจากข้อมูลที่ได้

#### 2.2 การตั้งค่า Supabase pgVector

**สร้างโปรเจค Supabase:**
1. ไปที่ https://supabase.com และสร้างโปรเจคใหม่
2. เลือก Region ที่ใกล้ที่สุด (Singapore)
3. จดบันทึก Project URL และ API Keys

**Enable pgVector Extension:**

ไปที่ SQL Editor ใน Supabase Dashboard และรันคำสั่ง:
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

**ติดตั้ง Dependencies:**
```bash
npm install langchain @langchain/openai @langchain/community @supabase/supabase-js ai
npm install pdf-parse # สำหรับอ่านไฟล์ PDF
```

**ตั้งค่า Environment Variables:**

ในไฟล์ `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key
```

#### 2.3 สร้าง Supabase Client

สร้างไฟล์ `lib/supabase.ts`:
```ts
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client สำหรับ Frontend
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client สำหรับ Server (มีสิทธิ์เต็ม)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
```

---

### Section 3: Data Ingestion (การนำเข้าข้อมูล)

#### 3.1 เทคนิคการแปลงไฟล์เอกสาร

**Document Loaders ที่ใช้:**
- `PDFLoader` - สำหรับไฟล์ PDF
- `TextLoader` - สำหรับไฟล์ Text
- `DocxLoader` - สำหรับไฟล์ Word

**Text Splitter:**
- แบ่งเอกสารขนาดใหญ่เป็นชิ้นเล็กๆ (Chunks)
- กำหนด `chunkSize` และ `chunkOverlap` ให้เหมาะสม

#### 3.2 สร้าง Script นำเข้าข้อมูล

สร้างไฟล์ `scripts/ingest.ts`:
```ts
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { OpenAIEmbeddings } from "@langchain/openai"
import { supabaseAdmin } from "@/lib/supabase"
import fs from "fs"
import path from "path"

const DOCUMENTS_PATH = "./documents" // โฟลเดอร์เก็บเอกสาร

async function ingestDocuments() {
  console.log("🚀 Starting document ingestion...")

  // 1. อ่านไฟล์ PDF ทั้งหมดในโฟลเดอร์
  const files = fs.readdirSync(DOCUMENTS_PATH).filter(f => f.endsWith(".pdf"))
  
  const allDocs = []
  
  for (const file of files) {
    const filePath = path.join(DOCUMENTS_PATH, file)
    console.log(`📄 Loading: ${file}`)
    
    const loader = new PDFLoader(filePath)
    const docs = await loader.load()
    
    // เพิ่ม metadata
    docs.forEach(doc => {
      doc.metadata.source = file
      doc.metadata.type = "pdf"
    })
    
    allDocs.push(...docs)
  }

  console.log(`📚 Total documents loaded: ${allDocs.length}`)

  // 2. แบ่งเอกสารเป็น Chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })

  const splitDocs = await textSplitter.splitDocuments(allDocs)
  console.log(`✂️ Total chunks: ${splitDocs.length}`)

  // 3. สร้าง Embeddings
  const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-3-small",
  })

  console.log("🔄 Creating embeddings...")

  // 4. บันทึกลง Supabase
  for (let i = 0; i < splitDocs.length; i++) {
    const doc = splitDocs[i]
    
    // สร้าง embedding
    const embedding = await embeddings.embedQuery(doc.pageContent)
    
    // บันทึกลงฐานข้อมูล
    const { error } = await supabaseAdmin
      .from("documents")
      .insert({
        content: doc.pageContent,
        metadata: doc.metadata,
        embedding: embedding,
      })

    if (error) {
      console.error(`Error inserting document ${i}:`, error)
    } else {
      console.log(`✅ Inserted chunk ${i + 1}/${splitDocs.length}`)
    }
  }

  console.log("🎉 Document ingestion completed!")
}

ingestDocuments().catch(console.error)
```

**สร้างโฟลเดอร์เก็บเอกสาร:**
```bash
mkdir documents
# เพิ่มไฟล์ PDF ที่ต้องการลงในโฟลเดอร์นี้
```

**รัน Script:**
```bash
npx tsx scripts/ingest.ts
```

---

### Section 4: Building the Chatbot API (RAG Logic)

#### 4.1 สร้าง RAG Service

สร้างไฟล์ `lib/rag.ts`:
```ts
import { OpenAIEmbeddings } from "@langchain/openai"
import { ChatOpenAI } from "@langchain/openai"
import { supabaseAdmin } from "./supabase"

const embeddings = new OpenAIEmbeddings({
  modelName: "text-embedding-3-small",
})

const llm = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0.7,
})

export async function searchDocuments(query: string, matchCount = 5) {
  // 1. สร้าง Embedding จากคำถาม
  const queryEmbedding = await embeddings.embedQuery(query)

  // 2. ค้นหาเอกสารที่เกี่ยวข้อง
  const { data: documents, error } = await supabaseAdmin.rpc("match_documents", {
    query_embedding: queryEmbedding,
    match_threshold: 0.7,
    match_count: matchCount,
  })

  if (error) {
    console.error("Error searching documents:", error)
    return []
  }

  return documents
}

export async function generateAnswer(
  question: string,
  context: string,
  chatHistory: { role: string; content: string }[] = []
) {
  const systemPrompt = `คุณเป็นผู้ช่วยตอบคำถามที่เป็นมิตรและช่วยเหลือลูกค้า 
ตอบคำถามโดยใช้ข้อมูลจากบริบทที่ให้มาเท่านั้น 
หากไม่มีข้อมูลเพียงพอในบริบท ให้บอกว่าไม่ทราบข้อมูลและแนะนำให้ติดต่อทีมงานโดยตรง
ตอบเป็นภาษาไทยเสมอ

บริบท:
${context}`

  const messages = [
    { role: "system" as const, content: systemPrompt },
    ...chatHistory.map(msg => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
    { role: "user" as const, content: question },
  ]

  const response = await llm.invoke(messages)
  return response.content as string
}
```

#### 4.2 สร้าง API Endpoint สำหรับ Chatbot

สร้างไฟล์ `app/api/chat/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server"
import { searchDocuments, generateAnswer } from "@/lib/rag"

export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    // 1. ค้นหาเอกสารที่เกี่ยวข้อง
    const documents = await searchDocuments(message)
    
    // 2. รวมเนื้อหาเอกสาร
    const context = documents
      .map((doc: any) => doc.content)
      .join("\n\n---\n\n")

    // 3. สร้างคำตอบ
    const answer = await generateAnswer(message, context, chatHistory)

    return NextResponse.json({
      answer,
      sources: documents.map((doc: any) => ({
        content: doc.content.substring(0, 200) + "...",
        metadata: doc.metadata,
        similarity: doc.similarity,
      })),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

#### 4.3 สร้าง Streaming API (Optional)

สร้างไฟล์ `app/api/chat/stream/route.ts`:
```ts
import { NextRequest } from "next/server"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { OpenAI } from "openai"
import { searchDocuments } from "@/lib/rag"

const openai = new OpenAI()

export async function POST(request: NextRequest) {
  const { message, chatHistory = [] } = await request.json()

  // ค้นหาเอกสารที่เกี่ยวข้อง
  const documents = await searchDocuments(message)
  const context = documents.map((doc: any) => doc.content).join("\n\n---\n\n")

  const systemPrompt = `คุณเป็นผู้ช่วยตอบคำถามที่เป็นมิตร ตอบเป็นภาษาไทย
บริบท: ${context}`

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      { role: "system", content: systemPrompt },
      ...chatHistory,
      { role: "user", content: message },
    ],
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
```

---

### Section 5: Frontend Integration (Next.js)

#### 5.1 สร้าง Chat Widget Component

สร้างไฟล์ `components/chat/ChatWidget.tsx`:
```tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { trackChatbotOpen } from "@/lib/facebook-pixel"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleOpen = () => {
    setIsOpen(true)
    trackChatbotOpen() // Track event
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          chatHistory: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "ขออภัย เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
          aria-label="Open chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-white/80">พร้อมช่วยเหลือคุณ</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-white/20 transition"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                <p className="mb-2">👋 สวัสดีครับ!</p>
                <p className="text-sm">มีอะไรให้ช่วยไหมครับ?</p>
              </div>
            )}
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" />
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t p-4 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="พิมพ์ข้อความ..."
                className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
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

#### 5.2 เพิ่ม Chat Widget ในหน้าเว็บ

แก้ไขไฟล์ `app/(landing)/page.tsx`:
```tsx
import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import Features from "@/components/landing/Features"
import About from "@/components/landing/About"
import Team from "@/components/landing/Team"
import Testimonial from "@/components/landing/Testimonial"
import Blog from "@/components/landing/Blog"
import CTA from "@/components/landing/CTA"
import Footer from "@/components/landing/Footer"
import ScrollToTop from "@/components/landing/ScrollToTop"
import ChatWidget from "@/components/chat/ChatWidget"

export default function Home() {
  return (
    <main>
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
      <ChatWidget />
    </main>
  )
}
```

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
import { searchDocuments, generateAnswer } from "@/lib/rag"

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

        // ค้นหาและสร้างคำตอบ
        const documents = await searchDocuments(userMessage)
        const context = documents.map((doc: any) => doc.content).join("\n\n")
        const answer = await generateAnswer(userMessage, context)

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

**โจทย์:** เมื่อลูกค้ากรอกฟอร์มบนเว็บ Next.js (Scenario B ที่ทำไปใน Section 1.3) นอกจากยิง Facebook Pixel แล้ว ให้ส่งข้อมูลเข้า LINE Group ของแอดมินด้วย เพื่อให้ทีมขายติดตามได้ทันที

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
│  บันทึก Google      │
│  Sheets (CRM)       │
└─────────────────────┘
    ↓
┌─────────────────────┐
│  n8n Node 2:        │
│  ส่ง LINE Notify    │
│  แจ้งเตือนทีมขาย    │
└─────────────────────┘
```

**สิ่งที่จะได้เรียนรู้:**
- การเขียน Next.js ให้ยิง API ไปหา n8n (Webhook)
- การใช้ LINE Notify สำหรับส่งแจ้งเตือนเข้ากลุ่ม
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
      // ไม่ throw error เพื่อให้ user experience ไม่สะดุด
      // แต่ log ไว้เพื่อ debug
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
- `YOUR_GOOGLE_SHEET_ID` - ID ของ Google Sheet
- `YOUR_LINE_CHANNEL_ACCESS_TOKEN` - Channel Access Token จาก LINE Developers Console
- `YOUR_LINE_GROUP_ID` - Group ID ที่ได้จากขั้นตอน 8.3

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

#### 8.10 Advanced: เพิ่ม Error Handling

ปรับปรุง n8n Workflow ให้มี Error Handling:

```
Webhook
   │
   ├─→ Google Sheets ─→ Success ─→ LINE Notify ─→ Response (200)
   │                       │
   │                       └─→ Error ─→ Slack Alert (แจ้งเตือน Dev)
   │
   └─→ Error ─→ Response (500) + Log Error
```

**เพิ่ม Slack/Discord Alert เมื่อเกิด Error:**
1. เพิ่ม Error Trigger Node
2. เชื่อมต่อกับ Slack หรือ Discord Webhook
3. ส่งข้อความแจ้งเตือนทีม Dev เมื่อระบบมีปัญหา

---

### Section 9: Deployment and Testing

#### 8.1 เตรียมโปรเจคสำหรับการดีพลอย

**ตรวจสอบ Environment Variables:**

ตรวจสอบว่ามี Environment Variables ครบทุกตัว:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# LINE
LINE_CHANNEL_SECRET=
LINE_CHANNEL_ACCESS_TOKEN=

# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=
```

**ตรวจสอบ Build:**
```bash
npm run build
```

#### 8.2 การดีพลอยไปยัง Vercel

**ขั้นตอน:**
1. Push โค้ดขึ้น GitHub
2. ไปที่ https://vercel.com และเชื่อมต่อ GitHub
3. Import โปรเจค
4. ตั้งค่า Environment Variables ใน Vercel Dashboard
5. Deploy

**คำสั่ง Vercel CLI:**
```bash
npm i -g vercel
vercel
```

#### 8.3 การทดสอบ

**ทดสอบ Chatbot บนเว็บ:**
1. เปิดเว็บไซต์ที่ deploy แล้ว
2. คลิกปุ่ม Chat ที่มุมล่างขวา
3. ถามคำถามที่เกี่ยวข้องกับเอกสารที่นำเข้า
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

ในวันที่ 3 เราได้เรียนรู้:
1. ✅ การติดตั้ง Facebook Pixel เพื่อ track พฤติกรรมผู้ใช้
2. ✅ การใช้ Supabase pgVector เป็น Vector Database
3. ✅ การนำเข้าเอกสาร (PDF) และแปลงเป็น Embeddings
4. ✅ การสร้าง RAG Chatbot API ด้วย LangChain และ OpenAI
5. ✅ การสร้าง Chat Widget สำหรับหน้าเว็บ
6. ✅ การเชื่อมต่อ Chatbot กับ LINE Messaging API
7. ✅ การสร้าง Lead Alert System ด้วย n8n + LINE Notify + Google Sheets
8. ✅ การ Deploy และทดสอบระบบทั้งหมด

**Next Steps:**
- ปรับปรุง Prompt ให้เหมาะกับธุรกิจ
- เพิ่ม Analytics เพื่อติดตามการใช้งาน Chatbot
- ทำ A/B Testing กับ CTA และ Chatbot
- เพิ่มความสามารถในการจดจำบทสนทนา (Memory)
- สร้าง Workflow เพิ่มเติม เช่น Auto Follow-up Email
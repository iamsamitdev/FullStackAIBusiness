## Full Stack AI Business - Day 3

### Download Training Document

[Click here to download the training document](https://bit.ly/fullstack-ai-business)

1. [Section 1: Facebook (Meta) Pixel Integration](#section-1-facebook-meta-pixel-integration)
    - ความเข้าใจเรื่อง Pixel และ Conversions API
    - การติดตั้ง Pixel ใน Next.js (Standard Events: PageView)
    - การสร้าง Custom Events (เช่น กดปุ่มสั่งซื้อ, อ่านบทความจบ, กรอกฟอร์ม)
    - Workshop: ติดตั้งและทดสอบ Event ยิงเข้า Facebook Ads Manager

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



### สรุป

ในวันที่ 3 เราได้เรียนรู้:
1. ✅ การติดตั้ง Facebook Pixel เพื่อ track พฤติกรรมผู้ใช้
2. ✅ การสร้าง Event สำหรับ Lead และ Article Read Completion
3. ✅ การใช้ Next.js App Router ในการจัดการ Script และ Route Change
4. ✅ การวัดผลและปรับปรุงแคมเปญโฆษาอย่างมีประสิทธิภาพด้วยข้อมูลจาก Pixel

ในวันถัดไปเราจะมาเรียนรู้การใช้ Conversions API เพื่อให้ข้อมูลมีความแม่นยำมากขึ้น และไม่ถูกบล็อกโดย Ad Blockers หรือข้อจำกัดของ Browser กันครับ!
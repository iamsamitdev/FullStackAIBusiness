## Full Stack AI Business - Day 2

### Download Trainging Document

[Click here to download the training document](https://bit.ly/fullstack-ai-business)

1. [Section 1: Project Structure & UX/UI](#section-1-project-structure--uxui)
    - การขึ้นโครงโปรเจกต์ Next.js แบบ Scalable
    - การออกแบบ UI Landing Page สำหรับธุรกิจ โดยใช้ Tailwind & Shadcn
    - Workshop: สร้างหน้า Landing Page ที่สวยงามและ Responsive

2. [Section 2: Building the Blog System (SEO Friendly) ](#section-2-building-the-blog-system-seo-friendly)
    - ออกแบบ Database Schema สำหรับบทความ (Title, Slug, Content, Cover Image)
    - การดึงข้อมูลมาแสดงผลแบบ Server Side Rendering (SSR) เพื่อผลดีต่อ SEO
    - การทำหน้าอ่านบทความ (Article Detail)
    - Workshop: สร้างระบบ Blog ที่รองรับ Dynamic Content

3. [Section 3: Facebook (Meta) Pixel Integration](#section-3-facebook-meta-pixel-integration)
    - ความเข้าใจเรื่อง Pixel และ Conversions API
    - การติดตั้ง Pixel ใน Next.js (Standard Events: PageView)
    - การสร้าง Custom Events (เช่น กดปุ่มสั่งซื้อ, อ่านบทความจบ, กรอกฟอร์ม)
    - Workshop: ติดตั้งและทดสอบ Event ยิงเข้า Facebook Ads Manager

---
### Section 1: Project Structure & UX/UI

#### 1.1 การขึ้นโครงโปรเจกต์ Next.js แบบ Scalable
- สร้างโปรเจกต์ Next.js ใหม่
- ติดตั้ง Tailwind CSS และ Shadcn UI
- จัดโครงสร้างโฟลเดอร์ให้เหมาะสมกับการขยายในอนาคต
- การตั้งค่า TypeScript และ ESLint
- การตั้งค่า Prettier สำหรับการจัดรูปแบบโค้ด 

**สร้างโปรเจกต์ Next.js ใหม่:**
```bash
npx create-next-app@latest my-ai-business
```
**โครงสร้างโฟลเดอร์ตัวอย่าง:**
```
my-ai-business/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── page.tsx
│   └── layout.tsx
├── node_modules/
├── public/
├── .eslintrc.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── postcss.config.js
├── README.md
└── package.json
```
**การรันโปรเจกต์:**
```bash
cd my-ai-business
npm run dev
```
ที่อยู่ที่ http://localhost:3000

#### 1.2 พื้นฐาน Next.js App Router
- โฟลเดอร์ `app/` สำหรับการจัดการ Routing (Pages & API)
- ไฟล์ `layout.tsx` สำหรับการกำหนด Layout หลักของแอป
- ไฟล์ `page.tsx` สำหรับหน้า Home Page

**ตัวอย่างการสร้าง page ใหม่:**
สร้างโฟลเดอร์ `about/` ภายใน `app/` และเพิ่มไฟล์ `page.tsx`:
```tsx
export default function About() {
  return (
    <h1>About Us</h1>
  )
}
```
เข้าถึงได้ที่ http://localhost:3000/about

**Project structure and organization:**
<image src="https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Ftop-level-folders.png&w=1920&q=75" alt="Next.js App Router Structure" width="600"/>

**app** - สำหรับการจัดการ Routing (Pages & API)
**pages** - (ถ้ามี) สำหรับการจัดการ Routing แบบเก่า (Pages & API)
**public** - สำหรับเก็บรูปภาพและ Assets
**src** - (ถ้ามี) สำหรับเก็บโค้ดต้นฉบับ

**Routing Files**:
- `page.tsx` - สำหรับหน้า Page
- `layout.tsx` - สำหรับ Layout หลัก
- `loading.tsx` - สำหรับหน้า Loading
- `not-found.tsx` - สำหรับหน้า 404 Not Found
- `error.tsx` - สำหรับหน้า Error
- `global-error.tsx` - สำหรับจัดการ Global Error
- `route.ts` - สำหรับ API Routes
- `template.tsx` - สำหรับ Template ที่ใช้ซ้ำ
- `default.tsx` - สำหรับ Default Export Components

**Nested Routes:**
สร้างโฟลเดอร์ย่อยภายใน `app/` เพื่อสร้าง Nested Routes:

- `app/layout.tsx` - Root Layout wraps all routes
- `app/blog/layout.tsx` - Wraps `/blog` and descendants
- `app/page.tsx` - Public Home Page
- `app/blog/page.tsx` - Blog Home Page
- `app/blog/authors/page.tsx` - Blog Authors Page

**Dynamic Routes:**
สร้างโฟลเดอร์ที่มีชื่อในรูปแบบ `[param]` เพื่อสร้าง Dynamic Routes:
- `app/blog/[slug]/page.tsx` - สำหรับหน้าอ่านบทความแบบ Dynamic
- `app/shop/[...slug]/page.tsx` - สำหรับหน้า Dynamic Catch-All Routes
- `app/docs/[[...slug]]/page.tsx` - สำหรับหน้า Dynamic Optional Catch-All Routes

**Route groups and private folders:**
<image src="https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fproject-organization-route-groups.png&w=1920&q=75" alt="Next.js Route Groups" width="600"/>
ใช้วงเล็บปีกกา `( )` เพื่อสร้าง Route Groups หรือโฟลเดอร์ที่ไม่ต้องการให้เป็นส่วนหนึ่งของ URL:
- `app/(marketing)/page.tsx` - สำหรับหน้า Landing Page ในกลุ่ม Marketing
- `app/(shop)/cart/page.tsx` - สำหรับหน้า Cart ในกลุ่ม Shop
- `app/blog/_components/Post.tsx` - สำหรับเก็บ Components ที่ไม่ต้องการให้เป็นส่วนหนึ่งของ URL
- `app/blog/_lib/data.ts` - สำหรับเก็บ Library ที่ไม่ต้องการให้เป็นส่วนหนึ่งของ URL

**Organize routes without affecting the URL path:**
To organize routes without affecting the URL, create a group to keep related routes together. The folders in parenthesis will be omitted from the URL (e.g. (marketing) or (shop)).
<image src="https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Froute-group-organisation.png&w=1920&q=75" alt="Next.js Non-URL Folders" width="600"/>

**Layouts and Pages**:
Next.js uses **file-system based routing**, meaning you can use folders and files to define routes. This page will guide you through how to create layouts and pages, and link between them.

**Creating a page**:
<img src="https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fpage-special-file.png&w=1920&q=75" alt="Creating a Page in Next.js" width="600"/>
To create a page, add a `page.tsx` file inside the `app/` and add a `page.tsx` file:
```tsx
// app/page.tsx
export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```

**Creating a layout**:
<img src="https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Flayout-special-file.png&w=1920&q=75" alt="Creating a Layout in Next.js" width="600"/>
To create a layout, add a `layout.tsx` file inside the `app/` folder:
```tsx
// app/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

**Nesting layouts**:
By default, layouts in the folder hierarchy are also nested, which means they wrap child layouts via their `children` prop. You can nest `layouts` by adding layout inside specific route segments (folders).

For example, to create a layout for the /blog route, add a new layout file inside the blog folder.

<img src="https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fnested-layouts.png&w=1920&q=75" alt="Nesting Layouts in Next.js" width="600"/>

```tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```
f you were to combine the two layouts above, the root layout (app/layout.js) would wrap the blog layout (app/blog/layout.js), which would wrap the blog (app/blog/page.js) and blog post page (app/blog/[slug]/page.js).

เมื่อ User เข้ามาที่หน้า /blog หรือ /blog/post-1 โค้ดจะถูกนำมาซ้อนกันแบบนี้ครับ:
```tsx
/* app/layout.js (Root) */
<html>
  <body>
    <Navbar /> {/* เมนูหลักของเว็บ จะติดไปทุกที่ */}
    
    {/* ส่วน children ตรงนี้คือที่ที่ Layout ลูกจะถูกนำมาใส่ */}
    <div className="root-content">
      
        /* app/blog/layout.js (Blog Layout) */
        <Sidebar /> {/* เมนูข้างเฉพาะของ Blog */}
        <div className="blog-content">
           
            {/* หน้า Page จริงๆ อยู่ในสุด */}
            <BlogPage /> 
            
        </div>
        
    </div>
    
    <Footer />
  </body>
</html>
```
#### 1.3 รู้จัก Shadcn UI
Shadcn UI เป็นคอมโพเนนต์ไลบรารีที่สร้างขึ้นบน Tailwind CSS ซึ่งช่วยให้การพัฒนา UI เป็นไปอย่างรวดเร็วและมีประสิทธิภาพ ด้วยคอมโพเนนต์ที่ออกแบบมาอย่างดีและสามารถปรับแต่งได้ง่าย

<image src="https://ui.shadcn.com/r/styles/new-york-v4/dashboard-01-light.png" alt="Shadcn UI Logo" />

**ตัวอย่าง** https://shadcnblocks-admin.vercel.app/

**ติดตั้ง Shadcn UI:**
```bash
npx shadcn@latest init
```
ผลลัพธ์ที่ได้:
```
✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS config. Found v4.
✔ Validating import alias.
√ Which color would you like to use as the base color? » Neutral
✔ Writing components.json.
✔ Checking registry.
✔ Updating CSS variables in app\globals.css
✔ Installing dependencies.
✔ Created 1 file:
  - lib\utils.ts

Success! Project initialization completed.
You may now add components.
```

**เพิ่มเติมคอมโพเนนต์ที่ต้องการ:**
```bash
npx shadcn@latest add button
```
ผลลัพธ์ที่ได้:
```
✔ Checking registry.
✔ Installing dependencies.
✔ Created 1 file:
  - components\ui\button.tsx
```

**ทดสอบใช้งาน Shadcn/ui**
แก้ไขไฟล์ `app/page.tsx` ดังนี้:
```tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button>Button</Button>
    </div>
  )
}
```

#### 1.4 ตัวอย่าง Scalable Folder Structure
```
my-ai-business/
├── action/              # สำหรับ Server Actions (ถ้ามีในอนาคต)
├── app/                 # สำหรับ Routing (Pages & API) เท่านั้น
│   ├── (landing)/       # Landing Page Group
│   │   ├── auth/        # Authentication Pages (Login, Register)
│   │   ├── blog/        # Blog Pages (ถ้ามีในอนาคต)
│   │   ├── page.tsx     # Landing Page
│   │   ├── layout.tsx   # Landing Page Layout
│   │   ├── globals.css  # Landing Page specific CSS
│   ├── (payload)/       # Payload CMS Group (Blog Management)
│   │   ├── api/         # API Routes สำหรับเชื่อมต่อกับ
│   │   ├── admin/       # Admin Pages ของ Payload CMS
│   │   ├── layout.tsx   # Payload CMS Layout
│   │   ├── custom.css   # Payload CMS specific CSS
│   └── favicon.ico      # Favicon
├── collections/         # สำหรับ Payload CMS Collections (ถ้ามีในอนาคต)
├── components/          # UI Components
│   ├── auth/            # Components เฉพาะหน้า Authentication (Login, Register)
│   ├── facebook/        # Components เฉพาะหน้า Facebook Pixel Integration
│   ├── landing/         # Components เฉพาะหน้า Landing Page (Hero, Features)
│   ├── ui/              # Shadcn Components (Button, Input, etc.)
│   └── shared/          # Components ที่ใช้ร่วมกัน (Navbar, Footer)
├── lib/                 # Utility functions & Database clients
│   ├── utils.ts         # Shadcn utilities
│   └── supabase.ts      # (จะสร้างใน Day 2)
├── media/               # รูปภาพและ Assets สำหรับ Blog ด้วย Payload CMS
├── node_modules/        # โฟลเดอร์สำหรับเก็บแพ็กเกจที่ติดตั้ง
├── public/              # รูปภาพและ Assets ทั่วไป
├── payload-types        # Payload CMS Types (ถ้ามีในอนาคต)
├── .eslintrc.json       # ESLint configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── next.config.js       # Next.js configuration
├── postcss.config.js    # PostCSS configuration
├── README.md            # เอกสารโปรเจกต์
└── package.json         # รายการแพ็กเกจและสคริปต์ของโปรเจกต์
```

### 1.5 Workshop: สร้างหน้า Landing Page ที่สวยงามและ Responsive
- สร้างหน้า Landing Page ด้วยคอมโพเนนต์ที่ได้เรียนรู้
- ทดสอบการแสดงผลบนอุปกรณ์ต่างๆ

#### 1.5.1 การขึ้นโครงโปรเจกต์ Landing Page
- มีส่วนประกอบหลัก เช่น Navbar, Hero Section, Features, About Us, Team, Testimonial, Blog Preview, CTA, Footer
- รองรับการแสดงผลแบบ Responsive

**สร้างโปรเจกต์ Next.js ใหม่:**
```bash
npx create-next-app@latest landingpage
```
หลังติดตั้งเสร็จทดสอบรันโปรเจกต์:
```bash
cd landingpage
npm run dev
```

#### 1.5.2 ติดตั้ง Shadcn UI:
```bash
npx shadcn@latest init
```
ผลลัพธ์ที่ได้:
```
✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS config. Found v4.
✔ Validating import alias.
√ Which color would you like to use as the base color? » Neutral
✔ Writing components.json.
✔ Checking registry.
✔ Updating CSS variables in app\globals.css
✔ Installing dependencies.
✔ Created 1 file:
  - lib\utils.ts

Success! Project initialization completed.
You may now add components.
```

**เพิ่มเติมคอมโพเนนต์ที่ต้องการ:**
```bash
npx shadcn@latest add button
```
ผลลัพธ์ที่ได้:
```
✔ Checking registry.
✔ Installing dependencies.
✔ Created 1 file:
  - components\ui\button.tsx
```

**ทดสอบใช้งาน Shadcn/ui**
แก้ไขไฟล์ `app/page.tsx` ดังนี้:
```tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button>Button</Button>
    </div>
  )
}
```

#### 1.5.3 เตรียม Assets ใส่ในโฟลเดอร์ `public/`
- โลโก้บริษัท
- รูปภาพประกอบ (Hero Image, Features Images)
- ไอคอนต่างๆ

#### 1.5.4 สร้าง Components สำหรับ landing Page ที่โฟลเดอร์ `components/landing/`
- Navbar.tsx
- Hero.tsx
- Features.tsx
- About.tsx
- Team.tsx
- Testimonial.tsx
- Blog.tsx
- CTA.tsx
- Footer.tsx
- ScrollToTop.tsx

#### 1.5.5 โค้ดใน `components/landing/Navbar.tsx`
```tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
    { href: "#team", label: "Team" },
    { href: "#testimonial", label: "Testimonial" },
    { href: "#blog", label: "Blog" },
  ]

  const pagesLinks = [
    { href: "/docs", label: "Docs" },
    { href: "/support", label: "Support" },
    { href: "/error", label: "Error 404" },
  ]

  return (
    <header className="fixed left-0 top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto flex w-full flex-wrap lg:flex-nowrap lg:items-center lg:justify-between py-4">
        {/* Logo */}
        <div className="relative shrink-0 pr-4 lg:w-45">
          <a 
            href="#home" 
            className="inline-flex items-center gap-2"
          >
            <Image
              alt="logo"
              width={180}
              height={40}
              className="hidden dark:block"
              src="/images/logo/logo-dark.svg"
            />
            <Image
              alt="logo"
              width={180}
              height={40}
              className="dark:hidden"
              src="/images/logo/logo-light.svg"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className={`menu-wrapper fixed left-0 top-0 z-50 h-screen w-full justify-center bg-white p-5 lg:visible lg:static lg:flex lg:h-auto lg:flex-1 lg:justify-center lg:bg-transparent lg:p-0 lg:opacity-100 dark:bg-slate-900 dark:lg:bg-transparent ${isMobileMenuOpen ? 'flex' : 'hidden lg:flex'}`}>
          <div className="self-center">
            <nav>
              <ul className="flex flex-col items-center justify-center space-y-5 text-center lg:flex-row lg:justify-center lg:space-x-6 lg:space-y-0 xl:space-x-10">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-medium text-slate-600 hover:text-blue-500 inline-flex items-center justify-center text-center text-lg dark:text-slate-300 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                
                {/* Pages Dropdown */}
                <li className="group relative">
                  <button 
                    className="font-medium text-slate-600 hover:text-blue-500 inline-flex items-center justify-center text-start text-lg dark:text-slate-300 dark:hover:text-white transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                  >
                    More
                    <span className="pl-2">
                      <svg 
                        width="14" 
                        height="8" 
                        viewBox="0 0 14 8" 
                        className={`fill-current transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      >
                        <path d="M6.54564 5.09128L11.6369 0L13.0913 1.45436L6.54564 8L0 1.45436L1.45436 0L6.54564 5.09128Z" />
                      </svg>
                    </span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <ul 
                    className={`lg:absolute lg:top-[200%] lg:left-0 lg:w-52 lg:rounded-lg lg:border lg:border-slate-200 lg:bg-white lg:shadow-lg lg:py-5 lg:px-0 dark:lg:border-slate-700 dark:lg:bg-slate-800 transition-all duration-200 ${isDropdownOpen ? 'block lg:visible lg:opacity-100' : 'hidden lg:invisible lg:opacity-0'} space-y-1 pt-6 lg:pt-5 text-left`}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {pagesLinks.map((link, index) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`block px-8 py-2.5 font-medium text-lg transition-colors text-left ${
                            index === 0 
                              ? 'text-blue-500 dark:text-blue-400' 
                              : 'text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-white'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-5 top-1/2 z-50 flex -translate-y-1/2 items-center lg:static lg:translate-y-0 lg:w-45 lg:justify-end shrink-0">

          {/* Theme Toggle */}
          {/*
          <button 
            className="text-slate-600 dark:text-slate-300 flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {/* Moon icon (light mode) */}
            {/* <svg viewBox="0 0 23 23" className="h-5 w-5 stroke-current dark:hidden" fill="none">
              <path d="M9.55078 1.5C5.80078 1.5 1.30078 5.25 1.30078 11.25C1.30078 17.25 5.80078 21.75 11.8008 21.75C17.8008 21.75 21.5508 17.25 21.5508 13.5C13.3008 18.75 4.30078 9.75 9.55078 1.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg> */}
            {/* Sun icon (dark mode) */}
            {/* <svg viewBox="0 0 25 24" className="hidden h-5 w-5 dark:block" fill="currentColor">
              <path d="M12.0508 16.5C10.8573 16.5 9.71271 16.0259 8.8688 15.182C8.02489 14.3381 7.55078 13.1935 7.55078 12C7.55078 10.8065 8.02489 9.66193 8.8688 8.81802C9.71271 7.97411 10.8573 7.5 12.0508 7.5C13.2443 7.5 14.3888 7.97411 15.2328 8.81802C16.0767 9.66193 16.5508 10.8065 16.5508 12C16.5508 13.1935 16.0767 14.3381 15.2328 15.182C14.3888 16.0259 13.2443 16.5 12.0508 16.5ZM12.0508 18C13.6421 18 15.1682 17.3679 16.2934 16.2426C17.4186 15.1174 18.0508 13.5913 18.0508 12C18.0508 10.4087 17.4186 8.88258 16.2934 7.75736C15.1682 6.63214 13.6421 6 12.0508 6C10.4595 6 8.93336 6.63214 7.80814 7.75736C6.68292 8.88258 6.05078 10.4087 6.05078 12C6.05078 13.5913 6.68292 15.1174 7.80814 16.2426C8.93336 17.3679 10.4595 18 12.0508 18ZM12.0508 0C12.2497 0 12.4405 0.0790176 12.5811 0.21967C12.7218 0.360322 12.8008 0.551088 12.8008 0.75V3.75C12.8008 3.94891 12.7218 4.13968 12.5811 4.28033C12.4405 4.42098 12.2497 4.5 12.0508 4.5C11.8519 4.5 11.6611 4.42098 11.5205 4.28033C11.3798 4.13968 11.3008 3.94891 11.3008 3.75V0.75C11.3008 0.551088 11.3798 0.360322 11.5205 0.21967C11.6611 0.0790176 11.8519 0 12.0508 0V0ZM12.0508 19.5C12.2497 19.5 12.4405 19.579 12.5811 19.7197C12.7218 19.8603 12.8008 20.0511 12.8008 20.25V23.25C12.8008 23.4489 12.7218 23.6397 12.5811 23.7803C12.4405 23.921 12.2497 24 12.0508 24C11.8519 24 11.6611 23.921 11.5205 23.7803C11.3798 23.6397 11.3008 23.4489 11.3008 23.25V20.25C11.3008 20.0511 11.3798 19.8603 11.5205 19.7197C11.6611 19.579 11.8519 19.5 12.0508 19.5ZM24.0508 12C24.0508 12.1989 23.9718 12.3897 23.8311 12.5303C23.6905 12.671 23.4997 12.75 23.3008 12.75H20.3008C20.1019 12.75 19.9111 12.671 19.7705 12.5303C19.6298 12.3897 19.5508 12.1989 19.5508 12C19.5508 11.8011 19.6298 11.6103 19.7705 11.4697C19.9111 11.329 20.1019 11.25 20.3008 11.25H23.3008C23.4997 11.25 23.6905 11.329 23.8311 11.4697C23.9718 11.6103 24.0508 11.8011 24.0508 12ZM4.55078 12C4.55078 12.1989 4.47176 12.3897 4.33111 12.5303C4.19046 12.671 3.99969 12.75 3.80078 12.75H0.800781C0.601869 12.75 0.411103 12.671 0.270451 12.5303C0.129799 12.3897 0.0507813 12.1989 0.0507812 12C0.0507813 11.8011 0.129799 11.6103 0.270451 11.4697C0.411103 11.329 0.601869 11.25 0.800781 11.25H3.80078C3.99969 11.25 4.19046 11.329 4.33111 11.4697C4.47176 11.6103 4.55078 11.8011 4.55078 12Z" />
            </svg>
          </button> */}

          <div className="flex items-center space-x-4">
            {/* Sign In Button */}
            <Link 
              href="/auth/signin" 
              className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap rounded-md px-4 py-2 lg:px-6 lg:py-2.5 text-center text-white text-sm lg:text-base font-medium transition-colors"
            >
              Sign In
            </Link>
            
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="text-slate-600 dark:text-slate-300 relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" className="fill-current">
                <path d="M16.5 5.5L5.5 16.5M5.5 5.5L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" className="fill-current">
                <path d="M2.75 3.66666H19.25V5.49999H2.75V3.66666ZM2.75 10.0833H19.25V11.9167H2.75V10.0833ZM2.75 16.5H19.25V18.3333H2.75V16.5Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
```

#### 1.5.6 โค้ดใน `components/landing/Hero.tsx`
```tsx
import Image from "next/image"

function Hero() {
  return (
    <section id="home" className="relative z-40 overflow-hidden h-screen pb-24 pt-28 sm:pt-36 lg:pb-30 lg:pt-42.5">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
        <div className="-mx-4 flex flex-wrap items-center">
          {/* Left Content */}
          <div className="w-full px-3 lg:w-1/2">
            <div className="mx-auto mb-12 max-w-132.5 text-center lg:mb-0 lg:ml-0 lg:text-left">
              {/* Badge */}
              <span className="bg-blue-500/5 font-medium text-blue-500 mb-8 inline-block rounded-full px-5 py-2.5 text-base dark:bg-white/10 dark:text-white">
                <span className="bg-blue-500 mr-2 inline-block h-2 w-2 rounded-full"></span>
                Next.js Starter for Business
              </span>

              {/* Heading */}
              <h1 className="font-bold mb-5 text-2xl sm:text-4xl md:text-[50px] md:leading-15 text-slate-900 dark:text-white">
                Next.js Boilerplate for Your Business
              </h1>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 mb-12 text-base leading-relaxed">
                Handcrafted Next.js starter for your next - Startup, Business, Agency or SaaS Website. Comes with refreshing design, integrations and everything you need to kickstart your next web project.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a 
                  href="#features" 
                  className="bg-blue-600 font-medium hover:bg-blue-700 inline-flex items-center rounded-md px-6 py-2.5 text-base text-white md:px-8 md:py-3.5 transition-colors"
                >
                  Get Started
                  <span className="pl-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z" fill="white" />
                    </svg>
                  </span>
                </a>
                <a 
                  href="#about" 
                  aria-label="Learn how it works"
                  className="font-medium text-slate-900 hover:text-blue-500 dark:hover:text-blue-400 inline-flex items-center rounded-md px-8 py-3.5 text-base dark:text-white transition-colors"
                >
                  <span className="pr-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                      <path d="M19.376 12.416L8.777 19.482C8.70171 19.5321 8.61423 19.5608 8.52389 19.5652C8.43355 19.5695 8.34373 19.5492 8.264 19.5065C8.18427 19.4639 8.1176 19.4003 8.07111 19.3228C8.02462 19.2452 8.00005 19.1564 8 19.066V4.934C8.00005 4.84356 8.02462 4.75482 8.07111 4.67724C8.1176 4.59966 8.18427 4.53615 8.264 4.49346C8.34373 4.45077 8.43355 4.43051 8.52389 4.43483C8.61423 4.43915 8.70171 4.46789 8.777 4.518L19.376 11.584C19.4445 11.6297 19.5006 11.6915 19.5395 11.7641C19.5783 11.8367 19.5986 11.9177 19.5986 12C19.5986 12.0823 19.5783 12.1633 19.5395 12.2359C19.5006 12.3085 19.4445 12.3703 19.376 12.416Z" />
                    </svg>
                  </span>
                  How it Work
                </a>
              </div>
            </div>
          </div>

          {/* Right Images */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative z-30 mx-auto h-140 w-full max-w-175 lg:ml-0">
              {/* Top Right Image */}
              <div className="absolute right-0 top-0 lg:w-11/12">
                <Image
                  alt="hero-image"
                  width={560}
                  height={520}
                  className="object-cover aspect-[1.08] rounded-lg"
                  src="/images/hero/hero2.webp"
                  priority
                />
              </div>

              {/* Bottom Left Image with Blur Effect */}
              <div className="absolute bottom-0 left-0 z-10">
                <Image
                  alt="hero-image"
                  width={350}
                  height={420}
                  className="object-cover rounded-lg"
                  src="/images/hero/hero1.webp"
                />
                {/* Blur backdrop behind image */}
                <div className="border-blue-500/10 bg-blue-500/5 absolute -right-6 -top-6 -z-10 h-full w-full border backdrop-blur-[6px] dark:border-white/10 dark:bg-white/10 rounded-lg"></div>
              </div>

              {/* Decorative Wave SVG */}
              <div className="absolute bottom-0 left-0">
                <svg width="72" height="38" viewBox="0 0 72 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M62.0035 2.04985C59.6808 1.76671 57.4524 2.70929 55.1508 4.68209C51.3631 7.92863 44.7908 9.54366 38.8668 4.69678C36.329 2.6204 34.117 2.29213 32.2894 2.59672C30.3972 2.91209 28.8057 3.92088 27.5547 4.75487C25.5734 6.07577 23.3915 7.46379 20.8786 7.78953C18.2847 8.12577 15.515 7.32034 12.3598 4.69105C9.71804 2.48955 7.45748 2.0661 5.72104 2.33325C3.94436 2.6066 2.56003 3.6273 1.76341 4.56877C1.40666 4.99037 0.775686 5.04295 0.354079 4.68621C-0.0675277 4.32946 -0.120109 3.69849 0.236635 3.27688C1.27334 2.05168 3.0643 0.71846 5.41692 0.356509C7.80979 -0.0116349 10.6326 0.648246 13.6402 3.1546C16.485 5.52529 18.7154 6.05321 20.6215 5.80612C22.6086 5.54854 24.4266 4.43657 26.4453 3.09078L27 3.92282L26.4453 3.09078C27.6943 2.25809 29.6028 1.0169 31.9606 0.623935C34.383 0.220203 37.1711 0.725274 40.1333 3.14886C45.1548 7.25733 50.6369 5.9169 53.8492 3.16356C56.3795 0.994798 59.1512 -0.312658 62.2455 0.0645503C65.3089 0.43799 68.4333 2.43425 71.7557 6.26783C72.1174 6.68518 72.0723 7.31674 71.655 7.67845C71.2376 8.04015 70.606 7.99504 70.2443 7.57769C67.0668 3.91125 64.3571 2.33677 62.0035 2.04985Z" fill="#4A6CF7" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M62.0035 11.9726C59.6808 11.6895 57.4524 12.6321 55.1508 14.6049C51.3631 17.8514 44.7908 19.4664 38.8668 14.6196C36.329 12.5432 34.117 12.2149 32.2894 12.5195C30.3972 12.8349 28.8057 13.8437 27.5547 14.6776C25.5734 15.9985 23.3915 17.3866 20.8786 17.7123C18.2847 18.0485 15.515 17.2431 12.3598 14.6138C9.71804 12.4123 7.45748 11.9889 5.72104 12.256C3.94436 12.5294 2.56003 13.5501 1.76341 14.4915C1.40666 14.9131 0.775686 14.9657 0.354079 14.609C-0.0675277 14.2522 -0.120109 13.6213 0.236635 13.1997C1.27334 11.9745 3.0643 10.6412 5.41692 10.2793C7.80979 9.91114 10.6326 10.571 13.6402 13.0774C16.485 15.4481 18.7154 15.976 20.6215 15.7289C22.6086 15.4713 24.4266 14.3594 26.4453 13.0136L27 13.8456L26.4453 13.0136C27.6943 12.1809 29.6028 10.9397 31.9606 10.5467C34.383 10.143 37.1711 10.648 40.1333 13.0716C45.1548 17.1801 50.6369 15.8397 53.8492 13.0863C56.3795 10.9176 59.1512 9.61012 62.2455 9.98733C65.3089 10.3608 68.4333 12.357 71.7557 16.1906C72.1174 16.608 72.0723 17.2395 71.655 17.6012C71.2376 17.9629 70.606 17.9178 70.2443 17.5005C67.0668 13.834 64.3571 12.2595 62.0035 11.9726Z" fill="#4A6CF7" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M62.0035 21.8954C59.6808 21.6123 57.4524 22.5548 55.1508 24.5276C51.3631 27.7742 44.7908 29.3892 38.8668 24.5423C36.329 22.4659 34.117 22.1377 32.2894 22.4423C30.3972 22.7576 28.8057 23.7664 27.5547 24.6004C25.5734 25.9213 23.3915 27.3093 20.8786 27.6351C18.2847 27.9713 15.515 27.1659 12.3598 24.5366C9.71804 22.3351 7.45748 21.9117 5.72104 22.1788C3.94436 22.4521 2.56003 23.4728 1.76341 24.4143C1.40666 24.8359 0.775686 24.8885 0.354079 24.5318C-0.0675277 24.175 -0.120109 23.544 0.236635 23.1224C1.27334 21.8972 3.0643 20.564 5.41692 20.2021C7.80979 19.8339 10.6326 20.4938 13.6402 23.0002C16.485 25.3708 18.7154 25.8988 20.6215 25.6517C22.6086 25.3941 24.4266 24.2821 26.4453 22.9363L27 23.7684L26.4453 22.9363C27.6943 22.1036 29.6028 20.8624 31.9606 20.4695C34.383 20.0658 37.1711 20.5708 40.1333 22.9944C45.1548 27.1029 50.6369 25.7624 53.8492 23.0091C56.3795 20.8403 59.1512 19.5329 62.2455 19.9101C65.3089 20.2835 68.4333 22.2798 71.7557 26.1134C72.1174 26.5307 72.0723 27.1623 71.655 27.524C71.2376 27.8857 70.606 27.8406 70.2443 27.4232C67.0668 23.7568 64.3571 22.1823 62.0035 21.8954Z" fill="#4A6CF7" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M62.0035 31.8182C59.6808 31.535 57.4524 32.4776 55.1508 34.4504C51.3631 37.697 44.7908 39.312 38.8668 34.4651C36.329 32.3887 34.117 32.0605 32.2894 32.365C30.3972 32.6804 28.8057 33.6892 27.5547 34.5232C25.5734 35.8441 23.3915 37.2321 20.8786 37.5579C18.2847 37.8941 15.515 37.0887 12.3598 34.4594C9.71804 32.2579 7.45748 31.8344 5.72104 32.1016C3.94436 32.3749 2.56003 33.3956 1.76341 34.3371C1.40666 34.7587 0.775686 34.8113 0.354079 34.4545C-0.0675277 34.0978 -0.120109 33.4668 0.236635 33.0452C1.27334 31.82 3.0643 30.4868 5.41692 30.1248C7.80979 29.7567 10.6326 30.4166 13.6402 32.9229C16.485 35.2936 18.7154 35.8215 20.6215 35.5745C22.6086 35.3169 24.4266 34.2049 26.4453 32.8591L27 33.6911L26.4453 32.8591C27.6943 32.0264 29.6028 30.7852 31.9606 30.3923C34.383 29.9885 37.1711 30.4936 40.1333 32.9172C45.1548 37.0257 50.6369 35.6852 53.8492 32.9319C56.3795 30.7631 59.1512 29.4557 62.2455 29.8329C65.3089 30.2063 68.4333 32.2026 71.7557 36.0362C72.1174 36.4535 72.0723 37.0851 71.655 37.4468C71.2376 37.8085 70.606 37.7634 70.2443 37.346C67.0668 33.6796 64.3571 32.1051 62.0035 31.8182Z" fill="#4A6CF7" />
                </svg>
              </div>

              {/* Decorative Circle Gradient */}
              <div className="absolute bottom-0 left-1/2">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.9" d="M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60Z" fill="url(#paint0_angular_300_926)" />
                  <defs>
                    <radialGradient id="paint0_angular_300_926" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) rotate(90) scale(60)">
                      <stop stopColor="#4A6CF7" />
                      <stop offset="1" stopColor="#111722" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute right-0 top-0 -z-10 h-screen w-full">
        <svg width="100%" height="100%" viewBox="0 0 1356 860" preserveAspectRatio="xMaxYMin slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5" filter="url(#filter0_f_201_2181)">
            <rect x="450.088" y="-126.709" width="351.515" height="944.108" transform="rotate(-34.6784 450.088 -126.709)" fill="url(#paint0_linear_201_2181)" />
          </g>
          <defs>
            <filter id="filter0_f_201_2181" x="0.0878906" y="-776.711" width="1726.24" height="1876.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="225" result="effect1_foregroundBlur_201_2181" />
            </filter>
            <linearGradient id="paint0_linear_201_2181" x1="417.412" y1="59.4717" x2="966.334" y2="603.857" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ABBCFF" />
              <stop offset="0.859375" stopColor="#4A6CF7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 -z-10">
        <svg width="1469" height="498" viewBox="0 0 1469 498" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.3" filter="url(#filter0_f_201_2182)">
            <rect y="450" width="1019" height="261" fill="url(#paint0_linear_201_2182)" />
          </g>
          <defs>
            <filter id="filter0_f_201_2182" x="-450" y="0" width="1919" height="1161" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="225" result="effect1_foregroundBlur_201_2182" />
            </filter>
            <linearGradient id="paint0_linear_201_2182" x1="-94.7239" y1="501.47" x2="-65.8058" y2="802.2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ABBCFF" />
              <stop offset="0.859375" stopColor="#4A6CF7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}

export default Hero
```

#### 1.5.7 โค้ดใน `components/landing/Features.tsx`
```tsx
function Features() {

    const featuresData = [
        {
            icon: (
                <svg width="44" height="44" viewBox="0 0 44 44" className="fill-current">
                    <path d="M3.66663 23.8333H14.6666V38.5H3.66663V23.8333ZM16.5 5.5H27.5V38.5H16.5V5.5Z" />
                    <path opacity="0.5" d="M29.3333 14.6667H40.3333V38.5H29.3333V14.6667Z" />
                </svg>
            ),
            title: "Crafted for SaaS Business",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor."
        },
        {
            icon: (
                <svg width="44" height="44" viewBox="0 0 44 44" className="fill-current">
                    <path d="M22.9424 2.39982L39.0226 12.0468C39.1585 12.1282 39.271 12.2434 39.3492 12.3813C39.4273 12.5191 39.4684 12.6749 39.4684 12.8333C39.4684 12.9918 39.4273 13.1475 39.3492 13.2854C39.271 13.4232 39.1585 13.5384 39.0226 13.6198L22.0001 23.8333L4.97756 13.6198C4.84161 13.5384 4.72908 13.4232 4.65094 13.2854C4.57281 13.1475 4.53174 12.9918 4.53174 12.8333C4.53174 12.6749 4.57281 12.5191 4.65094 12.3813C4.72908 12.2434 4.84161 12.1282 4.97756 12.0468L21.0559 2.39982C21.341 2.22851 21.6674 2.138 22.0001 2.138C22.3327 2.138 22.6591 2.22851 22.9442 2.39982H22.9424Z" />
                    <path opacity="0.5" d="M36.8189 19.2501L39.0226 20.5719C39.1585 20.6533 39.271 20.7685 39.3492 20.9064C39.4273 21.0442 39.4684 21.1999 39.4684 21.3584C39.4684 21.5168 39.4273 21.6726 39.3492 21.8104C39.271 21.9483 39.1585 22.0635 39.0226 22.1449L22.0001 32.3584L4.97756 22.1449C4.84161 22.0635 4.72908 21.9483 4.65094 21.8104C4.57281 21.6726 4.53174 21.5168 4.53174 21.3584C4.53174 21.1999 4.57281 21.0442 4.65094 20.9064C4.72908 20.7685 4.84161 20.6533 4.97756 20.5719L7.18123 19.2501L22.0001 28.1417L36.8189 19.2501ZM36.8189 27.8667L39.0226 29.1886C39.1585 29.2699 39.271 29.3852 39.3492 29.523C39.4273 29.6609 39.4684 29.8166 39.4684 29.9751C39.4684 30.1335 39.4273 30.2893 39.3492 30.4271C39.271 30.5649 39.1585 30.6802 39.0226 30.7616L22.9442 40.4086C22.6591 40.5799 22.3327 40.6704 22.0001 40.6704C21.6674 40.6704 21.341 40.5799 21.0559 40.4086L4.97756 30.7616C4.84161 30.6802 4.72908 30.5649 4.65094 30.4271C4.57281 30.2893 4.53174 30.1335 4.53174 29.9751C4.53174 29.8166 4.57281 29.6609 4.65094 29.523C4.72908 29.3852 4.84161 29.2699 4.97756 29.1886L7.18123 27.8667L22.0001 36.7584L36.8189 27.8667Z" />
                </svg>
            ),
            title: "High-quality Design",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor."
        },
        {
            icon: (
                <svg width="44" height="44" viewBox="0 0 44 44" className="fill-current">
                    <path d="M36.6667 40.3334H7.33333C6.8471 40.3334 6.38079 40.1402 6.03697 39.7964C5.69315 39.4526 5.5 38.9863 5.5 38.5V14.6667H38.5V38.5C38.5 38.9863 38.3068 39.4526 37.963 39.7964C37.6192 40.1402 37.1529 40.3334 36.6667 40.3334ZM12.8333 20.1667V27.5H20.1667V20.1667H12.8333ZM12.8333 31.1667V34.8334H31.1667V31.1667H12.8333ZM23.8333 22V25.6667H31.1667V22H23.8333Z" />
                    <path opacity="0.5" d="M38.5 11H5.5V5.49996C5.5 5.01373 5.69315 4.54741 6.03697 4.2036C6.38079 3.85978 6.8471 3.66663 7.33333 3.66663H36.6667C37.1529 3.66663 37.6192 3.85978 37.963 4.2036C38.3068 4.54741 38.5 5.01373 38.5 5.49996V11Z" />
                </svg>
            ),
            title: "UI Components and Pages",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor."
        },
        {
            icon: (
                <svg width="44" height="44" viewBox="0 0 44 44" className="fill-current">
                    <path d="M22 3.66663C32.1255 3.66663 40.3333 11.8745 40.3333 22C40.3333 32.1255 32.1255 40.3333 22 40.3333C11.8745 40.3333 3.66663 32.1255 3.66663 22C3.66663 11.8745 11.8745 3.66663 22 3.66663ZM22 7.33329C13.9003 7.33329 7.33329 13.9003 7.33329 22C7.33329 30.0996 13.9003 36.6666 22 36.6666C30.0996 36.6666 36.6666 30.0996 36.6666 22C36.6666 13.9003 30.0996 7.33329 22 7.33329ZM29.777 11.6288L32.3711 14.2211L25.5438 21.0521C25.6245 21.3546 25.6666 21.6718 25.6666 22C25.6666 24.0258 24.0258 25.6666 22 25.6666C19.9741 25.6666 18.3333 24.0258 18.3333 22C18.3333 19.9741 19.9741 18.3333 22 18.3333C22.3281 18.3333 22.6453 18.3755 22.9478 18.4561L29.7788 11.6288H29.777Z" />
                    <path opacity="0.5" d="M22 9.16663C23.8663 9.16663 25.6391 9.56446 27.2396 10.2813L24.3741 13.145C23.617 12.9433 22.8213 12.8333 22 12.8333C16.9381 12.8333 12.8333 16.9381 12.8333 22C12.8333 24.53 13.86 26.8216 15.5173 28.4826L12.925 31.075L12.639 30.7798C10.4866 28.4845 9.16663 25.3953 9.16663 22C9.16663 14.9123 14.9123 9.16663 22 9.16663ZM33.7186 16.7621C34.4336 18.3608 34.8333 20.1355 34.8333 22C34.8333 25.5438 33.396 28.7521 31.075 31.075L28.4826 28.4826C30.14 26.8216 31.1666 24.53 31.1666 22C31.1666 21.1786 31.0585 20.383 30.855 19.6258L33.7186 16.7621Z" />
                </svg>
            ),
            title: "All Essential Integrations",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor."
        },
        {
            icon: (
                <svg width="44" height="44" viewBox="0 0 44 44" className="fill-current">
                    <path d="M25.6667 38.5H7.33333C6.8471 38.5 6.38079 38.3068 6.03697 37.963C5.69315 37.6192 5.5 37.1529 5.5 36.6667V18.3333H25.6667V38.5ZM38.5 14.6667H5.5V7.33333C5.5 6.8471 5.69315 6.38079 6.03697 6.03697C6.38079 5.69315 6.8471 5.5 7.33333 5.5H36.6667C37.1529 5.5 37.6192 5.69315 37.963 6.03697C38.3068 6.38079 38.5 6.8471 38.5 7.33333V14.6667Z" />
                    <path opacity="0.5" d="M29.3334 38.5V18.3334H38.5V36.6667C38.5 37.1529 38.3069 37.6193 37.9631 37.9631C37.6193 38.3069 37.1529 38.5 36.6667 38.5H29.3334Z" />
                </svg>
            ),
            title: "Fully Customizable",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor."
        },
        {
            icon: (
                <svg width="44" height="44" viewBox="0 0 44 44" className="fill-current">
                    <path opacity="0.5" d="M10.0154 8.12714C13.3421 5.24452 17.598 3.6605 21.9999 3.66664C32.1254 3.66664 40.3332 11.8745 40.3332 22C40.3332 25.916 39.1049 29.546 37.0149 32.5233L31.1665 22H36.6665C36.6668 19.1246 35.8218 16.3126 34.2368 13.9136C32.6517 11.5146 30.3964 9.63443 27.7514 8.50687C25.1063 7.37931 22.1882 7.0541 19.3598 7.57168C16.5314 8.08926 13.9175 9.42679 11.8432 11.418L10.0154 8.12714Z" />
                    <path d="M33.9843 35.8729C30.6576 38.7555 26.4017 40.3395 21.9998 40.3333C11.8743 40.3333 3.6665 32.1255 3.6665 22C3.6665 18.084 4.89484 14.454 6.98484 11.4767L12.8332 22H7.33317C7.33293 24.8754 8.17788 27.6874 9.76295 30.0864C11.348 32.4854 13.6033 34.3656 16.2483 35.4931C18.8934 36.6207 21.8115 36.9459 24.6399 36.4283C27.4683 35.9107 30.0822 34.5732 32.1565 32.582L33.9843 35.8729Z" />
                </svg>
            ),
            title: "Regular Updates",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor."
        },
    ]

    return (
        <section id="features" className="pt-14 sm:pt-20 lg:pt-32.5 overflow-hidden">
            <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
                {/* Section Header */}
                <div className="relative mx-auto mb-12 max-w-155 pt-6 text-center md:mb-20 lg:pt-16">
                    {/* Faded Title */}
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[80px] font-bold leading-none text-slate-100 dark:text-slate-800/50 select-none lg:text-[100px]">
                        Feature
                    </span>
                    <h2 className="relative mb-5 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl md:text-[50px] md:leading-15">
                        Essential Integrations with Modern Design
                    </h2>
                    <p className="text-base text-slate-600 dark:text-slate-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="-mx-4 flex flex-wrap justify-center">
                    {featuresData.map((feature, index) => (
                        <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div className="group mx-auto mb-10 max-w-95 text-center md:mb-16">
                                {/* Icon */}
                                <div className="bg-blue-500/5 text-blue-600 group-hover:bg-blue-600 mx-auto mb-6 flex h-17.5 w-17.5 items-center justify-center rounded-full transition-all duration-300 group-hover:text-white md:mb-9 md:h-22.5 md:w-22.5 dark:bg-white/5 dark:text-white">
                                    {feature.icon}
                                </div>
                                {/* Content */}
                                <div>
                                    <h3 className="text-slate-900 mb-3 text-xl font-medium sm:text-2xl md:mb-5 dark:text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-base">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
```

#### 1.5.8 โค้ดใน `components/landing/About.tsx`
```tsx
"use client"

import Image from "next/image"
import { useState } from "react"

function About() {
  const [activeTab, setActiveTab] = useState("about")

  const tabs = [
    { id: "about", label: "About Us" },
    { id: "mission", label: "Mission" },
    { id: "vision", label: "Vision" },
  ]

  const tabContent = {
    about: {
      title: "DB, Auth, Stripe, Sanity, and More",
      paragraphs: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum sapien ac leo cursus dignissim. In ac lectus vel orci accumsan ultricies at in libero accumsan.",
        "Phasellus ex massa, facilisis ac vestibulum eget, ultrices quis nulla. Integer vitae magna lacus. Sed venenatis auctor dolor.",
        "Phasellus ex massa, facilisis ac vestibulum eget, ultrices quis nulla. Integer vitae magna lacus. Sed venenatis auctor dolor.",
      ],
    },
    mission: {
      title: "Our Mission is to Empower Businesses",
      paragraphs: [
        "We strive to provide the best tools and resources for businesses to succeed in the digital age. Our platform is designed to be intuitive, powerful, and scalable.",
        "Our team is dedicated to continuous improvement and innovation, ensuring that our clients always have access to the latest technologies and best practices.",
        "We believe in building long-term partnerships with our clients, providing ongoing support and guidance to help them achieve their goals.",
      ],
    },
    vision: {
      title: "Building the Future of Digital Business",
      paragraphs: [
        "We envision a world where every business, regardless of size, has access to powerful digital tools that enable them to compete and thrive in the global marketplace.",
        "Our vision extends beyond just providing software – we aim to create an ecosystem that fosters innovation, collaboration, and sustainable growth.",
        "By 2030, we aim to have empowered over 1 million businesses worldwide, helping them transform their operations and achieve unprecedented success.",
      ],
    },
  }

  const currentContent = tabContent[activeTab as keyof typeof tabContent]

  return (
    <section id="about" className="pt-14 sm:pt-20 lg:pt-32.5 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="relative mx-auto mb-12 max-w-155 pt-6 text-center md:mb-20 lg:pt-16">
          {/* Faded Title */}
          <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[80px] font-bold leading-none text-slate-100 dark:text-slate-800/50 select-none lg:text-[100px]">
            ABOUT
          </span>
          <h2 className="relative mb-5 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl md:text-[50px] md:leading-15">
            Know Details About Our Company
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus.
          </p>
        </div>

        {/* Content Area */}
        <div className="relative z-10 overflow-hidden rounded-sm px-8 pb-8 pt-0 md:px-17.5 md:pb-17.5 lg:px-15 lg:pb-15 xl:px-17.5 xl:pb-17.5">
          {/* Background Gradient */}
          <div className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2">
            <svg width="1174" height="560" viewBox="0 0 1174 560" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.4" filter="url(#filter0_f_41_257)">
                <rect x="450.531" y="279" width="272.933" height="328.051" fill="url(#paint0_linear_41_257)" />
              </g>
              <defs>
                <filter id="filter0_f_41_257" x="0.531494" y="-171" width="1172.93" height="1228.05" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="225" result="effect1_foregroundBlur_41_257" />
                </filter>
                <linearGradient id="paint0_linear_41_257" x1="425.16" y1="343.693" x2="568.181" y2="660.639" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ABBCFF" />
                  <stop offset="0.859375" stopColor="#4A6CF7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Tab Buttons */}
          <div className="flex w-full items-center justify-around">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`w-full border-b px-2 pb-6 pt-8 font-medium text-base lg:pb-7 lg:pt-9 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-white dark:hover:border-blue-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="w-full">
            <div className="-mx-4 flex w-full flex-wrap items-center pt-17.5">
              {/* Left Side - Images */}
              <div className="w-full px-4 lg:w-1/2">
                <div className="relative z-30 mb-14 h-122.5 max-w-150 lg:mb-0">
                  {/* Image 1 - Top Left */}
                  <div className="absolute left-0 top-0 w-full max-w-86 aspect-86/121">
                    <Image
                      alt="about image 1"
                      src="/images/about/about2.webp"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Image 2 - Center Right with blur backdrop */}
                  <div className="absolute right-0 top-1/2 z-10 w-full max-w-78.75 -translate-y-1/2 aspect-53/66">
                    <Image
                      alt="about image 2"
                      src="/images/about/about1.webp"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    {/* Blur backdrop behind image */}
                    <div className="border-blue-500/10 bg-blue-500/5 absolute -left-5 -top-5 -z-10 h-full w-full border backdrop-blur-[6px] dark:border-white/10 dark:bg-white/10" />
                  </div>

                  {/* Decorative Wave SVG */}
                  <div className="absolute right-0 top-24 z-40">
                    <svg width="72" height="38" viewBox="0 0 72 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M62.0035 2.04985C59.6808 1.76671 57.4524 2.70929 55.1508 4.68209C51.3631 7.92863 44.7908 9.54366 38.8668 4.69678C36.329 2.6204 34.117 2.29213 32.2894 2.59672C30.3972 2.91209 28.8057 3.92088 27.5547 4.75487C25.5734 6.07577 23.3915 7.46379 20.8786 7.78953C18.2847 8.12577 15.515 7.32034 12.3598 4.69105C9.71804 2.48955 7.45748 2.0661 5.72104 2.33325C3.94436 2.6066 2.56003 3.6273 1.76341 4.56877C1.40666 4.99037 0.775686 5.04295 0.354079 4.68621C-0.0675277 4.32946 -0.120109 3.69849 0.236635 3.27688C1.27334 2.05168 3.0643 0.71846 5.41692 0.356509C7.80979 -0.0116349 10.6326 0.648246 13.6402 3.1546C16.485 5.52529 18.7154 6.05321 20.6215 5.80612C22.6086 5.54854 24.4266 4.43657 26.4453 3.09078L27 3.92282L26.4453 3.09078C27.6943 2.25809 29.6028 1.0169 31.9606 0.623935C34.383 0.220203 37.1711 0.725274 40.1333 3.14886C45.1548 7.25733 50.6369 5.9169 53.8492 3.16356C56.3795 0.994798 59.1512 -0.312658 62.2455 0.0645503C65.3089 0.43799 68.4333 2.43425 71.7557 6.26783C72.1174 6.68518 72.0723 7.31674 71.655 7.67845C71.2376 8.04015 70.606 7.99504 70.2443 7.57769C67.0668 3.91125 64.3571 2.33677 62.0035 2.04985Z" fill="#4A6CF7" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M62.0035 11.9727C59.6808 11.6896 57.4524 12.6321 55.1508 14.6049C51.3631 17.8515 44.7908 19.4665 38.8668 14.6196C36.329 12.5433 34.117 12.215 32.2894 12.5196C30.3972 12.8349 28.8057 13.8437 27.5547 14.6777C25.5734 15.9986 23.3915 17.3866 20.8786 17.7124C18.2847 18.0486 15.515 17.2432 12.3598 14.6139C9.71804 12.4124 7.45748 11.989 5.72104 12.2561C3.94436 12.5294 2.56003 13.5501 1.76341 14.4916C1.40666 14.9132 0.775686 14.9658 0.354079 14.6091C-0.0675277 14.2523 -0.120109 13.6213 0.236635 13.1997C1.27334 11.9745 3.0643 10.6413 5.41692 10.2794C7.80979 9.91122 10.6326 10.5711 13.6402 13.0775C16.485 15.4481 18.7154 15.9761 20.6215 15.729C22.6086 15.4714 24.4266 14.3594 26.4453 13.0136L27 13.8457L26.4453 13.0136C27.6943 12.1809 29.6028 10.9397 31.9606 10.5468C34.383 10.1431 37.1711 10.6481 40.1333 13.0717C45.1548 17.1802 50.6369 15.8397 53.8492 13.0864C56.3795 10.9176 59.1512 9.61019 62.2455 9.9874C65.3089 10.3608 68.4333 12.3571 71.7557 16.1907C72.1174 16.608 72.0723 17.2396 71.655 17.6013C71.2376 17.963 70.606 17.9179 70.2443 17.5005C67.0668 13.8341 64.3571 12.2596 62.0035 11.9727Z" fill="#4A6CF7" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M62.0035 21.8953C59.6808 21.6122 57.4524 22.5548 55.1508 24.5275C51.3631 27.7741 44.7908 29.3891 38.8668 24.5422C36.329 22.4659 34.117 22.1376 32.2894 22.4422C30.3972 22.7575 28.8057 23.7663 27.5547 24.6003C25.5734 25.9212 23.3915 27.3093 20.8786 27.635C18.2847 27.9712 15.515 27.1658 12.3598 24.5365C9.71804 22.335 7.45748 21.9116 5.72104 22.1787C3.94436 22.4521 2.56003 23.4728 1.76341 24.4142C1.40666 24.8358 0.775686 24.8884 0.354079 24.5317C-0.0675277 24.1749 -0.120109 23.5439 0.236635 23.1223C1.27334 21.8971 3.0643 20.5639 5.41692 20.202C7.80979 19.8338 10.6326 20.4937 13.6402 23.0001C16.485 25.3707 18.7154 25.8987 20.6215 25.6516C22.6086 25.394 24.4266 24.282 26.4453 22.9362L27 23.7683L26.4453 22.9362C27.6943 22.1035 29.6028 20.8624 31.9606 20.4694C34.383 20.0657 37.1711 20.5707 40.1333 22.9943C45.1548 27.1028 50.6369 25.7624 53.8492 23.009C56.3795 20.8403 59.1512 19.5328 62.2455 19.91C65.3089 20.2834 68.4333 22.2797 71.7557 26.1133C72.1174 26.5306 72.0723 27.1622 71.655 27.5239C71.2376 27.8856 70.606 27.8405 70.2443 27.4231C67.0668 23.7567 64.3571 22.1822 62.0035 21.8953Z" fill="#4A6CF7" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M62.0035 31.8182C59.6808 31.535 57.4524 32.4776 55.1508 34.4504C51.3631 37.6969 44.7908 39.312 38.8668 34.4651C36.329 32.3887 34.117 32.0604 32.2894 32.365C30.3972 32.6804 28.8057 33.6892 27.5547 34.5232C25.5734 35.8441 23.3915 37.2321 20.8786 37.5578C18.2847 37.8941 15.515 37.0887 12.3598 34.4594C9.71804 32.2579 7.45748 31.8344 5.72104 32.1016C3.94436 32.3749 2.56003 33.3956 1.76341 34.3371C1.40666 34.7587 0.775686 34.8113 0.354079 34.4545C-0.0675277 34.0978 -0.120109 33.4668 0.236635 33.0452C1.27334 31.82 3.0643 30.4868 5.41692 30.1248C7.80979 29.7567 10.6326 30.4166 13.6402 32.9229C16.485 35.2936 18.7154 35.8215 20.6215 35.5744C22.6086 35.3169 24.4266 34.2049 26.4453 32.8591L27 33.6911L26.4453 32.8591C27.6943 32.0264 29.6028 30.7852 31.9606 30.3922C34.383 29.9885 37.1711 30.4936 40.1333 32.9172C45.1548 37.0256 50.6369 35.6852 53.8492 32.9319C56.3795 30.7631 59.1512 29.4557 62.2455 29.8329C65.3089 30.2063 68.4333 32.2026 71.7557 36.0361C72.1174 36.4535 72.0723 37.085 71.655 37.4468C71.2376 37.8085 70.606 37.7634 70.2443 37.346C67.0668 33.6796 64.3571 32.1051 62.0035 31.8182Z" fill="#4A6CF7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="w-full px-4 lg:w-1/2">
                <div className="max-w-141.25 lg:ml-auto">
                  <h2 className="text-slate-900 mb-8 text-2xl font-bold sm:text-[40px] sm:leading-12.5 dark:text-white">
                    {currentContent.title}
                  </h2>
                  {currentContent.paragraphs.map((paragraph, index) => (
                    <p key={index} className={`text-base text-slate-600 dark:text-slate-400 ${index < currentContent.paragraphs.length - 1 ? 'mb-6' : ''}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
```

#### 1.5.9 โค้ดใน `components/landing/Team.tsx`
```tsx
import Image from "next/image"
import Link from "next/link"

function Team() {
  const teamMembers = [
    {
      name: "Olivia Andrium",
      role: "Project Manager",
      image: "/images/team/team1.webp",
      socials: {
        facebook: "/",
        twitter: "/",
        linkedin: "/",
      },
    },
    {
      name: "Jemse Kemorun",
      role: "Frontend Developer",
      image: "/images/team/team2.webp",
      socials: {
        facebook: "/",
        twitter: "/",
        linkedin: "/",
      },
    },
    {
      name: "Avi Pestarica",
      role: "Product Designer",
      image: "/images/team/team3.webp",
      socials: {
        facebook: "/",
        twitter: "/",
        linkedin: "/",
      },
    },
  ]

  return (
    <section id="team" className="pt-14 sm:pt-20 lg:pt-32.5 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="relative mx-auto mb-12 max-w-155 pt-6 text-center md:mb-20 lg:pt-16">
          {/* Faded Title */}
          <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[80px] font-bold leading-none text-slate-100 dark:text-slate-800/50 select-none lg:text-[100px]">
            OUR
          </span>
          <h2 className="relative mb-5 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl md:text-[50px] md:leading-15">
            Meet With Our Creative Dedicated Team
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus.
          </p>
        </div>

        {/* Team Grid */}
        <div className="-mx-4 flex flex-wrap justify-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="group mx-auto mb-10 max-w-92.5 text-center">
                {/* Image Container */}
                <div className="relative mb-8 overflow-hidden rounded-md aspect-360/370">
                  <Image
                    alt={member.name}
                    src={member.image}
                    fill
                    sizes="100vw"
                    className="w-full object-cover"
                  />
                  
                  {/* Social Links - Appear on Hover */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex items-center justify-center space-x-3">
                      {/* Facebook */}
                      <Link
                        href={member.socials.facebook}
                        aria-label="Facebook"
                        className="hover:bg-blue-500 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm transition hover:border-transparent"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.6667 11.2501H13.75L14.5834 7.91675H11.6667V6.25008C11.6667 5.39175 11.6667 4.58341 13.3334 4.58341H14.5834V1.78341C14.3117 1.74758 13.2859 1.66675 12.2025 1.66675C9.94004 1.66675 8.33337 3.04758 8.33337 5.58341V7.91675H5.83337V11.2501H8.33337V18.3334H11.6667V11.2501Z" fill="white" />
                        </svg>
                      </Link>

                      {/* Twitter/X */}
                      <Link
                        href={member.socials.twitter}
                        aria-label="Twitter"
                        className="hover:bg-blue-500 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm transition hover:border-transparent"
                      >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M13.9831 19.25L9.82094 13.3176L4.61058 19.25H2.40625L8.843 11.9233L2.40625 2.75H8.06572L11.9884 8.34127L16.9034 2.75H19.1077L12.9697 9.73737L19.6425 19.25H13.9831ZM16.4378 17.5775H14.9538L5.56249 4.42252H7.04674L10.808 9.6899L11.4584 10.6039L16.4378 17.5775Z" fill="currentColor" />
                        </svg>
                      </Link>

                      {/* LinkedIn */}
                      <Link
                        href={member.socials.linkedin}
                        aria-label="Linkedin"
                        className="hover:bg-blue-500 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm transition hover:border-transparent"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.78328 4.16677C5.78306 4.6088 5.60726 5.03263 5.29454 5.34504C4.98182 5.65744 4.55781 5.83282 4.11578 5.8326C3.67376 5.83238 3.24992 5.65657 2.93752 5.34386C2.62511 5.03114 2.44973 4.60713 2.44995 4.1651C2.45017 3.72307 2.62598 3.29924 2.9387 2.98683C3.25141 2.67443 3.67542 2.49905 4.11745 2.49927C4.55948 2.49949 4.98331 2.6753 5.29572 2.98801C5.60812 3.30073 5.78351 3.72474 5.78328 4.16677ZM5.83328 7.06677H2.49995V17.5001H5.83328V7.06677ZM11.1 7.06677H7.78328V17.5001H11.0666V12.0251C11.0666 8.9751 15.0416 8.69177 15.0416 12.0251V17.5001H18.3333V10.8918C18.3333 5.7501 12.45 5.94177 11.0666 8.46677L11.1 7.06677Z" fill="white" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div>
                  <h3 className="text-slate-900 mb-1 text-xl font-medium sm:text-2xl dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
```

#### 1.5.10 โค้ดใน `components/landing/Testimonial.tsx`
```tsx
"use client"

import Image from "next/image"
import { useState } from "react"

function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum sapien ac leo cursus dignissim. In ac lectus vel orci accumsan ultricies at in libero accumsan Lorem Ipsum has been the industry's standard",
      name: "Musharof Chy",
      role: "Founder @ Pimjo",
      image: "/images/testimonial/testimonial1.webp",
    },
    {
      id: 2,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum sapien ac leo cursus dignissim. In ac lectus vel orci accumsan ultricies at in libero accumsan Lorem Ipsum has been the industry's standard",
      name: "Naimur Rahman",
      role: "Product Designer @ Pimjo",
      image: "/images/testimonial/testimonial2.webp",
    },
    {
      id: 3,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum sapien ac leo cursus dignissim. In ac lectus vel orci accumsan ultricies at in libero accumsan Lorem Ipsum has been the industry's standard",
      name: "Shafiq Hammad",
      role: "Frontend Developer @ Pimjo",
      image: "/images/testimonial/testimonial3.webp",
    },
  ]

  const WaveDecoration = () => (
    <svg
      width="72"
      height="38"
      viewBox="0 0 72 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.0035 2.04985C59.6808 1.76671 57.4524 2.70929 55.1508 4.68209C51.3631 7.92863 44.7908 9.54366 38.8668 4.69678C36.329 2.6204 34.117 2.29213 32.2894 2.59672C30.3972 2.91209 28.8057 3.92088 27.5547 4.75487C25.5734 6.07577 23.3915 7.46379 20.8786 7.78953C18.2847 8.12577 15.515 7.32034 12.3598 4.69105C9.71804 2.48955 7.45748 2.0661 5.72104 2.33325C3.94436 2.6066 2.56003 3.6273 1.76341 4.56877C1.40666 4.99037 0.775686 5.04295 0.354079 4.68621C-0.0675277 4.32946 -0.120109 3.69849 0.236635 3.27688C1.27334 2.05168 3.0643 0.71846 5.41692 0.356509C7.80979 -0.0116349 10.6326 0.648246 13.6402 3.1546C16.485 5.52529 18.7154 6.05321 20.6215 5.80612C22.6086 5.54854 24.4266 4.43657 26.4453 3.09078L27 3.92282L26.4453 3.09078C27.6943 2.25809 29.6028 1.0169 31.9606 0.623935C34.383 0.220203 37.1711 0.725274 40.1333 3.14886C45.1548 7.25733 50.6369 5.9169 53.8492 3.16356C56.3795 0.994798 59.1512 -0.312658 62.2455 0.0645503C65.3089 0.43799 68.4333 2.43425 71.7557 6.26783C72.1174 6.68518 72.0723 7.31674 71.655 7.67845C71.2376 8.04015 70.606 7.99504 70.2443 7.57769C67.0668 3.91125 64.3571 2.33677 62.0035 2.04985Z"
        fill="#4A6CF7"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.0035 11.9727C59.6808 11.6896 57.4524 12.6321 55.1508 14.6049C51.3631 17.8515 44.7908 19.4665 38.8668 14.6196C36.329 12.5433 34.117 12.215 32.2894 12.5196C30.3972 12.8349 28.8057 13.8437 27.5547 14.6777C25.5734 15.9986 23.3915 17.3866 20.8786 17.7124C18.2847 18.0486 15.515 17.2432 12.3598 14.6139C9.71804 12.4124 7.45748 11.989 5.72104 12.2561C3.94436 12.5294 2.56003 13.5501 1.76341 14.4916C1.40666 14.9132 0.775686 14.9658 0.354079 14.6091C-0.0675277 14.2523 -0.120109 13.6213 0.236635 13.1997C1.27334 11.9745 3.0643 10.6413 5.41692 10.2794C7.80979 9.91122 10.6326 10.5711 13.6402 13.0775C16.485 15.4481 18.7154 15.9761 20.6215 15.729C22.6086 15.4714 24.4266 14.3594 26.4453 13.0136L27 13.8457L26.4453 13.0136C27.6943 12.1809 29.6028 10.9397 31.9606 10.5468C34.383 10.1431 37.1711 10.6481 40.1333 13.0717C45.1548 17.1802 50.6369 15.8397 53.8492 13.0864C56.3795 10.9176 59.1512 9.61019 62.2455 9.9874C65.3089 10.3608 68.4333 12.3571 71.7557 16.1907C72.1174 16.608 72.0723 17.2396 71.655 17.6013C71.2376 17.963 70.606 17.9179 70.2443 17.5005C67.0668 13.8341 64.3571 12.2596 62.0035 11.9727Z"
        fill="#4A6CF7"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.0035 21.8953C59.6808 21.6122 57.4524 22.5548 55.1508 24.5275C51.3631 27.7741 44.7908 29.3891 38.8668 24.5422C36.329 22.4659 34.117 22.1376 32.2894 22.4422C30.3972 22.7575 28.8057 23.7663 27.5547 24.6003C25.5734 25.9212 23.3915 27.3093 20.8786 27.635C18.2847 27.9712 15.515 27.1658 12.3598 24.5365C9.71804 22.335 7.45748 21.9116 5.72104 22.1787C3.94436 22.4521 2.56003 23.4728 1.76341 24.4142C1.40666 24.8358 0.775686 24.8884 0.354079 24.5317C-0.0675277 24.1749 -0.120109 23.5439 0.236635 23.1223C1.27334 21.8971 3.0643 20.5639 5.41692 20.202C7.80979 19.8338 10.6326 20.4937 13.6402 23.0001C16.485 25.3707 18.7154 25.8987 20.6215 25.6516C22.6086 25.394 24.4266 24.282 26.4453 22.9362L27 23.7683L26.4453 22.9362C27.6943 22.1035 29.6028 20.8624 31.9606 20.4694C34.383 20.0657 37.1711 20.5707 40.1333 22.9943C45.1548 27.1028 50.6369 25.7624 53.8492 23.009C56.3795 20.8403 59.1512 19.5328 62.2455 19.91C65.3089 20.2834 68.4333 22.2797 71.7557 26.1133C72.1174 26.5306 72.0723 27.1622 71.655 27.5239C71.2376 27.8856 70.606 27.8405 70.2443 27.4231C67.0668 23.7567 64.3571 22.1822 62.0035 21.8953Z"
        fill="#4A6CF7"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.0035 31.8182C59.6808 31.535 57.4524 32.4776 55.1508 34.4504C51.3631 37.6969 44.7908 39.312 38.8668 34.4651C36.329 32.3887 34.117 32.0604 32.2894 32.365C30.3972 32.6804 28.8057 33.6892 27.5547 34.5232C25.5734 35.8441 23.3915 37.2321 20.8786 37.5578C18.2847 37.8941 15.515 37.0887 12.3598 34.4594C9.71804 32.2579 7.45748 31.8344 5.72104 32.1016C3.94436 32.3749 2.56003 33.3956 1.76341 34.3371C1.40666 34.7587 0.775686 34.8113 0.354079 34.4545C-0.0675277 34.0978 -0.120109 33.4668 0.236635 33.0452C1.27334 31.82 3.0643 30.4868 5.41692 30.1248C7.80979 29.7567 10.6326 30.4166 13.6402 32.9229C16.485 35.2936 18.7154 35.8215 20.6215 35.5744C22.6086 35.3169 24.4266 34.2049 26.4453 32.8591L27 33.6911L26.4453 32.8591C27.6943 32.0264 29.6028 30.7852 31.9606 30.3922C34.383 29.9885 37.1711 30.4936 40.1333 32.9172C45.1548 37.0256 50.6369 35.6852 53.8492 32.9319C56.3795 30.7631 59.1512 29.4557 62.2455 29.8329C65.3089 30.2063 68.4333 32.2026 71.7557 36.0361C72.1174 36.4535 72.0723 37.085 71.655 37.4468C71.2376 37.8085 70.606 37.7634 70.2443 37.346C67.0668 33.6796 64.3571 32.1051 62.0035 31.8182Z"
        fill="#4A6CF7"
      />
    </svg>
  )

  return (
    <section id="testimonial" className="pt-14 sm:pt-20 lg:pt-32.5 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="relative mx-auto mb-12 max-w-155 pt-6 text-center md:mb-20 lg:pt-16">
          {/* Faded Title */}
          <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[60px] font-bold leading-none text-slate-100 dark:text-slate-800/50 select-none lg:text-[80px]">
            TESTIMONIAL
          </span>
          <h2 className="relative mb-5 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl md:text-[50px] md:leading-15">
            What Our Clients Say About Us
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam
            ante in maximus.
          </p>
        </div>

        {/* Testimonial Content */}
        <div className="w-full px-4">
          <div className="relative z-10 overflow-hidden rounded-md bg-cover bg-center px-10 pb-28 pt-15 shadow-lg dark:shadow-none sm:px-14 md:p-17.5 md:pb-28 lg:pb-17.5">
            {/* Background Noise Pattern */}
            <div className="absolute left-0 top-0 -z-10 h-full w-full bg-slate-50 dark:bg-slate-900/50 opacity-90"></div>

            {/* Background Gradient */}
            <div className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2">
              <svg
                width="1174"
                height="560"
                viewBox="0 0 1174 560"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.4" filter="url(#filter0_f_41_257)">
                  <rect
                    x="450.531"
                    y="279"
                    width="272.933"
                    height="328.051"
                    fill="url(#paint0_linear_41_257)"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_41_257"
                    x="0.531494"
                    y="-171"
                    width="1172.93"
                    height="1228.05"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="225"
                      result="effect1_foregroundBlur_41_257"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_41_257"
                    x1="425.16"
                    y1="343.693"
                    x2="568.181"
                    y2="660.639"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#ABBCFF" />
                    <stop offset="0.859375" stopColor="#4A6CF7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Testimonial Slider */}
            <div className="relative overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 absolute inset-0 translate-x-full"
                  }`}
                >
                  <div className="-mx-4 flex flex-wrap items-center">
                    {/* Text Content */}
                    <div className="order-last w-full px-4 lg:order-first lg:w-1/2">
                      <div className="text-center lg:text-left">
                        <p className="text-slate-600 dark:text-slate-400 mb-9 text-base font-light lg:text-lg xl:text-2xl">
                          &ldquo;{testimonial.quote}
                        </p>
                        <h3 className="text-slate-900 mb-1 text-xl dark:text-white font-medium">
                          {testimonial.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-base">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="w-full px-4 lg:w-1/2">
                      <div className="relative mx-auto mb-9 aspect-square w-full max-w-105 lg:mb-0 lg:mr-0">
                        {/* Main Image */}
                        <div className="absolute right-5 top-5 z-10 h-full w-full">
                          <Image
                            alt={testimonial.name}
                            src={testimonial.image}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        </div>

                        {/* Background Frame */}
                        <div className="absolute -right-5 -top-5 -z-10 h-full w-full border border-blue-500/10 bg-blue-500/5 backdrop-blur-[6px] dark:border-white/10 dark:bg-white/10"></div>

                        {/* Wave Decoration */}
                        <div className="absolute -right-4 bottom-20 z-40">
                          <WaveDecoration />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-blue-500 w-8"
                      : "bg-slate-300 dark:bg-slate-600 hover:bg-blue-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
```

#### 1.5.11 โค้ดใน `components/landing/Blog.tsx`
```tsx
import Image from "next/image"
import Link from "next/link"

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Exploring MERN Stack: Powering Modern Web Development",
      slug: "exploring-the-mern-stack-powering-modern-web-development",
      image: "/images/blog/blog1.webp",
      tag: "Development",
      tagSlug: "development",
      author: "Jhon Doee",
      date: "Jun 18, 2023",
      datetime: "2023-06-18T12:15:00.000Z",
    },
    {
      id: 2,
      title: "Test webhook",
      slug: "best-ui-components-for-modern-websites",
      image: "/images/blog/blog2.webp",
      tag: "Design",
      tagSlug: "design",
      author: "Amrin",
      date: "Jun 25, 2023",
      datetime: "2023-06-25T05:29:00.000Z",
    },
    {
      id: 3,
      title: "The Power of UI/UX: Elevating Digital Experiences",
      slug: "the-power-of-uiux-elevating-digital-experiences",
      image: "/images/blog/blog3.webp",
      tag: "UI/UX",
      tagSlug: "uiux",
      author: "Jhon Doee",
      date: "Jun 18, 2023",
      datetime: "2023-06-18T23:52:00.000Z",
    },
  ]

  // Author Icon SVG
  const AuthorIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <path d="M15 16.5H13.5V15C13.5 14.4033 13.2629 13.831 12.841 13.409C12.419 12.9871 11.8467 12.75 11.25 12.75H6.75C6.15326 12.75 5.58097 12.9871 5.15901 13.409C4.73705 13.831 4.5 14.4033 4.5 15V16.5H3V15C3 14.0054 3.39509 13.0516 4.09835 12.3484C4.80161 11.6451 5.75544 11.25 6.75 11.25H11.25C12.2446 11.25 13.1984 11.6451 13.9016 12.3484C14.6049 13.0516 15 14.0054 15 15V16.5ZM9 9.75C8.40905 9.75 7.82389 9.63361 7.27792 9.40746C6.73196 9.18131 6.23588 8.84984 5.81802 8.43198C5.40015 8.01412 5.06869 7.51804 4.84254 6.97208C4.6164 6.42611 4.5 5.84095 4.5 5.25C4.5 4.65905 4.6164 4.07389 4.84254 3.52793C5.06869 2.98196 5.40015 2.48588 5.81802 2.06802C6.23588 1.65016 6.73196 1.31869 7.27792 1.09254C7.82389 0.866396 8.40905 0.75 9 0.75C10.1935 0.75 11.3381 1.22411 12.182 2.06802C13.0259 2.91193 13.5 4.05653 13.5 5.25C13.5 6.44348 13.0259 7.58807 12.182 8.43198C11.3381 9.2759 10.1935 9.75 9 9.75ZM9 8.25C9.79565 8.25 10.5587 7.93393 11.1213 7.37132C11.6839 6.80871 12 6.04565 12 5.25C12 4.45435 11.6839 3.69129 11.1213 3.12868C10.5587 2.56607 9.79565 2.25 9 2.25C8.20435 2.25 7.44129 2.56607 6.87868 3.12868C6.31607 3.69129 6 4.45435 6 5.25C6 6.04565 6.31607 6.80871 6.87868 7.37132C7.44129 7.93393 8.20435 8.25 9 8.25Z" />
    </svg>
  )

  // Calendar Icon SVG
  const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <path d="M12.75 2.25H15.75C15.9489 2.25 16.1397 2.32902 16.2803 2.46967C16.421 2.61032 16.5 2.80109 16.5 3V15C16.5 15.1989 16.421 15.3897 16.2803 15.5303C16.1397 15.671 15.9489 15.75 15.75 15.75H2.25C2.05109 15.75 1.86032 15.671 1.71967 15.5303C1.57902 15.3897 1.5 15.1989 1.5 15V3C1.5 2.80109 1.57902 2.61032 1.71967 2.46967C1.86032 2.32902 2.05109 2.25 2.25 2.25H5.25V0.75H6.75V2.25H11.25V0.75H12.75V2.25ZM11.25 3.75H6.75V5.25H5.25V3.75H3V6.75H15V3.75H12.75V5.25H11.25V3.75ZM15 8.25H3V14.25H15V8.25Z" />
    </svg>
  )

  return (
    <section id="blog" className="pt-14 sm:pt-20 lg:pt-32.5 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="relative mx-auto mb-12 max-w-155 pt-6 text-center md:mb-20 lg:pt-16">
          {/* Faded Title */}
          <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[80px] font-bold leading-none text-slate-100 dark:text-slate-800/50 select-none lg:text-[100px]">
            BLOGS
          </span>
          <h2 className="relative mb-5 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl md:text-[50px] md:leading-15">
            Latest News &amp; Articles From Our Blog
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam
            ante in maximus.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="w-full border-b pb-20 dark:border-slate-700">
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.id} className="group relative">
                {/* Image */}
                <div className="relative mb-8 aspect-video overflow-hidden rounded-md">
                  <Image
                    alt={post.title}
                    src={post.image}
                    fill
                    sizes="100vw"
                    className="h-full w-full object-cover duration-300 group-hover:scale-110"
                  />
                  {/* Tag Badge */}
                  <Link
                    href={`/blog/tag/${post.tagSlug}`}
                    className="bg-blue-600 absolute left-5 top-5 z-10 rounded-md px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition"
                  >
                    {post.tag}
                  </Link>
                </div>

                {/* Meta Info */}
                <dl className="mb-4 flex items-center gap-5">
                  {/* Author */}
                  <dt className="text-slate-600 dark:text-slate-400 flex items-center gap-2 text-base">
                    <AuthorIcon />
                    <span>{post.author}</span>
                  </dt>
                  <dd className="sr-only">Author</dd>

                  {/* Date */}
                  <dt className="text-slate-600 dark:text-slate-400 flex items-center gap-2 text-base">
                    <CalendarIcon />
                    <time dateTime={post.datetime}>{post.date}</time>
                  </dt>
                  <dd className="sr-only">Published At</dd>
                </dl>

                {/* Title */}
                <h3>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-slate-900 hover:text-blue-500 line-clamp-2 text-xl font-medium md:text-2xl lg:text-xl xl:text-2xl dark:text-white transition"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blog
```

#### 1.5.12 โค้ดใน `components/landing/CTA.tsx`
```tsx
import Link from "next/link"

function CTA() {
  return (
    <section className="pt-14 sm:pt-20 lg:pt-32.5 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
        <div className="relative overflow-hidden bg-cover bg-center px-10 py-15 sm:px-17.5 shadow-lg dark:shadow-none rounded-md">
          {/* Background */}
          <div className="absolute left-0 top-0 -z-10 h-full w-full bg-slate-50 dark:bg-slate-900/50 opacity-90"></div>

          {/* Background Gradient */}
          <div className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2">
            <svg
              width="1215"
              height="259"
              viewBox="0 0 1215 259"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6" filter="url(#filter0_f_63_363)">
                <rect
                  x="450"
                  y="189"
                  width="315"
                  height="378"
                  fill="url(#paint0_linear_63_363)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_63_363"
                  x="0"
                  y="-261"
                  width="1215"
                  height="1278"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="225"
                    result="effect1_foregroundBlur_63_363"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_63_363"
                  x1="420.718"
                  y1="263.543"
                  x2="585.338"
                  y2="628.947"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ABBCFF" />
                  <stop offset="0.859375" stopColor="#4A6CF7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Content */}
          <div className="-mx-4 flex flex-wrap items-center">
            {/* Text */}
            <div className="w-full px-4 lg:w-2/3">
              <div className="mx-auto mb-10 max-w-137.5 text-center lg:mb-0 lg:ml-0 lg:text-left">
                <h2 className="text-slate-900 mb-4 text-xl font-semibold leading-tight sm:text-[38px] dark:text-white">
                  Looking for a collaboration? Get Started Today!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="w-full px-4 lg:w-1/3">
              <div className="text-center lg:text-right">
                <Link
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 inline-flex items-center rounded-md px-8 py-3.5 text-base text-white font-medium transition"
                >
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
```

#### 1.5.13 โค้ดใน `components/landing/Footer.tsx`
```tsx
import Image from "next/image"
import Link from "next/link"

// Social Icons - defined outside component to avoid recreation on each render
const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
    <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" />
  </svg>
)

const TwitterIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.9831 19.25L9.82094 13.3176L4.61058 19.25H2.40625L8.843 11.9233L2.40625 2.75H8.06572L11.9884 8.34127L16.9034 2.75H19.1077L12.9697 9.73737L19.6425 19.25H13.9831ZM16.4378 17.5775H14.9538L5.56249 4.42252H7.04674L10.808 9.6899L11.4584 10.6039L16.4378 17.5775Z"
      fill="currentColor"
    />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
    <path d="M6.93994 5.00002C6.93968 5.53046 6.72871 6.03906 6.35345 6.41394C5.97819 6.78883 5.46938 6.99929 4.93894 6.99902C4.40851 6.99876 3.89991 6.78779 3.52502 6.41253C3.15014 6.03727 2.93968 5.52846 2.93994 4.99802C2.94021 4.46759 3.15117 3.95899 3.52644 3.5841C3.9017 3.20922 4.41051 2.99876 4.94094 2.99902C5.47137 2.99929 5.97998 3.21026 6.35486 3.58552C6.72975 3.96078 6.94021 4.46959 6.93994 5.00002ZM6.99994 8.48002H2.99994V21H6.99994V8.48002ZM13.3199 8.48002H9.33994V21H13.2799V14.43C13.2799 10.77 18.0499 10.43 18.0499 14.43V21H21.9999V13.07C21.9999 6.90002 14.9399 7.13002 13.2799 10.16L13.3199 8.48002Z" />
  </svg>
)

const BehanceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
    <path d="M7.443 5.34961C8.082 5.34961 8.673 5.39961 9.213 5.54761C9.70302 5.63765 10.1708 5.82244 10.59 6.09161C10.984 6.33861 11.279 6.68561 11.475 7.13061C11.672 7.57561 11.77 8.12061 11.77 8.71361C11.77 9.40661 11.623 9.99961 11.279 10.4446C10.984 10.8906 10.492 11.2856 9.902 11.5826C10.738 11.8306 11.377 12.2756 11.77 12.8686C12.164 13.4626 12.41 14.2046 12.41 15.0456C12.41 15.7386 12.262 16.3316 12.016 16.8266C11.77 17.3216 11.377 17.7666 10.934 18.0636C10.4528 18.382 9.92084 18.616 9.361 18.7556C8.771 18.9046 8.181 19.0036 7.591 19.0036H1V5.34961H7.443ZM7.049 10.8896C7.59 10.8896 8.033 10.7416 8.377 10.4946C8.721 10.2476 8.869 9.80161 8.869 9.25761C8.869 8.96061 8.819 8.66361 8.721 8.46661C8.623 8.26861 8.475 8.11961 8.279 7.97161C8.082 7.87261 7.885 7.77361 7.639 7.72461C7.393 7.67461 7.148 7.67461 6.852 7.67461H4V10.8906H7.05L7.049 10.8896ZM7.197 16.7276C7.492 16.7276 7.787 16.6776 8.033 16.6286C8.28138 16.5814 8.51628 16.48 8.721 16.3316C8.92139 16.1868 9.08903 16.0015 9.213 15.7876C9.311 15.5406 9.41 15.2436 9.41 14.8976C9.41 14.2046 9.213 13.7096 8.82 13.3636C8.426 13.0666 7.885 12.9186 7.246 12.9186H4V16.7286H7.197V16.7276ZM16.689 16.6776C17.082 17.0736 17.672 17.2716 18.459 17.2716C19 17.2716 19.492 17.1236 19.885 16.8766C20.279 16.5796 20.525 16.2826 20.623 15.9856H23.033C22.639 17.1726 22.049 18.0136 21.263 18.5576C20.475 19.0526 19.541 19.3496 18.41 19.3496C17.6864 19.3518 16.9688 19.2175 16.295 18.9536C15.6887 18.7262 15.148 18.3524 14.721 17.8656C14.2643 17.4102 13.9267 16.8494 13.738 16.2326C13.492 15.5896 13.393 14.8976 13.393 14.1056C13.393 13.3636 13.492 12.6716 13.738 12.0276C13.9745 11.4077 14.3245 10.8373 14.77 10.3456C15.213 9.90061 15.754 9.50561 16.344 9.25761C17.0007 8.99367 17.7022 8.8592 18.41 8.86161C19.246 8.86161 19.984 9.01061 20.623 9.35661C21.263 9.70261 21.754 10.0986 22.148 10.6926C22.5499 11.2631 22.8494 11.8993 23.033 12.5726C23.131 13.2646 23.18 13.9576 23.131 14.7486H16C16 15.5406 16.295 16.2826 16.689 16.6786V16.6776ZM19.787 11.4836C19.443 11.1376 18.902 10.9396 18.262 10.9396C17.82 10.9396 17.475 11.0386 17.18 11.1866C16.885 11.3356 16.689 11.5336 16.492 11.7316C16.311 11.9229 16.1912 12.1638 16.148 12.4236C16.098 12.6716 16.049 12.8686 16.049 13.0666H20.475C20.377 12.3246 20.131 11.8306 19.787 11.4836ZM15.459 6.28961H20.967V7.62561H15.46V6.28961H15.459Z" />
  </svg>
)

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" className="fill-current">
    <path d="M3.1175 1.17367L18.5025 9.63533C18.5678 9.6713 18.6223 9.72414 18.6602 9.78834C18.6982 9.85255 18.7182 9.92576 18.7182 10.0003C18.7182 10.0749 18.6982 10.1481 18.6602 10.2123C18.6223 10.2765 18.5678 10.3294 18.5025 10.3653L3.1175 18.827C3.05406 18.8619 2.98262 18.8797 2.91023 18.8785C2.83783 18.8774 2.76698 18.8575 2.70465 18.8206C2.64232 18.7838 2.59066 18.7313 2.55478 18.6684C2.51889 18.6056 2.50001 18.5344 2.5 18.462V1.53867C2.50001 1.46626 2.51889 1.39511 2.55478 1.33222C2.59066 1.26934 2.64232 1.21689 2.70465 1.18005C2.76698 1.1432 2.83783 1.12324 2.91023 1.12212C2.98262 1.121 3.05406 1.13877 3.1175 1.17367ZM4.16667 10.8337V16.3478L15.7083 10.0003L4.16667 3.65283V9.167H8.33333V10.8337H4.16667Z" />
  </svg>
)

function Footer() {
  const companyLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/" },
    { label: "Careers", href: "/", badge: "Hiring" },
    { label: "Pricing", href: "/" },
  ]

  const supportLinks = [
    { label: "Company", href: "/" },
    { label: "Press Media", href: "/" },
    { label: "Our Blog", href: "/blog" },
    { label: "Account", href: "/auth/signin" },
  ]

  return (
    <footer className="pt-14 sm:pt-20 lg:pt-32.5 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
        <div className="-mx-4 flex flex-wrap">
          {/* Logo & Description */}
          <div className="w-full px-4 sm:w-1/2 md:w-5/12 lg:w-3/12 xl:w-3/12">
            <div className="mb-20 max-w-82.5">
              <Link href="/" className="mb-6 inline-block">
                <Image
                  alt="logo"
                  width={215}
                  height={50}
                  className="hidden dark:block"
                  src="/images/logo/logo-dark.svg"
                />
                <Image
                  alt="logo"
                  width={215}
                  height={50}
                  className="dark:hidden"
                  src="/images/logo/logo-light.svg"
                />
              </Link>
              <p className="mb-10 text-base text-slate-600 dark:text-slate-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              {/* Social Links */}
              <div className="flex items-center space-x-5">
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  <FacebookIcon />
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  <TwitterIcon />
                </Link>
                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  <LinkedInIcon />
                </Link>
                <Link
                  href="#"
                  aria-label="Behance"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  <BehanceIcon />
                </Link>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-1/2 px-4 md:w-3/12 lg:w-3/12 xl:w-2/12">
            <div className="mb-20">
              <h3 className="mb-9 text-2xl font-medium text-slate-900 dark:text-white">
                Company
              </h3>
              <ul className="space-y-4">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-base text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="ml-4 rounded-md bg-blue-600 px-2 py-1 text-xs text-white">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-1/2 px-4 md:w-3/12 lg:w-3/12 xl:w-2/12">
            <div className="mb-20">
              <h3 className="mb-9 text-2xl font-medium text-slate-900 dark:text-white">
                Support
              </h3>
              <ul className="space-y-4">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-base text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="w-full px-4 sm:w-1/2 md:w-5/12 lg:w-3/12 xl:w-2/12">
            <div className="mb-20">
              <h3 className="mb-9 text-2xl font-medium text-slate-900 dark:text-white">
                Get in touch
              </h3>
              <div className="space-y-7">
                <div>
                  <p className="text-base text-slate-600 dark:text-slate-400">
                    Toll Free Customer Care
                  </p>
                  <Link
                    href="tel:+(1) 123 456 7890"
                    className="text-base text-slate-900 hover:text-blue-600 underline dark:text-white dark:hover:text-blue-400 transition"
                  >
                    +(1) 123 456 7890
                  </Link>
                </div>
                <div>
                  <p className="text-base text-slate-600 dark:text-slate-400">
                    Need live support?
                  </p>
                  <Link
                    href="mailto:support@domain.com"
                    className="text-base text-slate-900 hover:text-blue-600 underline dark:text-white dark:hover:text-blue-400 transition"
                  >
                    support@domain.com
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full px-4 sm:w-1/2 md:w-5/12 lg:w-5/12 xl:w-3/12">
            <div className="mb-20">
              <h3 className="text-slate-900 mb-9 text-2xl font-medium dark:text-white">
                Newsletter
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-base">
                Subscribe to receive future updates
              </p>
              <form className="relative">
                <input
                  placeholder="Email address"
                  className="text-slate-600 dark:text-slate-300 outline-none focus:border-blue-500 placeholder:text-slate-400 w-full rounded-md border border-slate-200 py-3 pl-5 pr-12 text-base dark:border-slate-700 dark:bg-slate-800"
                  type="email"
                  name="email"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-500 absolute right-0 top-0 flex h-full w-12 items-center justify-center border-l border-slate-200 dark:border-slate-700 transition"
                >
                  <SendIcon />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-700">
          <div className="-mx-4 flex flex-wrap py-5 md:py-7">
            {/* Bottom Links */}
            <div className="w-full px-4 md:w-1/2 lg:w-2/3">
              <div className="mb-5 flex items-center justify-center space-x-5 border-b border-slate-200 pb-5 dark:border-slate-700 md:mb-0 md:justify-start md:border-0 md:pb-0">
                <Link
                  href="#"
                  className="text-base text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  English
                </Link>
                <Link
                  href="#"
                  className="text-base text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-base text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  Support
                </Link>
              </div>
            </div>

            {/* Copyright */}
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div>
                <p className="text-center text-base text-slate-600 dark:text-slate-400 lg:text-right">
                  © 2026 Startup. All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
```

#### 1.5.14 โค้ดใน `components/landing/ScrollToTop.tsx`
```tsx
"use client"

import { useState, useEffect } from "react"

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current"
      >
        <path d="M10 3.33334L3.33337 10L4.51671 11.1833L9.16671 6.53334V16.6667H10.8334V6.53334L15.4834 11.1833L16.6667 10L10 3.33334Z" />
      </svg>
    </button>
  )
}

export default ScrollToTop
```

#### 1.5.15 แก้ไข `app/page.tsx`
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

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home | My AI Business",
  description: "Build and grow your AI-powered business with ease.",
  keywords: [
    "AI Business",
    "Artificial Intelligence",
    "AI Solutions",
    "Business Growth",
    "AI Tools",
    "Automation",
    "Machine Learning",
    "Data Analytics",
    "AI Services",
    "Tech Innovation",
  ],
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">

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
    </main>
  )
}
```

#### 1.5.16 `app/globals.css`
แก้ไขเพื่อให้รองรับโหมดมืด (Dark Mode) การทำ smooth scroll และการตั้งค่าฟอนต์
```css
@custom-variant dark (@media (prefers-color-scheme: dark));

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-inter), var(--font-anuphan), sans-serif;
  }
}
```

#### 1.5.17 แก้ไข `app/layout.tsx`
แก้ไขเพื่อเพิ่มฟอนต์ Google Fonts Anuphan และตั้งค่า Metadata ของเว็บไซต์
```tsx
import type { Metadata } from "next"
import { Inter, Anuphan } from "next/font/google"
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const anuphan = Anuphan({
  variable: "--font-anuphan",
  subsets: ["thai", "latin"],
})

export const metadata: Metadata = {
  title: "My AI Business",
  description: "Build and grow your AI-powered business with ease.",
}

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
        {children}
      </body>
    </html>
  )
}
```
#### 1.5.18 อัพเดท `README.md`
เพิ่มคำแนะนำการตั้งค่าโครงการและการพัฒนา Landing Page
```
# My AI Business 🚀

เว็บไซต์ Landing Page สำหรับธุรกิจ AI สร้างด้วย Next.js 16, React 19 และ Tailwind CSS 4

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## 📋 ภาพรวมโปรเจ็กต์

โปรเจ็กต์นี้เป็น Next.js Boilerplate สำหรับสร้างเว็บไซต์ธุรกิจ, Startup, Agency หรือ SaaS ประกอบด้วยการออกแบบที่ทันสมัยและ Components ที่พร้อมใช้งาน

## ✨ คุณสมบัติหลัก

- 🎨 **การออกแบบที่สวยงาม** - UI/UX ที่ทันสมัยและใช้งานง่าย
- 🌙 **รองรับ Dark Mode** - สลับโหมดสว่าง/มืดได้
- 📱 **Responsive Design** - รองรับทุกขนาดหน้าจอ
- ⚡ **ประสิทธิภาพสูง** - ใช้ Next.js App Router และ React Server Components
- 🎯 **SEO Ready** - พร้อมใช้งาน Metadata สำหรับ SEO

## 🏗️ โครงสร้างโปรเจ็กต์

landingpage/
├── app/
│   ├── globals.css      # Global Styles
│   ├── layout.tsx       # Root Layout
│   └── page.tsx         # หน้าหลัก
├── components/
│   ├── landing/             # Landing Page Components
│   │   ├── About.tsx        # ส่วนเกี่ยวกับเรา
│   │   ├── Blog.tsx         # ส่วนบทความ
│   │   ├── CTA.tsx          # Call to Action
│   │   ├── Features.tsx     # ส่วนคุณสมบัติ
│   │   ├── Footer.tsx       # ส่วนท้าย
│   │   ├── Hero.tsx         # ส่วนหัวหลัก
│   │   ├── Navbar.tsx       # แถบนำทาง
│   │   ├── ScrollToTop.tsx  # ปุ่มเลื่อนขึ้นบน
│   │   ├── Team.tsx         # ส่วนทีมงาน
│   │   └── Testimonial.tsx  # ส่วนรีวิว
│   └── ui/                  # UI Components ที่ใช้ซ้ำได้
│       └── button.tsx       # Button Component
├── lib/
│   └── utils.ts             # Utility Functions
├── public/
│   └── images/              # รูปภาพต่างๆ
│       ├── about/
│       ├── blog/
│       ├── hero/
│       ├── logo/
│       ├── team/
│       └── testimonial/
├── components.json          # shadcn/ui Configuration
├── eslint.config.mjs        # ESLint Configuration
├── next.config.ts           # Next.js Configuration
├── package.json             # Dependencies
├── postcss.config.mjs       # PostCSS Configuration
├── tailwind.config.ts       # Tailwind CSS Configuration
└── tsconfig.json            # TypeScript Configuration


## 🛠️ เทคโนโลยีที่ใช้

| เทคโนโลยี | เวอร์ชัน | คำอธิบาย |
|-----------|----------|----------|
| [Next.js](https://nextjs.org/) | 16.1.4 | React Framework สำหรับ Production |
| [React](https://react.dev/) | 19.2.3 | JavaScript Library สำหรับ UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | JavaScript with Types |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first CSS Framework |
| [Radix UI](https://www.radix-ui.com/) | - | Headless UI Components |
| [Lucide React](https://lucide.dev/) | 0.563.0 | Icon Library |
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | ClassName Utility |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.4.0 | Merge Tailwind Classes |

## 🚀 เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น

- Node.js 18.x หรือสูงกว่า
- npm, yarn, pnpm หรือ bun

### การติดตั้ง

1. **Clone โปรเจ็กต์**
   ```bash
   git clone <repository-url>
   cd my-ai-business
   ```

2. **ติดตั้ง Dependencies**
   ```bash
   npm install
   # หรือ
   yarn install
   # หรือ
   pnpm install
   # หรือ
   bun install
   ```

3. **รัน Development Server**
   ```bash
   npm run dev
   # หรือ
   yarn dev
   # หรือ
   pnpm dev
   # หรือ
   bun dev
   ```

4. **เปิดเบราว์เซอร์**
   
   เข้าไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

## 📜 คำสั่งที่ใช้บ่อย

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `npm run dev` | รัน Development Server |
| `npm run build` | Build โปรเจ็กต์สำหรับ Production |
| `npm run start` | รัน Production Server |
| `npm run lint` | ตรวจสอบโค้ดด้วย ESLint |

## 📁 รายละเอียด Components

### Landing Page Components

| Component | คำอธิบาย |
|-----------|----------|
| `Navbar` | แถบนำทางด้านบน พร้อมลิงก์ไปยังส่วนต่างๆ |
| `Hero` | ส่วนหัวหลักของหน้าเว็บ แสดงข้อความหลักและรูปภาพ |
| `Features` | แสดงคุณสมบัติหลักของบริการ |
| `About` | แสดงข้อมูลเกี่ยวกับบริษัท วิสัยทัศน์ และพันธกิจ |
| `Team` | แสดงข้อมูลทีมงาน |
| `Testimonial` | แสดงรีวิวจากลูกค้า |
| `Blog` | แสดงบทความล่าสุด |
| `CTA` | Call to Action ส่วนกระตุ้นให้ผู้ใช้ดำเนินการ |
| `Footer` | ส่วนท้ายเว็บไซต์ |
| `ScrollToTop` | ปุ่มเลื่อนขึ้นด้านบน |

## 🎨 การปรับแต่ง

### การแก้ไขเนื้อหา

- แก้ไขเนื้อหาในแต่ละ Component ที่ `components/landing/`
- แก้ไข Metadata ที่ `app/(landing)/page.tsx`

### การเปลี่ยนรูปภาพ

- เพิ่มรูปภาพใหม่ใน `public/images/` ตามโฟลเดอร์ที่เกี่ยวข้อง

### การปรับแต่ง Styles

- แก้ไข Global Styles ที่ `app/(landing)/globals.css`
- ใช้ Tailwind CSS Classes โดยตรงใน Components

## 🌐 การ Deploy

### Deploy บน Vercel (แนะนำ)

วิธีที่ง่ายที่สุดคือใช้ [Vercel Platform](https://vercel.com/new) จากผู้สร้าง Next.js

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

### Deploy บน Platform อื่นๆ

ดูรายละเอียดเพิ่มเติมที่ [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying)

## 📚 เรียนรู้เพิ่มเติม

- [Next.js Documentation](https://nextjs.org/docs) - เรียนรู้ฟีเจอร์และ API ของ Next.js
- [Learn Next.js](https://nextjs.org/learn) - บทเรียน Interactive สำหรับ Next.js
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - เรียนรู้การใช้งาน Tailwind CSS
- [React Documentation](https://react.dev/) - เรียนรู้ React

## 🤝 การมีส่วนร่วม

ยินดีรับ Pull Requests และ Issues! หากต้องการมีส่วนร่วมในการพัฒนา:

1. Fork โปรเจ็กต์
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจ็กต์นี้อยู่ภายใต้ MIT License

---

<p align="center">
  สร้างด้วย ❤️ โดยใช้ Next.js และ Tailwind CSS
</p>
```

#### 1.5.19 เพิ่มคำสั่ง Git

จบส่วนของการพัฒนา Landing Page ให้ทำการ commit โค้ดทั้งหมดลงใน Git repository และทำการแยก branch สำหรับการพัฒนา Blog ต่อไป

```base
git add .
git commit -m "Complete Landing Page development with Next.js"
git checkout -b feature/blog-development
```
---

### Section 2: Building the Blog System (SEO Friendly)
- ออกแบบ Database Schema สำหรับบทความ (Title, Slug, Content, Cover Image)
- การดึงข้อมูลมาแสดงผลแบบ Server Side Rendering (SSR) เพื่อผลดีต่อ SEO
- การทำหน้าอ่านบทความ (Article Detail)
- Workshop: สร้างระบบ Blog ที่รองรับ Dynamic Content

#### 2.1 รู้จัก Payload CMS
- แนะนำ Payload CMS และการติดตั้ง
- การสร้าง Collection สำหรับบทความ
- การเชื่อมต่อ Next.js กับ Payload CMS

**Payload CMS** (https://payloadcms.com/) เป็น Headless CMS ที่ยืดหยุ่นและทรงพลัง ช่วยให้คุณสร้างและจัดการเนื้อหาได้อย่างง่ายดายผ่าน API มีฟีเจอร์ครบครัน เช่น การจัดการ Media, User Authentication, และ GraphQL API รองรับการปรับแต่งสูง เหมาะสำหรับการพัฒนาเว็บแอปพลิเคชันที่ต้องการระบบจัดการเนื้อหาที่มีประสิทธิภาพ

**ทำไม Payload CMS ถึงเหมาะกับ Next.js?**
- **Native Next.js Integration (Payload 3.0):** เวอร์ชันล่าสุดของ Payload สามารถรัน "ข้างใน" Next.js App Router ได้เลย (ไม่ต้องรัน Server แยกเหมือน CMS ตัวเก่าๆ) ทำให้เรา Deploy ขึ้น Vercel ได้ในโปรเจกต์เดียว จบ! ประหยัดค่า Server และดูแลรักษาง่าย
- **API ที่ยืดหยุ่น:** Payload มี RESTful API และ GraphQL API ที่ช่วยให้ Next.js ดึงข้อมูลได้ง่าย
- **Customizable Admin Panel:** สามารถปรับแต่งหน้าจัดการเนื้อหาให้เหมาะกับความต้องการของโปรเจกต์ได้
- **Strong TypeScript Support:** Payload เขียนด้วย TypeScript ทำให้การพัฒนาใน Next.js ที่ใช้ TypeScript
- **Authentication & Access Control:** มีระบบการจัดการผู้ใช้และสิทธิ์การเข้าถึงที่แข็งแกร่ง
- **Media Management:** มีระบบจัดการไฟล์สื่อที่ใช้งานง่าย
- **Webhooks & Integrations:** รองรับการเชื่อมต่อกับบริการภายนอกผ่าน Webhooks
- **Headless for AI:** ข้อมูลใน Payload เป็น JSON ดึงไปทำ RAG (ให้ AI อ่าน) ได้ง่ายมาก ซึ่งตรงโจทย์หลักสูตรสุดๆ

**Payload CMS รองรับฐานข้อมูล:**
- MongoDB with Mongoose
- PostgreSQL with Dizzy ORM
- SQLite with Dizzy ORM

#### 2.2 เตรียม Database (PostgreSQL)
ก่อนติดตั้ง Payload CMS เราต้องมีฐานข้อมูล PostgreSQL พร้อมใช้งาน สามารถใช้บริการฐานข้อมูลบนคลาวด์ เช่น Supabase, Neon, หรือ Railway หรือติดตั้ง PostgreSQL บนเครื่องของคุณเองก็ได้

สร้างฐานข้อมูลใหม่สำหรับโปรเจกต์นี้ เช่น `blog_db`

```bash
# Login เข้า PostgreSQL
psql -U postgres

# สร้างฐานข้อมูลใหม่
CREATE DATABASE blog_db;

# แสดงรายการฐานข้อมูล
\l

# ออกจาก psql
\q
```
#### 2.3 การขึ้นโครงโปรเจกต์ Blog ด้วย Next.js และ Shadcn UI
**คุณสมบัติของ Landing Page ที่จะสร้าง:**
- ใช้ Next.js 16 App Router
- ใช้ Shadcn UI สำหรับ UI Components
- ติดตั้ง Payload CMS สำหรับจัดการบทความ

**สร้างโปรเจกต์ Next.js ใหม่:**
```bash
npx create-next-app@latest blog
```
หลังติดตั้งเสร็จทดสอบรันโปรเจกต์:
```bash
cd blog
npm run dev;
```

#### 2.4 ติดตั้ง Shadcn UI:
```bash
npx shadcn@latest init
```
ผลลัพธ์ที่ได้:
```
✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS config. Found v4.
✔ Validating import alias.
√ Which color would you like to use as the base color? » Neutral
✔ Writing components.json.
✔ Checking registry.
✔ Updating CSS variables in app\globals.css
✔ Installing dependencies.
✔ Created 1 file:
  - lib\utils.ts

Success! Project initialization completed.
You may now add components.
```

**เพิ่มเติมคอมโพเนนต์ที่ต้องการ:**
```bash
npx shadcn@latest add button
```
ผลลัพธ์ที่ได้:
```
✔ Checking registry.
✔ Installing dependencies.
✔ Created 1 file:
  - components\ui\button.tsx
```

**ทดสอบใช้งาน Shadcn/ui**
แก้ไขไฟล์ `app/page.tsx` ดังนี้:
```tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button>Button</Button>
    </div>
  )
}
```

#### 2.5 การติดตั้ง Payload CMS ลงในโปรเจ็กต์ Next.js
ติดตั้ง Payload CMS และ dependencies ที่จำเป็น

```bash
npm install payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical graphql sharp --legacy-peer-deps
```
อธิบาย dependencies:
- `payload`: Core library ของ Payload CMS
- `@payloadcms/next`: Integration สำหรับ Next.js
- `@payloadcms/db-postgres`: PostgreSQL database adapter
- `@payloadcms/richtext-lexical`: Rich Text Editor สำหรับ Payload
- `graphql`: สำหรับ GraphQL API
- `sharp`: สำหรับการจัดการรูปภาพ

#### 2.6 ตั้งค่า Environment Variables
สร้างไฟล์ .env ในโฟลเดอร์รากของโปรเจ็กต์ Next.js และเพิ่มค่าต่อไปนี้:
```
# Connection String ของฐานข้อมูล PostgreSQL
DATABASE_URI="postgresql://postgres:123456@localhost:5432/blog_db"
# สร้างรหัสอะไรก็ได้ยาวๆ สำหรับความปลอดภัย
PAYLOAD_SECRET=61ae0a16499462703189bf6fc2dab3d53e790f3af75b1e801b0e7bb10e299df6
```

#### 2.7 คัดลอกโฟลเดอร์ Payload CMS
สร้างโฟลเดอร์ `payload/` ในรากของโปรเจ็กต์ Next.js จะได้โครงสร้างดังนี้:
```
app/
├─ (landing)/
├── // Your app files
├─ (payload)/
├── // Payload files
``` 

#### 2.8 สร้าง Collection Users และ Media
สร้างไฟล์ `collections/Users.ts` สำหรับจัดการผู้ใช้
```ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
```
สร้างไฟล์ `collections/Media.ts` สำหรับจัดการสื่อ
```ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
```

#### 2.9 สร้างไฟล์ Config ของ Payload
สร้างไฟล์ `payload.config.ts` เพื่อกำหนดการตั้งค่าของ Payload CMS
```ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(), // ตัวเขียนบทความแบบใหม่
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [],
})
```

#### 2.10 อัปเดต Next.js Config
แก้ไขไฟล์ `next.config.ts` เพื่อให้ Next.js ยอมรับ Payload
```ts
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // คงค่า Config เดิมของคุณไว้ตรงนี้
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

// ใช้ withPayload ครอบ export default
export default withPayload(nextConfig)
```

#### 2.11 แก้ไขไฟล์ `tsconfig.json`
เพิ่มการตั้งค่า paths เพื่อให้ TypeScript รู้จัก Payload CMS
```json
{
  "compilerOptions": {
    "paths": {
      "@payload-config": ["./payload.config.ts"]
    }
  }
}
```

#### 2.12 รัน Payload CMS 
```bash
npm run dev
```
หลังจากรันคำสั่งนี้แล้ว คุณจะสามารถเข้าถึงแอดมินของ Payload CMS ได้ที่ [http://localhost:3000/admin](http://localhost:3000/admin)

#### 2.13 สร้างบัญชีผู้ดูแลระบบ
เมื่อเข้าถึงแอดมินครั้งแรก ระบบจะให้คุณสร้างบัญชีผู้ดู
ป้อนอีเมลและรหัสผ่าน จากนั้นคลิก "Create"

#### 2.14 สร้าง Collection สำหรับบทความ
สร้างไฟล์ `collections/Posts.ts` สำหรับจัดการบทความ
```ts
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
      useAsTitle: 'title',
    },
    fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'URL-friendly identifier (e.g., my-blog-post)',
          },
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'tag',
          type: 'text',
          admin: {
            description: 'Category tag (e.g., Development, Design)',
          },
        },
        {
          name: 'author',
          type: 'text',
          defaultValue: 'Admin',
        },
        {
          name: 'publishedAt',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
}
```

#### 2.15 อัปเดต `payload.config.ts` เพื่อเพิ่ม Collection Posts
```ts
import { Posts } from './collections/Posts'

collections: [Posts, Users, Media],
```

#### 2.16 สร้าง Blog Layout และ Page
สร้างไฟล์ `app/(landing)/blog/page.tsx` เพื่อแสดงรายการบทความ
```tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config' // Payload จะสร้าง alias นี้ให้
import Link from 'next/link'
import Image from 'next/image'

export default async function BlogIndex() {
  const payload = await getPayload({ config: configPromise })

  // ดึงข้อมูลบทความจาก Collection 'posts' (ที่คุณจะสร้างใน Payload)
  const posts = await payload.find({
    collection: 'posts',
    limit: 10,
  })

  return (
    <div className="container mx-auto pt-36 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">บทความของเรา</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.docs.map((post: any) => (
          <div key={post.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
             {/* ตัวอย่างการแสดงผล (ต้องปรับตาม Field ที่คุณสร้างจริง) */}
            {post.coverImage && (
               <div className="relative h-48 w-full">
                 <Image 
                   src={post.coverImage.url} 
                   alt={post.title} 
                   fill 
                   className="object-cover"
                 />
               </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                อ่านเพิ่มเติม &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

สร้างไฟล์ `app/(landing)/blog/[slug]/page.tsx` เพื่อแสดงรายละเอียดบทความ
```tsx
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  
  const posts = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = posts.docs[0]
  
  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.title,
  }
}

// Author Icon SVG
const AuthorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor">
    <path d="M15 16.5H13.5V15C13.5 14.4033 13.2629 13.831 12.841 13.409C12.419 12.9871 11.8467 12.75 11.25 12.75H6.75C6.15326 12.75 5.58097 12.9871 5.15901 13.409C4.73705 13.831 4.5 14.4033 4.5 15V16.5H3V15C3 14.0054 3.39509 13.0516 4.09835 12.3484C4.80161 11.6451 5.75544 11.25 6.75 11.25H11.25C12.2446 11.25 13.1984 11.6451 13.9016 12.3484C14.6049 13.0516 15 14.0054 15 15V16.5ZM9 9.75C8.40905 9.75 7.82389 9.63361 7.27792 9.40746C6.73196 9.18131 6.23588 8.84984 5.81802 8.43198C5.40015 8.01412 5.06869 7.51804 4.84254 6.97208C4.6164 6.42611 4.5 5.84095 4.5 5.25C4.5 4.65905 4.6164 4.07389 4.84254 3.52793C5.06869 2.98196 5.40015 2.48588 5.81802 2.06802C6.23588 1.65016 6.73196 1.31869 7.27792 1.09254C7.82389 0.866396 8.40905 0.75 9 0.75C10.1935 0.75 11.3381 1.22411 12.182 2.06802C13.0259 2.91193 13.5 4.05653 13.5 5.25C13.5 6.44348 13.0259 7.58807 12.182 8.43198C11.3381 9.2759 10.1935 9.75 9 9.75ZM9 8.25C9.79565 8.25 10.5587 7.93393 11.1213 7.37132C11.6839 6.80871 12 6.04565 12 5.25C12 4.45435 11.6839 3.69129 11.1213 3.12868C10.5587 2.56607 9.79565 2.25 9 2.25C8.20435 2.25 7.44129 2.56607 6.87868 3.12868C6.31607 3.69129 6 4.45435 6 5.25C6 6.04565 6.31607 6.80871 6.87868 7.37132C7.44129 7.93393 8.20435 8.25 9 8.25Z" />
  </svg>
)

// Calendar Icon SVG
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor">
    <path d="M12.75 2.25H15.75C15.9489 2.25 16.1397 2.32902 16.2803 2.46967C16.421 2.61032 16.5 2.80109 16.5 3V15C16.5 15.1989 16.421 15.3897 16.2803 15.5303C16.1397 15.671 15.9489 15.75 15.75 15.75H2.25C2.05109 15.75 1.86032 15.671 1.71967 15.5303C1.57902 15.3897 1.5 15.1989 1.5 15V3C1.5 2.80109 1.57902 2.61032 1.71967 2.46967C1.86032 2.32902 2.05109 2.25 2.25 2.25H5.25V0.75H6.75V2.25H11.25V0.75H12.75V2.25ZM11.25 3.75H6.75V5.25H5.25V3.75H3V6.75H15V3.75H12.75V5.25H11.25V3.75ZM15 8.25H3V14.25H15V8.25Z" />
  </svg>
)

// Format date helper
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

// Render Rich Text Content
function RichTextContent({ content }: { content: any }) {
  if (!content?.root?.children) return null

  const renderNode = (node: any, index: number): React.ReactNode => {
    if (node.type === 'paragraph') {
      return (
        <p key={index} className="mb-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </p>
      )
    }

    if (node.type === 'heading') {
      const level = node.tag || 2
      const className = "mt-10 mb-4 text-2xl font-bold text-slate-900 dark:text-white"
      const children = node.children?.map((child: any, i: number) => renderNode(child, i))
      
      switch (level) {
        case 1: return <h1 key={index} className={className}>{children}</h1>
        case 2: return <h2 key={index} className={className}>{children}</h2>
        case 3: return <h3 key={index} className={className}>{children}</h3>
        case 4: return <h4 key={index} className={className}>{children}</h4>
        case 5: return <h5 key={index} className={className}>{children}</h5>
        case 6: return <h6 key={index} className={className}>{children}</h6>
        default: return <h2 key={index} className={className}>{children}</h2>
      }
    }

    if (node.type === 'list') {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag key={index} className={`mb-6 pl-6 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'} text-lg text-slate-700 dark:text-slate-300`}>
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </ListTag>
      )
    }

    if (node.type === 'listitem') {
      return (
        <li key={index} className="mb-2">
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </li>
      )
    }

    if (node.type === 'quote') {
      return (
        <blockquote key={index} className="my-8 border-l-4 border-blue-500 pl-6 italic text-xl text-slate-600 dark:text-slate-400">
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </blockquote>
      )
    }

    if (node.type === 'text') {
      let text: React.ReactNode = node.text

      if (node.format & 1) text = <strong key={index}>{text}</strong>
      if (node.format & 2) text = <em key={index}>{text}</em>
      if (node.format & 8) text = <u key={index}>{text}</u>
      if (node.format & 16) text = <code key={index} className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">{text}</code>

      return text
    }

    if (node.type === 'link') {
      return (
        <a key={index} href={node.url} className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </a>
      )
    }

    return null
  }

  return (
    <div className="prose-content">
      {content.root.children.map((node: any, index: number) => renderNode(node, index))}
    </div>
  )
}

export default async function BlogDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  // ดึงข้อมูลบทความจาก Collection 'posts'
  const posts = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = posts.docs[0]

  if (!post) {
    notFound()
  }

  const coverImage = post.coverImage as { url?: string; alt?: string } | null
  const imageUrl = coverImage?.url || '/images/blog/blog1.webp'

  // ดึงบทความที่เกี่ยวข้อง (ล่าสุด 3 บทความ ยกเว้นบทความปัจจุบัน)
  const relatedPosts = await payload.find({
    collection: 'posts',
    where: { slug: { not_equals: slug } },
    limit: 3,
    sort: '-publishedAt',
  })

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* Hero Section */}
      <header className="relative pt-28 pb-16 lg:pt-36 lg:pb-24">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />
        
        <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-500 transition">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-blue-500 transition">Blog</Link>
              </li>
              <li>/</li>
              <li className="text-slate-900 dark:text-white font-medium truncate max-w-xs">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Tag */}
          {post.tag && (
            <span className="inline-block mb-6 bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-full">
              {post.tag}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-8 max-w-4xl">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-400">
            {post.author && (
              <div className="flex items-center gap-2">
                <AuthorIcon />
                <span className="text-base">{post.author}</span>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <CalendarIcon />
                <time dateTime={post.publishedAt} className="text-base">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto mb-12 lg:mb-16">
        <div className="relative aspect-video max-w-5xl mx-auto overflow-hidden rounded-xl shadow-lg">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto pb-16 lg:pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Rich Text Content */}
          {post.content ? (
            <RichTextContent content={post.content} />
          ) : (
            <p className="text-lg text-slate-600 dark:text-slate-400">
              No content available for this post.
            </p>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Share this article
            </h3>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-500 text-slate-600 dark:text-slate-400 transition"
                aria-label="Share on Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-600 dark:text-slate-400 transition"
                aria-label="Share on Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-700 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-700 text-slate-600 dark:text-slate-400 transition"
                aria-label="Share on LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.docs.length > 0 && (
        <section className="bg-slate-50 dark:bg-slate-900 py-16 lg:py-24">
          <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-10">
              Related Articles
            </h2>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.docs.map((relatedPost) => {
                const relatedCoverImage = relatedPost.coverImage as { url?: string } | null
                const relatedImageUrl = relatedCoverImage?.url || '/images/blog/blog1.webp'
                
                return (
                  <article key={relatedPost.id} className="group">
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                        <Image
                          src={relatedImageUrl}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {relatedPost.tag && (
                          <span className="absolute left-4 top-4 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-md">
                            {relatedPost.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-500 transition line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      {relatedPost.publishedAt && (
                        <time className="text-sm text-slate-500 dark:text-slate-400 mt-2 block">
                          {formatDate(relatedPost.publishedAt)}
                        </time>
                      )}
                    </Link>
                  </article>
                )
              })}
            </div>

            {/* View All Button */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
              >
                View All Articles
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z" fill="currentColor" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
```

สร้างไฟล์ `app/(landing)/blog/layout.tsx` สำหรับ Layout ของ Blog
```tsx
import Navbar from "@/components/landing/Navbar"
import Footer from "@/components/landing/Footer"
import ScrollToTop from "@/components/landing/ScrollToTop"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
    </main>
  )
}
```
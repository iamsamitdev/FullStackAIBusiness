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

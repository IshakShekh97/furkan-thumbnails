import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import { Navbar } from "@/components/Navbar"
import ScrollingGallery from "@/components/ScrollingGallary"
import Testimonials from "@/components/Testimonials"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="min-h-screen overflow-x-hidden">
        <Hero />
        <ScrollingGallery />
        <Testimonials />
        <ContactForm />
        <Footer />
      </div>
    </main>
  )
}


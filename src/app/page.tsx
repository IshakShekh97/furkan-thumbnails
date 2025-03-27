import Categories from "@/components/Categories"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import { Navbar } from "@/components/Navbar"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="min-h-screen">
        <Hero />
        <Categories />
        <ContactForm />
        <Footer />
      </div>
    </main>
  )
}


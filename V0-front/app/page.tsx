import Image from "next/image"
import Link from "next/link"
import { Plane } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full z-10 absolute top-0">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-white">
            <Plane className="h-5 w-5" />
            <span className="text-xl font-medium">Ushuaia Excursions</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#excursiones" className="text-white hover:text-white/80">
              Excursiones
            </Link>
            <Link href="#sobre-nosotros" className="text-white hover:text-white/80">
              Sobre Nosotros
            </Link>
            <Link href="#contacto" className="text-white hover:text-white/80">
              Contacto
            </Link>
            <Link
              href="/arma-tu-paquete"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Arma tu paquete
            </Link>
          </nav>
          <button className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative h-screen w-full">
          <div className="absolute inset-0">
            <Image
              src="/ushuaia-background.jpg"
              alt="Paisaje de Ushuaia con montañas nevadas"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-5xl">Descubre el Fin del Mundo</h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl">
              Explora los impresionantes paisajes y experiencias únicas que Ushuaia tiene para ofrecer.
            </p>
          </div>
        </section>

        <section id="excursiones" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestras Excursiones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Aquí irían las tarjetas de excursiones */}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

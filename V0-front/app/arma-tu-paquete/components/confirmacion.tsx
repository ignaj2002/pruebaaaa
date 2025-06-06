import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { ReservaData } from "../page"

interface ConfirmacionProps {
  reservaData: ReservaData
}

export function Confirmacion({ reservaData }: ConfirmacionProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">¡Reserva Confirmada!</h1>
          <p className="text-gray-300 mb-6">
            Gracias por elegir Ushuaia Excursions. Hemos enviado un correo electrónico con los detalles a su correo
            electrónico.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">Código de Reserva:</h2>
          <p className="text-2xl font-bold text-blue-400 tracking-wider">{reservaData.codigoReserva}</p>
        </div>

        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700">Volver al Inicio</Button>
        </Link>
      </div>
    </div>
  )
}

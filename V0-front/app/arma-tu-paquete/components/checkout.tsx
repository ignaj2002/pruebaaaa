"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import type { ReservaData } from "../page"

interface CheckoutProps {
  data: ReservaData
  updateData: (data: Partial<ReservaData>) => void
  onNext: () => void
  onPrev: () => void
}

export function Checkout({ data, updateData, onNext, onPrev }: CheckoutProps) {
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [sendEmail, setSendEmail] = useState(true)

  const calcularTotal = () => {
    let total = 0

    // Alojamiento
    const preciosAlojamiento: { [key: string]: number } = {
      "suite-ejecutiva": 259,
      "habitacion-deluxe": 199,
      "suite-familiar": 249,
    }

    const diasEstadia =
      data.fechaLlegada && data.fechaSalida
        ? Math.ceil((data.fechaSalida.getTime() - data.fechaLlegada.getTime()) / (1000 * 60 * 60 * 24))
        : 1

    if (data.alojamiento) {
      total += (preciosAlojamiento[data.alojamiento] || 0) * diasEstadia
    }

    // Excursiones
    if (data.excursiones && data.excursiones.length > 0) {
      data.excursiones.forEach((excursion) => {
        total += excursion.precio * (data.adultos + data.ninos)
      })
    }

    // Restaurantes
    if (data.restaurantes && data.restaurantes.length > 0) {
      data.restaurantes.forEach((restaurante) => {
        total += restaurante.precio * (data.adultos + data.ninos)
      })
    }

    // Extras
    if (data.extras && data.extras.length > 0) {
      data.extras.forEach((extra) => {
        total += extra.precio
      })
    }

    return total
  }

  const handleConfirmarReserva = () => {
    if (!acceptTerms) return

    const codigoReserva = "F0BZZ0R"
    const total = calcularTotal()

    updateData({
      codigoReserva,
      total,
    })

    onNext()
  }

  const total = calcularTotal()
  const descuento = total * 0.1 // 10% descuento
  const totalFinal = total - descuento

  const diasEstadia =
    data.fechaLlegada && data.fechaSalida
      ? Math.ceil((data.fechaSalida.getTime() - data.fechaLlegada.getTime()) / (1000 * 60 * 60 * 24))
      : 1

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Resumen de Reserva */}
      <div className="bg-teal-700 rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Resumen de Reserva</h2>

        <div className="space-y-2 mb-4">
          <p>
            <span className="font-medium">Huésped:</span> {data.contacto.nombre}
          </p>
          <p>
            <span className="font-medium">Fechas:</span> {data.fechaLlegada?.toLocaleDateString()} -{" "}
            {data.fechaSalida?.toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">
              {diasEstadia} noches x $
              {data.alojamiento === "suite-ejecutiva" ? 259 : data.alojamiento === "habitacion-deluxe" ? 199 : 249}
            </span>
          </p>
          <p>
            <span className="font-medium">Alojamiento:</span>{" "}
            {data.alojamiento === "suite-ejecutiva"
              ? "Suite Ejecutiva"
              : data.alojamiento === "habitacion-deluxe"
                ? "Habitación Deluxe"
                : "Suite Familiar"}
          </p>
        </div>

        <Separator className="my-4 bg-teal-600" />

        <div className="text-right">
          <p className="text-2xl font-bold">${totalFinal}</p>
        </div>
      </div>

      {/* Detalles */}
      <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Detalles</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600">
              Extras
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600">
              Pago
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Información de Contacto</h3>
          <div className="text-sm text-gray-300 space-y-1">
            <p>
              <span className="font-medium">Nombre completo:</span> {data.contacto.nombre}
            </p>
            <p>
              <span className="font-medium">Correo electrónico:</span> {data.contacto.email}
            </p>
            <p>
              <span className="font-medium">Teléfono:</span> {data.contacto.telefono}
            </p>
            <p>
              <span className="font-medium">DNI:</span> {data.contacto.dni}
            </p>
          </div>
        </div>

        <Separator className="my-6 bg-gray-700" />

        <div className="mb-6">
          <h3 className="font-semibold mb-4">Detalles de Reserva</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>
                {data.alojamiento === "suite-ejecutiva"
                  ? "Suite Ejecutiva"
                  : data.alojamiento === "habitacion-deluxe"
                    ? "Habitación Deluxe"
                    : "Suite Familiar"}
              </span>
              <span>
                $
                {data.alojamiento === "suite-ejecutiva"
                  ? 259 * diasEstadia
                  : data.alojamiento === "habitacion-deluxe"
                    ? 199 * diasEstadia
                    : 249 * diasEstadia}
              </span>
            </div>
            <p className="text-sm text-gray-400">
              {diasEstadia} noches x $
              {data.alojamiento === "suite-ejecutiva" ? 259 : data.alojamiento === "habitacion-deluxe" ? 199 : 249}
            </p>

            {data.excursiones?.map((excursion, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <span>{excursion.nombre}</span>
                  <span>${excursion.precio * (data.adultos + data.ninos)}</span>
                </div>
                <p className="text-sm text-gray-400">Excursión - {excursion.duracion}</p>
              </div>
            ))}

            {data.restaurantes?.map((restaurante, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <span>{restaurante.nombre}</span>
                  <span>${restaurante.precio * (data.adultos + data.ninos)}</span>
                </div>
              </div>
            ))}

            {data.extras?.map((extra, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <span>{extra.nombre}</span>
                  <span>${extra.precio}</span>
                </div>
              </div>
            ))}

            <div className="flex justify-between text-green-400">
              <span>Descuento paquete</span>
              <span>-${descuento.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-400">10% en excursiones</p>
          </div>
        </div>

        <Separator className="my-6 bg-gray-700" />

        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>${totalFinal}</span>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Información importante</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Hora de Check-in: 14:00</li>
            <li>• Hora de Check-out: 10:00</li>
            <li>• Por favor presente su código de reserva al momento de su llegada</li>
            <li>• Política de Cancelación: Gratuita hasta 72 horas antes de su llegada</li>
          </ul>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="email-confirmation" checked={sendEmail} onCheckedChange={setSendEmail} />
            <label htmlFor="email-confirmation" className="text-sm">
              Enviar confirmación por correo electrónico con PDF adjunto a {data.contacto.email}
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrev} className="bg-gray-700 border-gray-600">
            Volver a Extras
          </Button>
          <Button onClick={handleConfirmarReserva} className="bg-blue-600 hover:bg-blue-700" disabled={!acceptTerms}>
            Confirmar Reserva
          </Button>
        </div>
      </div>
    </div>
  )
}

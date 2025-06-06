"use client"

import { useState } from "react"
import Link from "next/link"
import { Plane } from "lucide-react"
import { StepIndicator } from "./components/step-indicator"
import { InformacionPersonal } from "./components/informacion-personal"
import { DetallesReserva } from "./components/detalles-reserva"
import { Extras } from "./components/extras"
import { DatosContacto } from "./components/datos-contacto"
import { Checkout } from "./components/checkout"
import { Confirmacion } from "./components/confirmacion"

export interface ReservaData {
  tienePasaje: boolean
  fechaLlegada: Date | undefined
  fechaSalida: Date | undefined
  adultos: number
  ninos: number
  alojamiento: string
  requerimientos: string
  excursiones: any[]
  restaurantes: any[]
  extras: any[]
  contacto: {
    nombre: string
    email: string
    telefono: string
    dni: string
  }
  total: number
  codigoReserva: string
}

export default function ArmarPaquete() {
  const [currentStep, setCurrentStep] = useState(1)
  const [reservaData, setReservaData] = useState<ReservaData>({
    tienePasaje: false,
    fechaLlegada: undefined,
    fechaSalida: undefined,
    adultos: 2,
    ninos: 0,
    alojamiento: "",
    requerimientos: "",
    excursiones: [],
    restaurantes: [],
    extras: [],
    contacto: {
      nombre: "",
      email: "",
      telefono: "",
      dni: "",
    },
    total: 0,
    codigoReserva: "",
  })

  const steps = [
    { number: 1, title: "Información Personal", completed: currentStep > 1 },
    { number: 2, title: "Detalles de Reserva", completed: currentStep > 2 },
    { number: 3, title: "Extras", completed: currentStep > 3 },
    { number: 4, title: "Datos de Contacto", completed: currentStep > 4 },
    { number: 5, title: "Checkout", completed: currentStep > 5 },
  ]

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateReservaData = (data: Partial<ReservaData>) => {
    setReservaData((prev) => ({ ...prev, ...data }))
  }

  if (currentStep === 6) {
    return <Confirmacion reservaData={reservaData} />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-5 w-5" />
              <span className="text-xl font-medium">Ushuaia Excursions</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="mt-8">
          {currentStep === 1 && (
            <InformacionPersonal
              data={reservaData}
              updateData={updateReservaData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 2 && (
            <DetallesReserva data={reservaData} updateData={updateReservaData} onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 3 && (
            <Extras data={reservaData} updateData={updateReservaData} onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 4 && (
            <DatosContacto data={reservaData} updateData={updateReservaData} onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 5 && (
            <Checkout data={reservaData} updateData={updateReservaData} onNext={nextStep} onPrev={prevStep} />
          )}
        </div>
      </main>
    </div>
  )
}

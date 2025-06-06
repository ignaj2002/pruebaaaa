"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ReservaData } from "../page"

interface DatosContactoProps {
  data: ReservaData
  updateData: (data: Partial<ReservaData>) => void
  onNext: () => void
  onPrev: () => void
}

export function DatosContacto({ data, updateData, onNext, onPrev }: DatosContactoProps) {
  const [errors, setErrors] = useState<string[]>([])

  const handleNext = () => {
    const newErrors: string[] = []

    if (!data.contacto.nombre) newErrors.push("Nombre es requerido")
    if (!data.contacto.email) newErrors.push("Email es requerido")
    if (!data.contacto.telefono) newErrors.push("Teléfono es requerido")
    if (!data.contacto.dni) newErrors.push("DNI es requerido")

    setErrors(newErrors)

    if (newErrors.length === 0) {
      onNext()
    }
  }

  const updateContacto = (field: string, value: string) => {
    updateData({
      contacto: {
        ...data.contacto,
        [field]: value,
      },
    })
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Datos de Contacto</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="nombre" className="block mb-2">
            Nombre completo *
          </Label>
          <Input
            id="nombre"
            type="text"
            value={data.contacto.nombre}
            onChange={(e) => updateContacto("nombre", e.target.value)}
            className="bg-gray-700 border-gray-600"
            placeholder="Ingrese su nombre completo"
          />
        </div>

        <div>
          <Label htmlFor="email" className="block mb-2">
            Correo electrónico *
          </Label>
          <Input
            id="email"
            type="email"
            value={data.contacto.email}
            onChange={(e) => updateContacto("email", e.target.value)}
            className="bg-gray-700 border-gray-600"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div>
          <Label htmlFor="telefono" className="block mb-2">
            Número de teléfono *
          </Label>
          <Input
            id="telefono"
            type="tel"
            value={data.contacto.telefono}
            onChange={(e) => updateContacto("telefono", e.target.value)}
            className="bg-gray-700 border-gray-600"
            placeholder="+54 9 11 1234-5678"
          />
        </div>

        <div>
          <Label htmlFor="dni" className="block mb-2">
            DNI/Pasaporte *
          </Label>
          <Input
            id="dni"
            type="text"
            value={data.contacto.dni}
            onChange={(e) => updateContacto("dni", e.target.value)}
            className="bg-gray-700 border-gray-600"
            placeholder="12345678"
          />
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mt-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <ul className="text-red-400 text-sm">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrev} className="bg-gray-700 border-gray-600">
          Anterior
        </Button>
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
          Siguiente
        </Button>
      </div>
    </div>
  )
}

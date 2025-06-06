"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "./date-picker"
import type { ReservaData } from "../page"

interface InformacionPersonalProps {
  data: ReservaData
  updateData: (data: Partial<ReservaData>) => void
  onNext: () => void
  onPrev: () => void
}

export function InformacionPersonal({ data, updateData, onNext, onPrev }: InformacionPersonalProps) {
  const [errors, setErrors] = useState<string[]>([])

  const handleNext = () => {
    const newErrors: string[] = []

    if (!data.fechaLlegada) newErrors.push("Fecha de llegada es requerida")
    if (!data.fechaSalida) newErrors.push("Fecha de salida es requerida")
    if (!data.alojamiento) newErrors.push("Debe seleccionar un alojamiento")

    setErrors(newErrors)

    if (newErrors.length === 0) {
      onNext()
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">¿Ya tiene pasaje a Ushuaia?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant={data.tienePasaje ? "default" : "outline"}
            className={`p-4 h-auto ${data.tienePasaje ? "bg-blue-600" : "bg-gray-700 border-gray-600"}`}
            onClick={() => updateData({ tienePasaje: true })}
          >
            Sí, ya tengo pasaje
          </Button>
          <Button
            variant={!data.tienePasaje ? "default" : "outline"}
            className={`p-4 h-auto ${!data.tienePasaje ? "bg-blue-600" : "bg-gray-700 border-gray-600"}`}
            onClick={() => updateData({ tienePasaje: false })}
          >
            No, necesito ayuda con el pasaje
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Fechas de viaje</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="block mb-2">Fecha de llegada</Label>
            <DatePicker
              date={data.fechaLlegada}
              setDate={(date) => updateData({ fechaLlegada: date })}
              placeholder="dd/mm/aaaa"
            />
          </div>
          <div>
            <Label className="block mb-2">Fecha de salida</Label>
            <DatePicker
              date={data.fechaSalida}
              setDate={(date) => updateData({ fechaSalida: date })}
              placeholder="dd/mm/aaaa"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Huéspedes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="block mb-2">Adultos</Label>
            <Select
              value={data.adultos.toString()}
              onValueChange={(value) => updateData({ adultos: Number.parseInt(value) })}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Adulto{num > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="block mb-2">Niños</Label>
            <Select
              value={data.ninos.toString()}
              onValueChange={(value) => updateData({ ninos: Number.parseInt(value) })}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Niño{num > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Seleccione su alojamiento</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              data.alojamiento === "suite-ejecutiva" ? "border-blue-500 bg-blue-900/20" : "border-gray-600 bg-gray-700"
            }`}
            onClick={() => updateData({ alojamiento: "suite-ejecutiva" })}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">Suite Ejecutiva</h4>
              <span className="bg-blue-600 text-xs px-2 py-1 rounded">Premium</span>
            </div>
            <p className="text-sm text-gray-300 mb-2">King Size</p>
            <p className="text-lg font-bold">
              $259 <span className="text-sm font-normal">por noche</span>
            </p>
          </div>

          <div
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              data.alojamiento === "habitacion-deluxe"
                ? "border-blue-500 bg-blue-900/20"
                : "border-gray-600 bg-gray-700"
            }`}
            onClick={() => updateData({ alojamiento: "habitacion-deluxe" })}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">Habitación Deluxe</h4>
              <span className="bg-green-600 text-xs px-2 py-1 rounded">Estándar</span>
            </div>
            <p className="text-sm text-gray-300 mb-2">En Suite + LCD</p>
            <p className="text-lg font-bold">
              $199 <span className="text-sm font-normal">por noche</span>
            </p>
          </div>

          <div
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              data.alojamiento === "suite-familiar" ? "border-blue-500 bg-blue-900/20" : "border-gray-600 bg-gray-700"
            }`}
            onClick={() => updateData({ alojamiento: "suite-familiar" })}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">Suite Familiar</h4>
              <span className="bg-orange-600 text-xs px-2 py-1 rounded">Deluxe</span>
            </div>
            <p className="text-sm text-gray-300 mb-2">2x Camas Dobles</p>
            <p className="text-lg font-bold">
              $249 <span className="text-sm font-normal">por noche</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Requerimientos especiales</h3>
        <Textarea
          placeholder="Indique aquí cualquier petición especial (alergias, habitación en piso alto, etc)"
          value={data.requerimientos}
          onChange={(e) => updateData({ requerimientos: e.target.value })}
          className="bg-gray-700 border-gray-600 min-h-[100px]"
        />
      </div>

      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <ul className="text-red-400 text-sm">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between">
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

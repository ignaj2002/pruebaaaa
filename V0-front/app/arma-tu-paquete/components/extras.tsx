"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { ReservaData } from "../page"

const restaurantesDisponibles = [
  {
    id: 1,
    nombre: "Kaupe Restaurant",
    precio: 45,
    tipo: "Cena",
    descripcion: "Restaurante gourmet con vista al Canal Beagle",
  },
  {
    id: 2,
    nombre: "La Tablita",
    precio: 35,
    tipo: "Almuerzo",
    descripcion: "Parrilla argentina tradicional",
  },
]

const extrasDisponibles = [
  {
    id: 1,
    nombre: "Traslado Aeropuerto-Hotel",
    precio: 25,
    descripcion: "Servicio de traslado privado",
  },
  {
    id: 2,
    nombre: "Seguro de Viaje",
    precio: 15,
    descripcion: "Cobertura completa durante su estadía",
  },
]

interface ExtrasProps {
  data: ReservaData
  updateData: (data: Partial<ReservaData>) => void
  onNext: () => void
  onPrev: () => void
}

export function Extras({ data, updateData, onNext, onPrev }: ExtrasProps) {
  const toggleRestaurante = (restaurante: any) => {
    const restaurantes = data.restaurantes || []
    const exists = restaurantes.find((r) => r.id === restaurante.id)

    if (exists) {
      updateData({
        restaurantes: restaurantes.filter((r) => r.id !== restaurante.id),
      })
    } else {
      updateData({
        restaurantes: [...restaurantes, restaurante],
      })
    }
  }

  const toggleExtra = (extra: any) => {
    const extras = data.extras || []
    const exists = extras.find((e) => e.id === extra.id)

    if (exists) {
      updateData({
        extras: extras.filter((e) => e.id !== extra.id),
      })
    } else {
      updateData({
        extras: [...extras, extra],
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Extras</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Restaurantes</h3>
        <div className="space-y-4">
          {restaurantesDisponibles.map((restaurante) => (
            <div key={restaurante.id} className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
              <Checkbox
                id={`restaurante-${restaurante.id}`}
                checked={data.restaurantes?.some((r) => r.id === restaurante.id) || false}
                onCheckedChange={() => toggleRestaurante(restaurante)}
              />
              <div className="flex-1">
                <h4 className="font-medium">{restaurante.nombre}</h4>
                <p className="text-gray-300 text-sm">{restaurante.descripcion}</p>
                <p className="text-blue-400 text-sm">{restaurante.tipo}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${restaurante.precio}</p>
                <p className="text-gray-400 text-sm">por persona</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Servicios Adicionales</h3>
        <div className="space-y-4">
          {extrasDisponibles.map((extra) => (
            <div key={extra.id} className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
              <Checkbox
                id={`extra-${extra.id}`}
                checked={data.extras?.some((e) => e.id === extra.id) || false}
                onCheckedChange={() => toggleExtra(extra)}
              />
              <div className="flex-1">
                <h4 className="font-medium">{extra.nombre}</h4>
                <p className="text-gray-300 text-sm">{extra.descripcion}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${extra.precio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="bg-gray-700 border-gray-600">
          Anterior
        </Button>
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
          Siguiente
        </Button>
      </div>
    </div>
  )
}

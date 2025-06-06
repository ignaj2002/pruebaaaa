"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { ReservaData } from "../page"

const excursionesDisponibles = [
  {
    id: 1,
    nombre: "Navegación Canal Beagle",
    precio: 85,
    duracion: "4 horas",
    horarios: "10:00, 15:00",
    fechas: "30/5/2025, 31/5/2025, 1/6/2025, 2/6/2025",
    descripcion:
      "Navegación por el Canal Beagle con vista a la Isla de los Pájaros y el emblemático Faro Les Eclaireurs. Observación de fauna marina y vistas panorámicas de Ushuaia.",
    imagen: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    nombre: "Parque Nacional Tierra del Fuego",
    precio: 95,
    duracion: "8 horas",
    horarios: "09:00",
    fechas: "29/5/2025, 31/5/2025, 2/6/2025",
    descripcion:
      "Recorrido por el Parque Nacional Tierra del Fuego, incluyendo Bahía Lapataia, fin de la Ruta 3, Lago Roca y Bahía Ensenada. Caminatas por senderos y vistas panorámicas.",
    imagen: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    nombre: "Tren del Fin del Mundo",
    precio: 65,
    duracion: "3 horas",
    horarios: "09:30, 12:00, 15:00",
    fechas: "31/5/2025, 1/6/2025, 2/6/2025",
    descripcion:
      "Viaje en el histórico Ferrocarril Austral Fueguino, conocido el 'Tren del Fin del Mundo', que recorre parte del antiguo recorrido utilizado por los prisioneros de la cárcel de Ushuaia.",
    imagen: "/placeholder.svg?height=200&width=300",
  },
]

interface DetallesReservaProps {
  data: ReservaData
  updateData: (data: Partial<ReservaData>) => void
  onNext: () => void
  onPrev: () => void
}

export function DetallesReserva({ data, updateData, onNext, onPrev }: DetallesReservaProps) {
  const [categoria, setCategoria] = useState("todas")
  const [ordenamiento, setOrdenamiento] = useState("recomendados")

  const toggleExcursion = (excursion: any) => {
    const excursiones = data.excursiones || []
    const exists = excursiones.find((e) => e.id === excursion.id)

    if (exists) {
      updateData({
        excursiones: excursiones.filter((e) => e.id !== excursion.id),
      })
    } else {
      updateData({
        excursiones: [...excursiones, excursion],
      })
    }
  }

  const isSelected = (id: number) => {
    return data.excursiones?.some((e) => e.id === id) || false
  }

  return (
    <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Excursiones Disponibles</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={categoria} onValueChange={setCategoria}>
            <SelectTrigger className="bg-gray-700 border-gray-600 w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las categorías</SelectItem>
              <SelectItem value="navegacion">Navegación</SelectItem>
              <SelectItem value="trekking">Trekking</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
            </SelectContent>
          </Select>

          <Select value={ordenamiento} onValueChange={setOrdenamiento}>
            <SelectTrigger className="bg-gray-700 border-gray-600 w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recomendados">Ordenar por: Recomendados</SelectItem>
              <SelectItem value="precio-asc">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="precio-desc">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="duracion">Duración</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-gray-300 text-sm">
          Selecciona las excursiones que deseas incluir en tu paquete. Solo se muestran las excursiones disponibles para
          las fechas seleccionadas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {excursionesDisponibles.map((excursion) => (
          <div key={excursion.id} className="bg-gray-700 rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={excursion.imagen || "/placeholder.svg"}
                alt={excursion.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {excursion.duracion}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`excursion-${excursion.id}`}
                    checked={isSelected(excursion.id)}
                    onCheckedChange={() => toggleExcursion(excursion)}
                  />
                  <h3 className="font-semibold text-lg">${excursion.precio}</h3>
                </div>
              </div>

              <h4 className="font-medium mb-2">{excursion.nombre}</h4>
              <p className="text-gray-300 text-sm mb-3">{excursion.descripcion}</p>

              <div className="space-y-1 text-xs text-gray-400">
                <p>
                  <span className="font-medium">{excursion.duracion}</span> - Horarios: {excursion.horarios}
                </p>
                <p>Fechas disponibles: {excursion.fechas}</p>
              </div>
            </div>
          </div>
        ))}
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

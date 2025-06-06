import Image from "next/image"
import Link from "next/link"

interface ExcursionCardProps {
  title: string
  description: string
  imageUrl: string
  price: string
  duration: string
}

export function ExcursionCard({ title, description, imageUrl, price, duration }: ExcursionCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="relative h-48">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">{duration}</span>
          </div>
          <div>
            <span className="font-bold text-lg">{price}</span>
          </div>
        </div>
        <Link
          href="#"
          className="mt-4 block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  )
}

import { Check } from "lucide-react"

interface Step {
  number: number
  title: string
  completed: boolean
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.completed
                  ? "bg-green-600 text-white"
                  : step.number === currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-600 text-gray-300"
              }`}
            >
              {step.completed ? <Check className="w-4 h-4" /> : step.number}
            </div>
            <span
              className={`ml-2 text-sm ${
                step.number === currentStep ? "text-blue-400" : step.completed ? "text-green-400" : "text-gray-400"
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && <div className="w-8 h-px bg-gray-600 ml-4" />}
        </div>
      ))}
    </div>
  )
}

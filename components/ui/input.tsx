"use client"

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { Eye, EyeClosed } from 'lucide-react'
import { ReactNode, useState } from 'react'

const inputGroup = cva(
  "text-text-secondary flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-6 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      variant: {
        outline: cn(
          "group/input-group border-gray-50 relative flex w-full items-center rounded-lg border transition-[color,box-shadow] outline-none",
          "h-14 min-w-0 has-[>textarea]:h-auto px-3",
          "has-[[data-slot=input-group-control]:focus-visible]:border-primary-blue",
          "has-[[data-slot][aria-invalid=true]]:border-primary-error",
          "has-[[data-slot][aria-invalid=false]]:border-primary-green"
        ),
        ghost:
          "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

// Merge custom props with native input/textarea props
type InputProps = {
  inputType?: "input" | "password" | "textarea"
  icon?: ReactNode
  variant?: "outline" | "ghost"
} & (
  | React.InputHTMLAttributes<HTMLInputElement>
  | React.TextareaHTMLAttributes<HTMLTextAreaElement>
)

const Input = ({
  inputType = "input",
  icon,
  variant,
  className,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  // Render textarea
  if (inputType === "textarea") {
    return (
      <div className={cn(inputGroup({ variant }), className)}>
        {icon && <span className="absolute left-2 top-2">{icon}</span>}
        <textarea
          data-slot="input-group-control"
          className="w-full resize-none outline-none"
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      </div>
    )
  }

  // Render input / password
  return (
    <div className={cn(inputGroup({ variant }), className)}>
      {icon && <span className="absolute left-2 top-2">{icon}</span>}

      <input
        type={inputType === "password" ? (showPassword ? "text" : "password") : "text"}
        data-slot="input-group-control"
        className="w-full outline-none"
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />

      {inputType === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="ml-2"
        >
          {showPassword ? <EyeClosed /> : <Eye />}
        </button>
      )}
    </div>
  )
}

export default Input
